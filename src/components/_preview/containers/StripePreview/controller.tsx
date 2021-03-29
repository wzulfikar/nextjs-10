import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from 'next-stripe/client';

import formatAmountForStripe from '@src/lib/stripe/formatAmountForStripe';
import StripePreview from './elements';

type LineItem = {
  // Applicable if using preset price (`price` will be price id)
  price?: string;

  // Applicable if using custom price
  name?: string;
  amount?: number;
  currency?: string;
  description?: string;

  quantity: number;
  mode: 'subscription' | 'payment';
};

// Mock custom price
const customPrice = {
  id: 'Pay custom amount for Next.js 10 Template',
  unit_amount: 150,
  currency: 'eur',
  product: {
    name: 'Custom Amount',
    images: [],
  },
  type: 'one_time',
};

async function checkoutProduct({
  price,
  name,
  amount,
  quantity,
  currency,
  mode,
}: LineItem) {
  const session = await createCheckoutSession({
    success_url: window.location.href,
    cancel_url: window.location.href,
    line_items: [
      {
        price: price,
        name: name,
        amount: amount,
        quantity: quantity,
        currency: currency,
      },
    ],
    payment_method_types: ['card'],

    // Use `payment` mode if the `priceId` is one-time purchase
    // or `subscription` if it's a recurring payment.
    mode: mode,
  });

  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  if (stripe) {
    // Store payment intent for after-payment checking
    localStorage.setItem('_stripeCheckoutSession', session.id);

    stripe.redirectToCheckout({ sessionId: session.id });
  }
}

export default function StripePreviewController({ prices }) {
  useEffect(() => {
    const session_id = localStorage.getItem('_stripeCheckoutSession');
    if (session_id) {
      console.log('session_id:', session_id);
      fetch(`/api/check-payment?session_id=${session_id}`)
        .then((res) => res.json())
        .then((paymentIntent) => {
          console.log('paymentIntent:', paymentIntent);
          if (paymentIntent.statusCode === 500) {
            alert('Payment failed: ' + paymentIntent.message);
            return;
          }

          alert('Payment status: ' + paymentIntent.payment_status);
          localStorage.removeItem('_stripeCheckoutSession');
        });
    }
  }, []);

  async function onCheckout(priceId, mode: 'subscription' | 'payment') {
    // Create stripe checkout session
    const qty = 1; // Assume user will buy one item

    // Handle custom amount
    const isCustomAmount = priceId === customPrice.id;

    if (isCustomAmount) {
      await checkoutProduct({
        name: priceId,
        amount: formatAmountForStripe(
          customPrice.unit_amount / 100,
          customPrice.currency
        ),
        currency: customPrice.currency,
        quantity: qty,
        mode: 'payment',
      });
    } else {
      await checkoutProduct({ price: priceId, quantity: qty, mode });
    }
  }

  return (
    <StripePreview prices={[...prices, customPrice]} onCheckout={onCheckout} />
  );
}
