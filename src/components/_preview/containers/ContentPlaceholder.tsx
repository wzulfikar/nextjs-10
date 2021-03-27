import React from 'react';
import { useMeasure } from 'react-use';

export default function ContentPlaceholder({
  text = undefined,
  circle = undefined,
}) {
  const [
    containerRef,
    { width: containerWidth, height: containerHeight },
  ] = useMeasure();
  const [textRef, { width: textWidth, height: textHeight }] = useMeasure();

  const textStyle = {
    marginTop: containerHeight * 0.5 - textHeight * 0.5,
    marginLeft: containerWidth * 0.5 - textWidth * 0.5,
  };

  return (
    <div ref={containerRef} className="h-full w-full">
      {text && (
        <span
          ref={textRef}
          style={textStyle}
          className="absolute z-10 text-gray-400 font-normal bg-gray-100 bg-opacity-25 text-center"
        >
          {text}
        </span>
      )}
      <svg
        className={`${
          circle ? 'rounded-full' : ''
        } h-full w-full border border-dashed border-gray-300 bg-gray-100 text-gray-300`}
        preserveAspectRatio="none"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 200 200"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeWidth="2"
          d="M0 0l200 200M0 200L200 0"
        ></path>
      </svg>
    </div>
  );
}
