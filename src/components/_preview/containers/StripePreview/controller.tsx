import { useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from 'next-stripe/client';

import StripePreview from './elements';

export default function StripePreviewController({ prices }) {
  async function onCheckout(priceId, mode: 'subscription' | 'payment') {
    // Create stripe checkout session
    const qty = 1; // Assume user will buy one item
    const session = await createCheckoutSession({
      success_url: window.location.href,
      cancel_url: window.location.href,
      line_items: [{ price: priceId, quantity: qty }],
      payment_method_types: ['card'],

      // Use `payment` mode if the `priceId` is one-time purchase
      // or `subscription` if it's a recurring payment.
      mode: mode,
    });

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    if (stripe) {
      stripe.redirectToCheckout({ sessionId: session.id });
    }
  }

  return <StripePreview prices={prices} onCheckout={onCheckout} />;
}
