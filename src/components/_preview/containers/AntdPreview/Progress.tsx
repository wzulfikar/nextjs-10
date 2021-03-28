import { Progress } from 'antd';

ProgressDemo.url = 'https://ant.design/components/progress/';

export default function ProgressDemo() {
  return (
    <>
      <Progress percent={30} />
      <Progress percent={50} status="active" />
      <Progress percent={70} status="exception" />
      <Progress percent={100} />
      <Progress percent={50} showInfo={false} />
    </>
  );
}
