import FullPageContainer from '@src/components/base/FullPageContainer';

/**
 * `ErrorFallback` renders a generic "unhappy" illustration to reflect
 * unhappy paths such as unexpected errors, exceptions, etc. This component
 * can be lazyloaded to keep the initial bundle size small.
 */
export default function ErrorFallback({
  ctx,
  error,
  resetErrorBoundary,
  title = 'Whoops, something went wrong..',
}) {
  const errorContext = `${error.name}${ctx ? ` at ${ctx}` : ''}:`;

  return (
    <FullPageContainer role="alert" bgColor="bg-gray-500">
      <div className="flex flex-col w-1/2">
        <h2 className="text-lg">{title}</h2>
        <code className="flex flex-col mb-4">
          <span>{errorContext}</span>
          <span>{error.message} </span>
        </code>

        <button className="bg-gray-800 text-white" onClick={resetErrorBoundary}>
          Try again
        </button>
      </div>
    </FullPageContainer>
  );
}
