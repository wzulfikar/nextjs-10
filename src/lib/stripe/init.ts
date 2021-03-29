import Stripe from 'stripe';

/**
 * @description
 * Create stripe instance (server-side) using `STRIPE_RESTRICTED_KEY` environment variable.
 *
 * @example
 * import initStripe from '@src/lib/stripe/init
 * const stripe = initStripe()
 */
const initStripe = () =>
  new Stripe(process.env.STRIPE_RESTRICTED_KEY, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
  });

export default initStripe;
