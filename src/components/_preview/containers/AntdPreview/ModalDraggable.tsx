import { useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';

export default function ModalDraggable() {
  const [state, setState] = useState({
    visible: false,
    disabled: true,
    bounds: { left: 0, top: 0, bottom: 0, right: 0 },
  });

  const draggleRef = useRef(null);

  const showModal = () => {
    setState({ ...state, visible: true });
  };

  const handleOk = (e) => {
    console.log(e);
    setState({ ...state, visible: false });
  };

  const handleCancel = (e) => {
    console.log(e);
    setState({ ...state, visible: false });
  };

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setState({
      ...state,
      bounds: {
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
      },
    });
  };

  const { bounds, disabled, visible } = state;

  return (
    <>
      <Button onClick={showModal}>Open Draggable Modal</Button>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setState({ ...state, disabled: false });
              }
            }}
            onMouseOut={() => {
              setState({ ...state, disabled: true });
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Draggable Modal
          </div>
        }
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <p>
          Just don&apos;t learn physics at school and your life will be full of
          magic and miracles.
        </p>
        <br />
        <p>
          Day before yesterday I saw a rabbit, and yesterday a deer, and today,
          you.
        </p>
      </Modal>
    </>
  );
}
