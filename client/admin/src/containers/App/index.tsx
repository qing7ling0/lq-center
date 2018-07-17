import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from '../home';
import LoginPage from '../login';

import Header from './Header';

const App: React.SFC<{}> = () => (
  <div className="root">
    <Header />
    <Switch>
      <Route exact path='/' component={LoginPage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/home' component={HomePage} />
    </Switch>
  </div>
);

export default App;
