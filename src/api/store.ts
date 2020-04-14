/** Third-party dependencies */
import { applyMiddleware, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import Cookies from 'js-cookie';
import { createBrowserHistory } from 'history';

/** Our code */
// Actions
import { appStart } from './lifecycle/actions';
// Middlewares
import epics from './epics';
// Reducers
import reducers from './reducers';

/**
 * Setup history
 */
export const history = createBrowserHistory();

/**
 * Setup reducers
 */
export const allReducers = {
  ...reducers,
  router: connectRouter(history),
};
export const rootEpic = combineEpics(...epics);
export const rootReducer = combineReducers(allReducers);

/**
 * Export RootState
 * TODO: consider refactoring and getting dispatch type later
 */
declare global {
  type RootState = ReturnType<typeof rootReducer>;
}

/**
 * Setup epic middleware w/ dependecies
 */
export const epicDependencies = {
  cookies: Cookies,
  window,
};
const epicMiddleware = createEpicMiddleware({
  dependencies: epicDependencies,
});
const middleware = [routerMiddleware(history), epicMiddleware];

export default function () {
  const store = configureStore({
    enhancers: [applyMiddleware(...middleware)],
    reducer: rootReducer,
  });

  epicMiddleware.run(rootEpic);

  store.dispatch(appStart());

  return store;
}
