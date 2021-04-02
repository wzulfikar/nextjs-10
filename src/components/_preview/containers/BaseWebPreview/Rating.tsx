import * as React from 'react';
import {StarRating} from 'baseui/rating';

RatingDemo.title ="Rating"
RatingDemo.url ="https://v9-9-0.baseweb.design/components/rating"

export default function RatingDemo() {
  const [value, setValue] = React.useState(1);
  return (
    <StarRating
      value={value}
      onChange={({value}) => setValue(value)}
    />
  );
};