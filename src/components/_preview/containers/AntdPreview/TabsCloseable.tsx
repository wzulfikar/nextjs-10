import { useState } from 'react';
import { Typography, Tabs } from 'antd';

const { TabPane } = Tabs;
const { Text } = Typography;

TabsCloseable.title = 'TabsCloseable';
TabsCloseable.url = 'https://ant.design/components/tabs/';

const initialPanes = [
  { title: 'Tab 1', content: <Text>Content of Tab 1</Text>, key: '1' },
  { title: 'Tab 2', content: <Text>Content of Tab 2</Text>, key: '2' },
  {
    title: 'Tab 3',
    content: <Text>Content of Tab 3</Text>,
    key: '3',
    closable: false,
  },
];

export default function TabsCloseable() {
  let newTabIndex = 0;

  const [state, setState] = useState({
    activeKey: initialPanes[0].key,
    panes: initialPanes,
  });

  const onChange = (activeKey) => {
    setState({ ...state, activeKey });
  };

  const onEdit = (targetKey, action) => {
    if (action === 'add') add();
    if (action === 'remove') remove(targetKey);
  };

  const add = () => {
    const { panes } = state;
    const activeKey = `newTab${newTabIndex++}`;
    const newPanes = [...panes];
    newPanes.push({
      title: 'New Tab',
      content: <Text>Content of new Tab</Text>,
      key: activeKey,
    });
    setState({ ...state, panes: newPanes, activeKey });
  };

  const remove = (targetKey) => {
    const { panes, activeKey } = state;
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setState({ ...state, panes: newPanes, activeKey: newActiveKey });
  };

  const { panes, activeKey } = state;

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
    >
      {panes.map((pane) => (
        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
          {pane.content}
        </TabPane>
      ))}
    </Tabs>
  );
}
