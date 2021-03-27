import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { withScope, captureException } from '@sentry/browser';

import logger from '@src/lib/logger';
import ErrorFallback from './ErrorFallback';

/**
 * `ErrorBoundary` is a headless component that wraps
 * its children with react-error-boundary. If `FallbackComponent`
 * not passed, `ErrorBoundary` will render a full page error message.
 */
export default function ErrorBoundary({
  ctx,
  children,
  FallbackComponent = undefined,
  ...props
}) {
  function onError(err, info) {
    // Call on error from parent
    props.onError?.();

    logger.error(`${ctx}: ${err.message}`);

    // Report to sentry
    withScope(function (scope) {
      scope.setTag('context', ctx);
      captureException(err);
    });
  }

  return (
    <ReactErrorBoundary
      FallbackComponent={
        FallbackComponent
          ? FallbackComponent
          : (props) => <ErrorFallback {...props} ctx={ctx} />
      }
      {...props}
      onError={onError}
    >
      {children}
    </ReactErrorBoundary>
  );
}
