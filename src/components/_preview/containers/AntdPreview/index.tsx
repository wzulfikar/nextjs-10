import { useMemo, useEffect, useRef } from 'react';
import { Menu, Dropdown, Button, DatePicker, message } from 'antd';

import Grid from '../Grid';

import Badge from './Badge';
import DynamicBadge from './DynamicBadge';
import SwitchablePicker from './SwitchablePicker';
import DatePickerSize from './DatePickerSize';
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
import AvatarGroup from './AvatarGroup';
import Collapse from './Collapse';
import Tabs from './Tabs';
import TabsCloseable from './TabsCloseable';
import Table from './Table';

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

  return (
    <div className="my-[5rem] overflow-auto">
      <Grid
        title="Antd Preview"
        previewPath="@src/components/_preview/containers/AntdPreview"
      >
        <Grid.Cell
          title="Uncategorized"
          url="https://ant.design/components/badge/"
          noExternalFile
        >
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button>Hello from ant design!</Button>
          </Dropdown>

          <Badge />

          <DynamicBadge />
        </Grid.Cell>

        <Grid.Cell
          title="DatePicker"
          url="https://ant.design/components/date-picker/"
          noExternalFile
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 w-full">
            <DatePicker onChange={onChange} />
            <DatePicker onChange={onChange} picker="week" />
            <DatePicker onChange={onChange} picker="month" />
            <DatePicker onChange={onChange} picker="quarter" />
            <DatePicker onChange={onChange} picker="year" />
          </div>

          <SwitchablePicker />
        </Grid.Cell>

        <Grid.Cell
          title="RangePicker"
          url="https://ant.design/components/date-picker/"
          noExternalFile
        >
          <RangePicker />
          <RangePicker picker="week" />
          <RangePicker picker="month" />
          <RangePicker picker="year" />
          <RangePicker showTime />
        </Grid.Cell>

        <Grid.Cell
          title="Modals"
          url="https://ant.design/components/modal/"
          noExternalFile
        >
          <ModalBasic />
          <ModalWithFooter />
          <ModalDraggable />
          <ModalDialog />
        </Grid.Cell>

        <Grid.Cell {...Buttons}>
          <Buttons />
        </Grid.Cell>

        <Grid.Cell {...DatePickerSize}>
          <DatePickerSize />
        </Grid.Cell>

        <Grid.Cell {...CardWithLoading}>
          <CardWithLoading />
        </Grid.Cell>

        <Grid.Cell {...Popconfirm}>
          <Popconfirm />
        </Grid.Cell>

        <Grid.Cell {...Progress}>
          <Progress />
        </Grid.Cell>

        <Grid.Cell {...ProgressCircle}>
          <ProgressCircle />
        </Grid.Cell>

        <Grid.Cell {...ProgressWithCustomStroke}>
          <ProgressWithCustomStroke />
        </Grid.Cell>

        <Grid.Cell {...Drawer}>
          <Drawer />
        </Grid.Cell>

        <Grid.Cell {...Carousel}>
          <Carousel />
        </Grid.Cell>

        <Grid.Cell {...AvatarGroup}>
          <AvatarGroup />
        </Grid.Cell>

        <Grid.Cell {...Collapse}>
          <Collapse />
        </Grid.Cell>

        <Grid.Cell {...Tabs}>
          <Tabs />
        </Grid.Cell>

        <Grid.Cell {...TabsCloseable}>
          <TabsCloseable />
        </Grid.Cell>

        <Grid.Cell {...Table} colspan="col-span-3">
          <Table />
        </Grid.Cell>

        <Grid.Cell
          title="Calendar"
          url="https://ant.design/components/calendar"
          colspan="col-span-3"
        >
          <Calendar />
        </Grid.Cell>
      </Grid>
    </div>
  );
}
