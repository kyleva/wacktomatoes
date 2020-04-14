import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';

import Home from '../../containers/Home';
import History from '../../containers/History';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import UserUtility from '../../containers/UserUtility';

import { history } from '../../api/store';

interface AppProps {
  history: typeof history;
}

const App = ({ history }: AppProps) => (
  <ConnectedRouter history={history}>
    <header>wacktomatoes >></header>
    <Switch>
      <Route path="/register">
        <RegisterForm />
      </Route>
      <Route path="/">
        <>
          <UserUtility />
          <Home />
          <hr />
          <History />
        </>
      </Route>
    </Switch>
  </ConnectedRouter>
);

export default App;
