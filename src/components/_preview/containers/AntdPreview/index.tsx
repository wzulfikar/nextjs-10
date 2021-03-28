import { useMemo, useEffect, useRef } from 'react';
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
import Carousel from './Carousel';
import Buttons from './Buttons';

const { RangePicker } = DatePicker;

export default function AntdPreview() {
  const hideMsgRef = useRef(null);

  useEffect(() => {
    hideMsgRef.current = message.info(
      <span>
        This is a message.{' '}
        <button onClick={closeMessage}>
          <b>Close</b>
        </button>
      </span>,
      0
    );
    return () => {
      hideMsgRef.current();
    };
  }, [closeMessage]);

  function closeMessage() {
    hideMsgRef.current();
  }

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

        <Cell url="https://ant.design/components/modal/">
          <ModalBasic />
          <ModalWithFooter />
          <ModalDraggable />
          <ModalDialog />
        </Cell>

        <Cell url={Buttons.url}>
          <Buttons />
        </Cell>

        <Cell url={PickerSize.url}>
          <PickerSize />
        </Cell>

        <Cell url={CardWithLoading.url}>
          <CardWithLoading />
        </Cell>

        <Cell url={Popconfirm.url}>
          <Popconfirm />
        </Cell>

        <Cell url={Progress.url}>
          <Progress />
        </Cell>

        <Cell url={ProgressCircle.url}>
          <ProgressCircle />
        </Cell>

        <Cell url={ProgressWithCustomStroke.url}>
          <ProgressWithCustomStroke />
        </Cell>

        <Cell url={Drawer.url}>
          <Drawer />
        </Cell>

        <Cell url={Carousel.url}>
          <Carousel />
        </Cell>

        <Cell url="https://ant.design/components/calendar" colSpan="col-span-3">
          <Calendar />
        </Cell>
      </div>
    </div>
  );
}
