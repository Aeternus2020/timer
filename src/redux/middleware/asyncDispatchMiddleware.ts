import { Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';

const asyncDispatchMiddleware: Middleware =
  (store) => (next) => (action: PayloadAction<string>) => {
    let syncActivityFinished = false;
    let actionQueue: PayloadAction<string>[] = [];

    function flushQueue() {
      actionQueue.forEach((a) => store.dispatch(a));
      actionQueue = [];
    }

    function asyncDispatch(asyncAction: PayloadAction<string>) {
      actionQueue = actionQueue.concat([asyncAction]);

      if (syncActivityFinished) {
        flushQueue();
      }
    }

    const actionWithAsyncDispatch = { ...action, asyncDispatch };

    next(actionWithAsyncDispatch);
    syncActivityFinished = true;
    flushQueue();
  };

export default asyncDispatchMiddleware;