import { useMemo, useEffect } from 'react';
import {
  Menu,
  Dropdown,
  Button,
  Select,
  DatePicker,
  Space,
  message,
} from 'antd';
import { FiExternalLink } from 'react-icons/fi';

import Badge from './Badge';
import DynamicBadge from './DynamicBadge';
import SwitchablePicker from './SwitchablePicker';
import PickerSize from './PickerSize';
import ModalBasic from './ModalBasic';
import ModalDraggable from './ModalDraggable';
import ModalDialog from './ModalDialog';
import ModalWithFooter from './ModalWithFooter';
import CardWithLoading from './CardWithLoading';
import Calendar from './Calendar';
import Popconfirm from './Popconfirm';
import Progress from './Progress';
import ProgressCircle from './ProgressCircle';
import ProgressWithCustomStroke from './ProgressWithCustomStroke';
import Drawer from './Drawer';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function AntdPreview() {
  useEffect(() => {
    const hide = message.info('This is a message', 0);
    return () => {
      hide();
    };
  }, []);

  function onChange(...args) {
    console.log('onChange:', args);
  }

  function onClick(...args) {
    console.log('onClick:', args);
  }

  const menu = useMemo(
    () => (
      <Menu onClick={onClick}>
        <Menu.Item key="menu_1">Menu 1</Menu.Item>
        <Menu.Item key="menu_2">Menu 2</Menu.Item>
      </Menu>
    ),
    []
  );

  const Cell = ({ url = null, children = null, colSpan = '' }) => (
    <div
      className={`${colSpan} group bg-gray-300 dark:bg-gray-700 p-4 mb-3 sm:mb-0 relative`}
    >
      {url && (
        <a
          className="hidden group-hover:block text-blue-500 absolute right-2 top-1.5"
          rel="noopener noreferrer"
          href={url}
          target="_blank"
        >
          <FiExternalLink />
        </a>
      )}
      <Space direction="vertical">{children}</Space>
    </div>
  );

  return (
    <div className="mt-[5rem] overflow-auto">
      <div className="sm:grid sm:grid-cols-3 gap-3 px-3 max-w-6xl">
        <Cell url="https://ant.design/components/badge/">
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button>Hello from ant design!</Button>
          </Dropdown>

          <Badge />

          <DynamicBadge />
        </Cell>

        <Cell url="https://ant.design/components/date-picker/">
          <DatePicker onChange={onChange} />
          <DatePicker onChange={onChange} picker="week" />
          <DatePicker onChange={onChange} picker="month" />
          <DatePicker onChange={onChange} picker="quarter" />
          <DatePicker onChange={onChange} picker="year" />
          <SwitchablePicker />
        </Cell>

        <Cell url="https://ant.design/components/date-picker/">
          <RangePicker />
          <RangePicker picker="week" />
          <RangePicker picker="month" />
          <RangePicker picker="year" />
          <RangePicker showTime />
        </Cell>

        <Cell url="https://ant.design/components/date-picker/">
          <PickerSize />
        </Cell>

        <Cell url="https://ant.design/components/modal/">
          <ModalBasic />
          <ModalWithFooter />
          <ModalDraggable />
          <ModalDialog />
        </Cell>

        <Cell url="https://ant.design/components/button">
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
        </Cell>

        <Cell url="https://ant.design/components/spin/">
          <CardWithLoading />
        </Cell>

        <Cell url="https://ant.design/components/popconfirm">
          <Popconfirm />
        </Cell>

        <Cell url="https://ant.design/components/progress/">
          <Progress />
        </Cell>

        <Cell url="https://ant.design/components/progress/">
          <ProgressCircle />
        </Cell>

        <Cell url="https://ant.design/components/progress/">
          <ProgressWithCustomStroke />
        </Cell>

        <Cell url="https://ant.design/components/drawer/">
          <Drawer />
        </Cell>

        <Cell url="https://ant.design/components/calendar" colSpan="col-span-3">
          <Calendar />
        </Cell>
      </div>
    </div>
  );
}
