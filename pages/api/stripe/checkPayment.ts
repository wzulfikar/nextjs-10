import initStripe from '@src/lib/stripe/init';

const stripe = initStripe();

export default async function handler(req, res) {
  const id: string = req.query.session_id as string;
  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.');
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id, {
      expand: ['payment_intent'],
    });

    res.status(200).json(checkout_session);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
