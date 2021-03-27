type DotsLoaderProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  align?: 'left' | 'center' | 'right';
  hidden?: boolean;
};

const alignments = {
  left: 'flex justify-start',
  center: 'flex justify-center',
  right: 'flex justify-end',
};

const sizes = {
  xs: '2em',
  sm: '2.5em',
  md: '3em',
  lg: '4em',
};

/**
 * `DotsLoader` renders three dots loader that can be useful
 * to indicate loading process of inline or embedded components.
 */
export default function DotsLoader({
  size = 'sm',
  color = 'gray',
  align = 'center',
  hidden = false,
}: DotsLoaderProps) {
  return (
    <div className={alignments[align]} hidden={hidden}>
      <style jsx>{`
        @keyframes blink {
          50% {
            color: transparent;
          }
        }
        span {
          font-size: ${sizes[size]};
          color: ${color};
          animation: 1s blink infinite;
        }
        span:nth-child(2) {
          animation-delay: 250ms;
        }
        span:nth-child(3) {
          animation-delay: 500ms;
        }
      `}</style>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
}
