import { applyMiddleware, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';
import epics from './epics';

/**
 * Setup reducers
 */
export const rootEpic = combineEpics(...epics);
export const rootReducer = combineReducers(reducers);
/**
 * Setup epic middleware w/ dependecies
 */
export const epicDependencies = {
  window,
};
const epicMiddleware = createEpicMiddleware({
  dependencies: epicDependencies,
});
const middleware = [epicMiddleware];

export default function() {
  const store = configureStore({
    enhancers: [applyMiddleware(...middleware)],
    reducer: rootReducer,
  });

  epicMiddleware.run(rootEpic);

  return store;
}
