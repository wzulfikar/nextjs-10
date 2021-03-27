import { useAsync } from 'react-use';
import Lottie from 'react-lottie';

export default function LottiePreview({ animationUrl }) {
  const { value, loading, error } = useAsync(
    async () =>
      animationUrl.startsWith('http')
        ? fetch(animationUrl).then((res) => res.json())
        : Promise.reject(new Error('`animationUrl` is invalid')),
    [animationUrl]
  );

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: value,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const loaderSize = 200;

  if (!animationUrl) {
    return <div>Provide `animationUrl` to render lottie animation.</div>;
  }

  if (loading) {
    return <div className="text-loading">Loading animation data..</div>;
  }

  if (error) {
    return <div>Error: could not load lottie file: {error.message}</div>;
  }

  return (
    <Lottie options={defaultOptions} height={loaderSize} width={loaderSize} />
  );
}
