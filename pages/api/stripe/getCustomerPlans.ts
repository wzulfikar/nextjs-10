import initStripe from '@src/lib/stripe/init';

const stripe = initStripe();

const recurringInterval = {
  day: 'daily',
  month: 'monthly',
  year: 'yearly',
};

export default async function handler(req, res) {
  const customer_id: string = req.query.customer_id as string;
  try {
    if (!customer_id.startsWith('cus_')) {
      throw Error('Incorrect Customer ID.');
    }
    const subscriptions = await stripe.subscriptions.list({
      customer: customer_id,
      status: 'active',
    });

    const products = await stripe.products.list({
      ids: subscriptions.data.map((sub) => (sub as any).plan.product),
    });

    const productMap = {};
    products.data.forEach((product) => {
      productMap[product.id] = product.name;
    });

    const plans: {
      amount: number;
      product: {
        id: string;
        name?: string;
      };
      interval: string;
    }[] = subscriptions.data
      .map((sub: any) => ({
        id: sub.id,
        amount: sub.plan.amount,
        currency: sub.plan.currency,
        cancel_at: sub.cancel_at,
        canceled_at: sub.canceled_at,
        interval: recurringInterval[sub.plan.interval],
        product: {
          id: sub.plan.product,
          name: productMap[sub.plan.product],
        },
      }))
      .sort((a, b) => (a.cancel_at ? 1 : -1));

    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
