import { useMemo } from 'react';
import { Menu, Dropdown, Button, message } from 'antd';

import Badge from './Badge';
import DynamicBadge from './DynamicBadge';

export default function AntdPreview() {
  const menu = useMemo(
    () => (
      <Menu onClick={({ key }) => message.info('Menu clicked: ' + key)}>
        <Menu.Item key="menu_1">Menu 1</Menu.Item>
        <Menu.Item key="menu_2">Menu 2</Menu.Item>
      </Menu>
    ),
    []
  );

  return (
    <div className="flex w-screen justify-center mt-[5rem]">
      <div className="flex flex-col space-y-8">
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button>Hello from ant design!</Button>
        </Dropdown>

        <Badge />

        <DynamicBadge />
      </div>
    </div>
  );
}
