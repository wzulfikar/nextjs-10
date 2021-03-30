import * as React from 'react';
import { PaymentCard } from 'baseui/payment-card';
import { SIZE } from 'baseui/input';

PaymentCardDemo.title = 'PaymentCard';
PaymentCardDemo.url = 'https://v9-9-0.baseweb.design/components/payment-card';

export default function PaymentCardDemo() {
  const [value, setValue] = React.useState('');
  return (
    <>
      <PaymentCard
        size={SIZE.compact}
        value={value}
        onChange={(e) => setValue((e.target as any).value)}
        error
        placeholder="Insert payment card"
      />

      <PaymentCard
        value={value}
        onChange={(e) => setValue((e.target as any).value)}
        placeholder="Insert payment card"
      />

      <PaymentCard
        size={SIZE.large}
        value={value}
        onChange={(e) => setValue((e.target as any).value)}
        placeholder="Insert payment card"
      />
    </>
  );
}
