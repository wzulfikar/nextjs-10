import * as React from 'react';
import { PinCode } from 'baseui/pin-code';

PinCodeDemo.title = 'PinCode';
PinCodeDemo.url = 'https://v9-9-0.baseweb.design/components/pin-code';

export default function PinCodeDemo() {
  const [values, setValues] = React.useState(['', '', '', '']);
  return (
    <PinCode values={values} onChange={({ values }) => setValues(values)} />
  );
}
