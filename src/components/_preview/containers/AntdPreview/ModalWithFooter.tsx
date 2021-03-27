import { useState } from 'react';
import { Modal, Button } from 'antd';

export default function ModalWithFooter() {
  const [state, setState] = useState({
    loading: false,
    visible: false,
  });
  const { visible, loading } = state;

  const showModal = () => {
    setState({ ...state, visible: true });
  };

  const handleOk = () => {
    setState({ ...state, loading: true });
    setTimeout(() => {
      setState({ ...state, loading: false, visible: false });
    }, 3000);
  };

  const handleCancel = () => {
    setState({ ...state, visible: false });
  };

  return (
    <>
      <Button onClick={showModal}>Open Modal with customized footer</Button>
      <Modal
        visible={visible}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Search on Google
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
