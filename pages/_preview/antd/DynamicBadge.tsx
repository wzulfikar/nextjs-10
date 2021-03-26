import { useState } from 'react';
import { Badge, Button, Switch } from 'antd';
import {
  MinusOutlined,
  PlusOutlined,
  QuestionOutlined,
} from '@ant-design/icons';

const ButtonGroup = Button.Group;

export default function DynamicBadgePreview() {
  const [state, setState] = useState({
    count: 5,
    show: true,
  });

  const increase = () => {
    const count = state.count + 1;
    setState({ ...state, count });
  };

  const decline = () => {
    let count = state.count - 1;
    if (count < 0) {
      count = 0;
    }
    setState({ ...state, count });
  };

  const random = () => {
    const count = Math.floor(Math.random() * 100);
    setState({ ...state, count });
  };

  const onChange = (show) => {
    setState({ ...state, show });
  };
  return (
    <div className="flex flex-col space-y-8">
      <style jsx>
        {`
          .head-example {
            width: 42px;
            height: 42px;
            border-radius: 2px;
            background: #eee;
            display: inline-block;
            vertical-align: middle;
          }
        `}
      </style>
      <div className="space-x-4">
        <Badge count={state.count}>
          <a href="#" className="head-example" />
        </Badge>

        <ButtonGroup>
          <Button onClick={decline}>
            <MinusOutlined />
          </Button>
          <Button onClick={increase}>
            <PlusOutlined />
          </Button>
          <Button onClick={random}>
            <QuestionOutlined />
          </Button>
        </ButtonGroup>
      </div>
      <div className="space-x-4">
        <Badge dot={state.show}>
          <a href="#" className="head-example" />
        </Badge>

        <Switch onChange={onChange} checked={state.show} />
      </div>
    </div>
  );
}
