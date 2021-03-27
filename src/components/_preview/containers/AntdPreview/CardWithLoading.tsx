import { useState } from 'react';
import { Spin, Switch, Alert } from 'antd';

export default function CardWithLoading() {
  const [state, setState] = useState({ loading: false });

  const toggle = (value) => {
    setState({ loading: value });
  };

  return (
    <div>
      <Spin spinning={state.loading}>
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </Spin>
      <div className="dark:text-white" style={{ marginTop: 16 }}>
        Loading state：
        <Switch checked={state.loading} onChange={toggle} />
      </div>
    </div>
  );
}
