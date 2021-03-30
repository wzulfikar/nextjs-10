import { Space, Progress } from 'antd';

ProgressCircle.title = 'ProgressCircle';
ProgressCircle.url = 'https://ant.design/components/progress/';

export default function ProgressCircle() {
  return (
    <Space>
      <Progress type="circle" percent={30} width={80} />
      <Progress type="circle" percent={70} width={80} status="exception" />
      <Progress type="circle" percent={100} width={80} />
    </Space>
  );
}
