import { useState } from 'react';
import { Drawer, Button, Radio, Space } from 'antd';

export default function DrawerDemo() {
  const [state, setState] = useState({ visible: false, placement: 'left' });

  const showDrawer = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const onClose = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  const onChange = (e) => {
    setState({
      ...state,
      placement: e.target.value,
    });
  };

  const { placement, visible } = state;
  return (
    <>
      <Space>
        <Radio.Group defaultValue={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group>
      </Space>
      <Space className="mt-2">
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Basic Drawer"
        placement={placement as any}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={placement}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}
