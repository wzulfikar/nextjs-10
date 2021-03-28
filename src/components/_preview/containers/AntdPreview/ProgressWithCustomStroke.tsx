import { Space, Progress } from 'antd';

ProgressWithCustomStroke.url = 'https://ant.design/components/progress/';

export default function ProgressWithCustomStroke() {
  return (
    <Space direction="vertical">
      <Progress
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        percent={60}
      />
      <Progress
        strokeColor={{
          from: '#108ee9',
          to: '#87d068',
        }}
        percent={90.9}
        status="active"
      />
      <Space>
        <Progress
          type="circle"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={90}
        />
        <Progress
          type="circle"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={100}
        />
      </Space>
    </Space>
  );
}
