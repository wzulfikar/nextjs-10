import { useState } from 'react';
import { Datepicker } from 'baseui/datepicker';

DatePickerDemo.title = 'DatePicker';
DatePickerDemo.url = 'https://v9-9-0.baseweb.design/components/datepicker';

export default function DatePickerDemo() {
  const [value, setValue] = useState([new Date('2021-03-23T17:00:00.000Z')]);
  const [range, setRange] = useState([
    new Date('2021-03-10T14:36:00.000Z'),
    new Date('2021-03-17T17:00:00.000Z'),
  ]);

  return (
    <div className="space-y-2 w-64">
      <Datepicker
        value={value}
        onChange={({ date }) => setValue(Array.isArray(date) ? date : [date])}
      />
      <Datepicker
        value={range}
        onChange={({ date }) => setRange(Array.isArray(date) ? date : [date])}
        range
      />
      <Datepicker
        value={value}
        onChange={({ date }) => setValue(Array.isArray(date) ? date : [date])}
        timeSelectStart
      />
      <Datepicker
        value={value}
        onChange={({ date }) => setValue(Array.isArray(date) ? date : [date])}
        quickSelect
        range
        timeSelectStart
        timeSelectEnd
      />
    </div>
  );
}
