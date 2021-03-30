import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  createCheckoutSession,
  createBillingPortalSession,
} from 'next-stripe/client';
import { useAsync } from 'react-use';

import trackGoal from '@src/utils/trackGoal';
import formatAmountForStripe from '@src/lib/stripe/formatAmountForStripe';
import StripePreview from './elements';

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

export default function StripePreviewController({ prices }) {
  useEffect(() => {
    const session_id = localStorage.getItem('_stripeCheckoutSession');
    if (session_id) {
      console.log('session_id:', session_id);

      fetch(`/api/stripe/checkPayment?session_id=${session_id}`)
        .then((res) => res.json())
        .then((paymentIntent) => {
          console.log('paymentIntent:', paymentIntent);

          if (paymentIntent.statusCode === 500) {
            alert('Payment failed: ' + paymentIntent.message);
            return;
          }

          if (paymentIntent.payment_status === 'paid') {
            trackGoal(
              'StripePreview_PaymentSuccessful',
              paymentIntent.amount_total
            );
          } else {
            trackGoal(
              'StripePreview_PaymentFailed',
              paymentIntent.amount_total
            );
          }

          alert('Payment status: ' + paymentIntent.payment_status);
          localStorage.removeItem('_stripeCheckoutSession');
        });
    }
  }, []);

  const { value, loading, error } = useAsync(() =>
    fetch(
      `/api/stripe/getCustomerPlans?customer_id=${getCustomerId()}`
    ).then((res) => res.json())
  );

  if (error) {
    console.error('[stripe] getCustomerPlans failed:', error);
  }

  /**
   * @description
   * Dummy customer id (created for this demo).
   *
   * Name: Jerod Brekke
   * Email: jerod29@ethereal.email
   * Webmail: https://ethereal.email
   * Password: `McAWyZGARG5zf3SvDU`
   */
  function getCustomerId() {
    return 'cus_JCdi2hmQ4ggKhh';
  }

  async function onCheckout(priceId, amount, mode: 'subscription' | 'payment') {
    trackGoal('StripePreview_ClickCheckout', amount);

    // Create stripe checkout session
    const qty = 1; // Assume user will buy one item

    const isCustomAmount = priceId === customPrice.id;

    // Create line item based on custom amount or preset price
    const lineItem = isCustomAmount
      ? {
          name: customPrice.id,
          amount: formatAmountForStripe(amount / 100, customPrice.currency),
          currency: customPrice.currency,
          quantity: qty,
        }
      : {
          price: priceId,
          quantity: qty,
        };

    const session = await createCheckoutSession({
      customer: getCustomerId(),
      success_url: window.location.href,
      cancel_url: window.location.href,
      line_items: [lineItem],
      payment_method_types: ['card'],

      // Use `payment` mode if the `priceId` is one-time purchase
      // or `subscription` if it's a recurring payment.
      mode: mode,
    });

    // Store payment intent for after-payment checking

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    if (stripe) {
      localStorage.setItem('_stripeCheckoutSession', session.id);
      stripe.redirectToCheckout({ sessionId: session.id });
    }
  }

  async function onClickManageSubscription() {
    trackGoal('StripePreview_ClickManageSubscription');

    const session = await createBillingPortalSession({
      customer: getCustomerId(),
      return_url: window.location.href,
    });

    window.location.href = session.url;
  }

  // Append "N more" if user has multiple subcsriptions.
  const currentPlan =
    value?.length &&
    `${value[0].product.name} (${value[0].interval})` +
      (value.length > 1 && ` and ${value.length - 1} more`);

  return (
    <StripePreview
      currentPlan={loading ? '...' : currentPlan || '(no plan)'}
      prices={[...prices, customPrice]}
      onCheckout={onCheckout}
      onClickManageSubscription={onClickManageSubscription}
    />
  );
}
