import * as React from 'react';
import {Select, Value} from 'baseui/select';

SelectDemo.title ="Select"
SelectDemo.url ="https://v9-9-0.baseweb.design/components/select"

export default function SelectDemo() {
  const [value, setValue] = React.useState<Value>([]);
  return (
    <Select
      options={[
        {id: 'AliceBlue', color: '#F0F8FF'},
        {id: 'AntiqueWhite', color: '#FAEBD7'},
        {id: 'Aqua', color: '#00FFFF'},
        {id: 'Aquamarine', color: '#7FFFD4'},
        {id: 'Azure', color: '#F0FFFF'},
        {id: 'Beige', color: '#F5F5DC'},
      ]}
      labelKey="id"
      valueKey="color"
      onChange={({value}) => setValue(value)}
      value={value}
    />
  );
};