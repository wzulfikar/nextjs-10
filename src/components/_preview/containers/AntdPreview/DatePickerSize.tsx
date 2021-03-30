import { useState } from 'react';
import { DatePicker, Radio, Space } from 'antd';

const { RangePicker } = DatePicker;

DatePickerSize.title = 'DatePickerSize';
DatePickerSize.url = 'https://ant.design/components/date-picker/';

/**
 * @see
 * [https://ant.design/components/date-picker/](https://ant.design/components/date-picker/)
 */
export default function DatePickerSize() {
  const [state, setState] = useState({
    size: 'default',
  });

  const { size } = state;

  const handleSizeChange = (e) => {
    setState({ size: e.target.value });
  };

  return (
    <Space direction="vertical" size={12}>
      <Radio.Group value={size} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <DatePicker size={size as any} />
      <DatePicker size={size as any} picker="month" />
      <RangePicker size={size as any} />
      <DatePicker size={size as any} picker="week" />
    </Space>
  );
}
