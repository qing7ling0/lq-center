import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from '../HomePage/Loadable';
import LoginPage from '../LoginPage';

import Header from './Header';

const App: React.SFC<{}> = () => (
  <div className="root">
    <Header />
    <Switch>
      <Route exact path='/' component={LoginPage} />
      <Route exact path='/login' component={LoginPage} />
    </Switch>
  </div>
);

export default App;
