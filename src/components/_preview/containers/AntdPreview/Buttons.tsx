import { Space, Button } from 'antd';

ButtonsDemo.url = 'https://ant.design/components/button';

export default function ButtonsDemo() {
  function onClick(...args) {
    console.log('Button clicked:', args);
  }

  return (
    <Space direction="vertical">
      <Button>Default Button</Button>
      <Button type="primary" onClick={onClick}>
        Primary Button
      </Button>
      <Button type="link" onClick={onClick}>
        Link Button
      </Button>
      <Button type="ghost" onClick={onClick}>
        Ghost Button
      </Button>
      <Button type="dashed" onClick={onClick}>
        Dashed Button
      </Button>
    </Space>
  );
}
