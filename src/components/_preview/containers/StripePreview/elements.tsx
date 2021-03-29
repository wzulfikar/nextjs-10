import { useState } from 'react';
import Link from 'next/link';
import { AiFillInfoCircle } from 'react-icons/ai';

function PriceList({ prices, onCheckout, recurringSuffix = null }) {
  const [isCheckingOut, setIsCheckingOut] = useState(null);

  async function _onCheckout(priceId, mode) {
    setIsCheckingOut(priceId);
    await onCheckout(priceId, mode);
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

export default function StripePreview({ prices, onCheckout }) {
  const pricesByType = { one_time: [], recurring: [] };
  prices.forEach((price) => pricesByType[price.type].push(price));

  return (
    <div className="bg-gray-200 dark:bg-black dark:text-white min-h-screen px-4 py-8">
      <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Stripe Checkout
      </h1>
      <div className="flex flex-col mx-auto max-w-4xl">
        <p className="sm:flex mt-6 mb-1 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <AiFillInfoCircle className="mr-1" />
            You can use Stripe test card during checkout:
          </div>
          <code className="ml-1 space-x-1">
            <span>4242</span>
            <span>4242</span>
            <span>4242</span>
            <span>4242</span>
          </code>
        </p>
        {/* One-time products */}
        <div>
          <h3 className="text-lg mb-8 pb-4 pt-4 font-semibold text-green-600 border-b border-green-600">
            One-Time Payments
          </h3>
          <PriceList prices={pricesByType.one_time} onCheckout={onCheckout} />
        </div>
        {/* Recurring products */}
        <div>
          <h3 className="text-lg mb-6 pb-4 pt-8 font-semibold text-green-600 border-b border-green-600">
            Subscriptions
          </h3>
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
        </div>
        <Link href="/">
          <a className="my-2 mt-8 hover:text-blue-600">&larr; Back to home</a>
        </Link>
        <Link href="/_preview">
          <a className="my-2 hover:text-blue-600">&larr; Back to /_preview</a>
        </Link>
      </div>
    </div>
  );
}
