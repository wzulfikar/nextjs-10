import { useState } from 'react';
import Link from 'next/link';
import { AiFillInfoCircle } from 'react-icons/ai';

function HintStripeTestCards() {
  return (
    <div className="flex flex-col sm:flex-row pt-6 mb-1 text-sm text-gray-600 dark:text-gray-400">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <AiFillInfoCircle className="mr-1" />
        Use any of the{' '}
        <a
          className="sm:mx-1 underline"
          href="https://stripe.com/docs/testing#cards"
        >
          Stripe test cards
        </a>{' '}
        during checkout.
      </div>
      <code className="ml-1 space-x-1">
        (eg.
        <span>4242</span>
        <span>4242</span>
        <span>4242</span>
        <span>4242</span>)
      </code>
      {/* P.S: 4000000000003220 to trigger 3D Secure challenge flow */}
    </div>
  );
}

function PriceList({ prices, onCheckout, recurringSuffix = null }) {
  const [isCheckingOut, setIsCheckingOut] = useState(null);

  async function _onCheckout(priceId, amount, mode) {
    setIsCheckingOut(priceId);
    await onCheckout(priceId, amount, mode);
    setIsCheckingOut(null);
  }

  return (
    <ul className="grid sm:grid-cols-3 gap-4">
      {prices.map((price) => (
        <li
          className="grid grid-cols-2 border border-gray-800 dark:border-white p-4 cursor-pointer hover:text-blue-600 dark:hover:border-blue-600"
          key={price.id}
          onClick={() =>
            _onCheckout(
              price.id,
              price.unit_amount,
              Boolean(recurringSuffix) ? 'subscription' : 'payment'
            )
          }
        >
          <div>
            <h2 className="font-bold">{price.product.name}</h2>
            <img src={price.product.images[0]} />
            <p>
              {(price.unit_amount / 100).toFixed(2)}{' '}
              {price.currency.toUpperCase()} {recurringSuffix}
            </p>
          </div>
          <button className="ml-auto font-medium">
            {price.id === isCheckingOut ? 'Processing..' : 'Checkout'} &rarr;
          </button>
        </li>
      ))}
    </ul>
  );
}

function Section({ title, children }) {
  return (
    <div className="flex flex-col mt-6">
      <h3 className="text-lg mb-8 pb-4 pt-4 font-semibold text-green-600 border-b border-green-600">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function StripePreview({
  prices,
  currentPlan,
  onCheckout,
  onClickManageSubscription,
}) {
  const pricesByType = { one_time: [], recurring: [] };
  prices.forEach((price) => pricesByType[price.type].push(price));

  return (
    <div className="bg-gray-200 dark:bg-black dark:text-white min-h-screen px-4 py-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Stripe Checkout
      </h1>

      {/* Content */}
      <div className="flex flex-col mx-auto max-w-4xl">
        <HintStripeTestCards />

        {/* One-time products */}
        <Section title="One-Time Payments">
          <PriceList prices={pricesByType.one_time} onCheckout={onCheckout} />
        </Section>

        {/* Recurring products */}
        <Section title="Subscriptions">
          <h4 className="pb-4">Pay monthly:</h4>
          <PriceList
            prices={pricesByType.recurring.filter(
              (price) => price.recurring.interval === 'month'
            )}
            onCheckout={onCheckout}
            recurringSuffix="/ mth"
          />
          <h4 className="pb-4 pt-6">Pay yearly:</h4>
          <PriceList
            prices={pricesByType.recurring.filter(
              (price) => price.recurring.interval === 'year'
            )}
            onCheckout={onCheckout}
            recurringSuffix="/ yr"
          />

          <div className="my-2 mt-8">
            Current Plan: <b>{currentPlan}</b>.
            <button
              onClick={onClickManageSubscription}
              className="underline px-2 my-2 hover:text-blue-600"
            >
              Manage subscription &rarr;
            </button>
          </div>
        </Section>

        <Section title="Navigation">
          <Link href="/">
            <a className="my-2 hover:text-blue-600">&larr; Back to home</a>
          </Link>
          <Link href="/_preview">
            <a className="my-2 hover:text-blue-600">&larr; Back to /_preview</a>
          </Link>
        </Section>
      </div>
    </div>
  );
}
