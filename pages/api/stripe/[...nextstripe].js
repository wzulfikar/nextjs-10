import NextStripe from 'next-stripe';

/**
 * Run this command to see what routes are handled by next-stripe:
 * `ls -1 node_modules/next-stripe/dist/server/routes`
 */
export default NextStripe({
  stripe_key: process.env.STRIPE_RESTRICTED_KEY,
});
