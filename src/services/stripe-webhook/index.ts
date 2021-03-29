import initStripe from '@src/lib/stripe/init';
import dateFromSecond from '@src/lib/date/dateFromSecond';

// TODO: Replace mock-db with your own implementation
import db from './mock-db';

const stripe = initStripe();

const upsertProductRecord = async (product) => {
  const productData = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description,
    image: product.images?.[0] ?? null,
    metadata: product.metadata,
  };

  const { error } = await db.products.insert(productData, { upsert: true });

  if (error) throw error;
  console.log(`Product inserted/updated: ${product.id}`);
};

const upsertPriceRecord = async (price) => {
  const priceData = {
    id: price.id,
    product_id: price.product,
    active: price.active,
    currency: price.currency,
    description: price.nickname,
    type: price.type,
    unit_amount: price.unit_amount,
    interval: price.recurring?.interval ?? null,
    interval_count: price.recurring?.interval_count ?? null,
    trial_period_days: price.recurring?.trial_period_days ?? null,
    metadata: price.metadata,
  };

  const { error } = await db.prices.insert(priceData, { upsert: true });

  if (error) throw error;
  console.log(`Price inserted/updated: ${price.id}`);
};

const createOrRetrieveCustomer = async ({ email, uuid }) => {
  const { data, error } = await db.customers.find({ uuid });

  if (error) {
    // No customer record found, let's create one.
    const customerData = {
      metadata: {
        UUID: uuid,
      },
      email: null,
    };
    if (email) customerData.email = email;
    const customer = await stripe.customers.create(customerData);

    // Insert customer ID to customers table.
    const { error: dbError } = await db.customers.insert({
      id: uuid,
      stripe_customer_id: customer.id,
    });

    if (dbError) throw dbError;

    console.log(`New customer created and inserted for ${uuid}.`);
    return customer.id;
  }
  if (data) return data.stripe_customer_id;
};

/**
 * Copies the billing details from the payment method to the customer object.
 */
const copyBillingDetailsToCustomer = async (uuid, payment_method) => {
  const customer = payment_method.customer;
  const { name, phone, address } = payment_method.billing_details;
  await stripe.customers.update(customer, { name, phone, address });

  const { error } = await db.users.updateBilling(uuid, {
    billing_address: address,
    payment_method: payment_method[payment_method.type],
  });

  if (error) throw error;
};

const manageSubscriptionStatusChange = async (
  subscriptionId,
  customerId,
  createAction = false
) => {
  // Get customer's UUID based on stripe_customer_id.
  const {
    data: { id: uuid },
    error: noCustomerError,
  } = await db.customers.find({ stripe_customer_id: customerId });

  if (noCustomerError) throw noCustomerError;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method'],
  });
  // Upsert the latest status of the subscription object.
  const subscriptionData = {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    quantity: (subscription as any).quantity, // TODO: fix typing: `Property 'quantity' does not exist on type 'Response<Subscription>'`
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at
      ? dateFromSecond(subscription.cancel_at)
      : null,
    canceled_at: subscription.canceled_at
      ? dateFromSecond(subscription.canceled_at)
      : null,
    current_period_start: dateFromSecond(subscription.current_period_start),
    current_period_end: dateFromSecond(subscription.current_period_end),
    created: dateFromSecond(subscription.created),
    ended_at: subscription.ended_at
      ? dateFromSecond(subscription.ended_at)
      : null,
    trial_start: subscription.trial_start
      ? dateFromSecond(subscription.trial_start)
      : null,
    trial_end: subscription.trial_end
      ? dateFromSecond(subscription.trial_end)
      : null,
  };

  const { error } = await db.subscriptions.insert(subscriptionData, {
    upsert: true,
  });

  if (error) throw error;
  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  );

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method)
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method
    );
};

export {
  upsertProductRecord,
  upsertPriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
};
