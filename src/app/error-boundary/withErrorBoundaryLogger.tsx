import React from 'react';
import { FallbackProps, withErrorBoundary } from 'react-error-boundary';
import * as Sentry from '@sentry/react';

const withErrorBoundaryLogger = <P extends object>(
  Component: React.ComponentType<P>,
  FallbackComponent?: React.ComponentType<Partial<FallbackProps>>,
) => {
  return withErrorBoundary(Component, {
    fallbackRender: (props: FallbackProps): React.ReactNode | null =>
      FallbackComponent ? <FallbackComponent {...props} /> : null,
    onError: (error, info) => {
      Sentry.withScope((scope) => {
        scope.setContext('additionalInfo', {
          message: 'Error occurred in React component',
        });
        Sentry.captureException(error);
      });
    },
  });
};

export default withErrorBoundaryLogger;
