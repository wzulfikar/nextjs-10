import { useState } from 'react';
import { Typography, Tabs, Radio, Space } from 'antd';

const { TabPane } = Tabs;
const { Text } = Typography;

TabsDemo.title = 'Tabs';
TabsDemo.url = 'https://ant.design/components/tabs/';

export default function TabsDemo() {
  const [state, setState] = useState({
    tabPosition: 'left',
  });

  const changeTabPosition = (e) => {
    setState({ tabPosition: e.target.value });
  };

  const { tabPosition } = state;

  return (
    <>
      <Space direction="vertical" style={{ marginBottom: 24 }}>
        <Text>Tab position:</Text>
        <Radio.Group value={tabPosition} onChange={changeTabPosition}>
          <Radio.Button value="top">top</Radio.Button>
          <Radio.Button value="bottom">bottom</Radio.Button>
          <Radio.Button value="left">left</Radio.Button>
          <Radio.Button value="right">right</Radio.Button>
        </Radio.Group>
      </Space>
      <Tabs tabPosition={tabPosition as any}>
        <TabPane tab="Tab 1" key="1">
          <Text>Content of Tab 1</Text>
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <Text>Content of Tab 2</Text>
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          <Text>Content of Tab 3</Text>
        </TabPane>
      </Tabs>
    </>
  );
}
