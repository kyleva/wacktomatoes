import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { reducers } from './reducers';

/**
 * Setup reducers
 */
const allReducers = [...reducers];
export const rootReducer = combineReducers(allReducers);

/**
 * Setup epic middleware w/ dependecies
 */
export const epicDependencies = {
  window
};
const epicMiddleware = createEpicMiddleware({
  dependencies: epicDependencies
});
const middleware = [epicMiddleware];

// TODO: setup redux devtools

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  return store;
}
