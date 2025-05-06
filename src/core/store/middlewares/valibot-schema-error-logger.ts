import { isRejected, Middleware, UnknownAction } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/browser';

interface MetaWithArg {
  arg?: {
    endpointName?: string;
    url?: string;
    body?: unknown;
  };
}

interface RejectedAction extends UnknownAction {
  meta: MetaWithArg;
  error: {
    name: string;
    message: string;
  };
}

export const valibotSchemaErrorLogger: Middleware =
  (store) => (next) => (action) => {
    if (isRejected(action)) {
      const rejectedAction = action as RejectedAction;

      const error = rejectedAction.error;

      console.log('===============');
      console.log('action.error', action.error);
      console.log('===============');

      if (error?.name === 'SchemaError') {
        Sentry.captureException(new Error('Valibot Schema Validation Error'), {
          extra: {
            endpointName: rejectedAction.meta?.arg?.endpointName,
            message: error.message,
          },
          tags: {
            errorType: 'valibot_schema_validation',
          },
        });
      }
    }

    return next(action);
  };
