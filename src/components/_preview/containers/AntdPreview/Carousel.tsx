import { useState } from 'react';
import { Carousel, Radio, RadioChangeEvent } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center' as any,
  background: '#364d79',
};

CarouselDemo.url = 'https://ant.design/components/carousel/';

export default function CarouselDemo() {
  const [dotPosition, setDotPosition] = useState('top');

  const onChangeRadio = (e: RadioChangeEvent) => {
    setDotPosition(e.target.value);
  };

  return (
    <div className="w-64">
      <Radio.Group
        onChange={onChangeRadio}
        value={dotPosition}
        style={{ marginBottom: 8 }}
      >
        <Radio.Button value="top">Top</Radio.Button>
        <Radio.Button value="bottom">Bottom</Radio.Button>
        <Radio.Button value="left">Left</Radio.Button>
        <Radio.Button value="right">Right</Radio.Button>
      </Radio.Group>
      <Carousel autoplay dotPosition={dotPosition as any}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  );
}
