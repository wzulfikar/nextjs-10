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
    });

    // Use first subscrpition as current plan
    const plan = (subscriptions.data[0] as any).plan;
    const { amount, interval, product } = plan;

    // Uncomment to debug
    // console.log('Plan:', plan);

    const productInfo = await stripe.products.retrieve(product);

    res.status(200).json({
      name: productInfo.name,
      interval: recurringInterval[interval],
      amount,
    });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
