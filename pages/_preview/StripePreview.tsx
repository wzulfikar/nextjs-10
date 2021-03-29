import initStripe from '@src/lib/stripe/init';

import StripePreview from '@src/components/_preview/containers/StripePreview';

export default StripePreview;

export async function getStaticProps() {
  const stripe = initStripe();
  const prices = await stripe.prices.list({
    active: true,
    limit: 10,

    // Inline product info in response
    expand: ['data.product'],

    // Only return prices of type `recurring` or `one_time`.
    // Leave it empty to inlude both types.
    // type: 'recurring',
  });

  return { props: { prices: prices.data } };
}
