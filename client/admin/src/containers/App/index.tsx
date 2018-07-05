import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage';

import Header from './Header';

const App: React.SFC<{}> = () => (
  <div className="root">
    <Header />
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/login' component={LoginPage} />
    </Switch>
  </div>
);

export default App;
