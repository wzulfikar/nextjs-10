/**
 * Adapted from https://github.com/vercel/nextjs-subscription-payments/blob/main/pages/api/webhooks.js
 */

import initStripe from '@src/lib/stripe/init';
import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
} from '@src/services/stripe-webhook';

export const config = {
  api: {
    bodyParser: false, // Stripe needs to use the raw body to construct the event.
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      const stripe = initStripe();
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.error(`[ERROR][stripe] webhook error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.info('[INFO][stripe] new webhook event:', {
      type: event.type,
      relevant: relevantEvents.has(event.type),
    });

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case 'product.created':
          case 'product.updated':
            await upsertProductRecord(event.data.object);
            break;
          case 'price.created':
          case 'price.updated':
            await upsertPriceRecord(event.data.object);
            break;
          case 'customer.subscription.created':
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            await manageSubscriptionStatusChange(
              event.data.object.id,
              event.data.object.customer,
              event.type === 'customer.subscription.created'
            );
            break;
          case 'checkout.session.completed':
            const checkoutSession = event.data.object;
            if (checkoutSession.mode === 'subscription') {
              const subscriptionId = checkoutSession.subscription;
              await manageSubscriptionStatusChange(
                subscriptionId,
                checkoutSession.customer,
                true
              );
            }
            break;
          default:
            throw new Error('Unhandled relevant event!');
        }
      } catch (error) {
        console.log(error);
        return res.json({ error: 'Webhook handler failed. View logs.' });
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default webhookHandler;
