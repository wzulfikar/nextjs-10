import { Popconfirm, message, Button } from 'antd';

const text = 'Are you sure to delete this task?';

function confirm() {
  message.info('Clicked on Yes.');
}

PopconfirmDemo.title = 'Popconfirm';
PopconfirmDemo.url = 'https://ant.design/components/popconfirm';

export default function PopconfirmDemo() {
  return (
    <div>
      <div
        className="space-y-2 space-x-2 mb-2"
        style={{ whiteSpace: 'nowrap' }}
      >
        <Popconfirm
          placement="topLeft"
          title={text}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button>TL</Button>
        </Popconfirm>
        <Popconfirm
          placement="top"
          title={text}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button>Top</Button>
        </Popconfirm>
        <Popconfirm
          placement="topRight"
          title={text}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button>TR</Button>
        </Popconfirm>
      </div>
      <div className="space-y-2" style={{ width: 50, float: 'left' }}>
        <Popconfirm
          placement="leftTop"
          title={text}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button>LT</Button>
        </Popconfirm>
        <Popconfirm
          placement="left"
          title={text}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button>Left</Button>
        </Popconfirm>
        <Popconfirm
          placement="leftBottom"
          title={text}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button>LB</Button>
        </Popconfirm>
      </div>
      <div className="space-y-2" style={{ width: 50, marginLeft: 150 }}>
        <Popconfirm
          placement="rightTop"
          title={text}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button>RT</Button>
        </Popconfirm>
        <Popconfirm
          placement="right"
          title={text}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button>Right</Button>
        </Popconfirm>
        <Popconfirm
          placement="rightBottom"
          title={text}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button>RB</Button>
        </Popconfirm>
      </div>
      <div
        className="space-y-2 space-x-2"
        style={{ clear: 'both', whiteSpace: 'nowrap' }}
      >
        <Popconfirm
          placement="bottomLeft"
          title={text}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button>BL</Button>
        </Popconfirm>
        <Popconfirm
          placement="bottom"
          title={text}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button>Bottom</Button>
        </Popconfirm>
        <Popconfirm
          placement="bottomRight"
          title={text}
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button>BR</Button>
        </Popconfirm>
      </div>
    </div>
  );
}
