import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import App from './components/App/App';
import { default as configureStore } from './api/store';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
