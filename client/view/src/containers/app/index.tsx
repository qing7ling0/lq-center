import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from '../home';
import LoginPage from '../login';
import RegisterPage from '../login/register';
import ResetPasswordPage from '../user/reset-password';
import ResetPasswordTokenPage from '../user/reset-password-token';

import Header from './Header';

const App: React.SFC<{}> = () => (
  <div className="root">
    <Header />
    <Switch>
      <Route exact path='/' component={LoginPage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/register' component={RegisterPage} />
      <Route exact path='/home' component={HomePage} />
      <Route path='/reset_password/:token' component={ResetPasswordPage} />
      <Route path='/reset_password_token' component={ResetPasswordTokenPage} />
    </Switch>
  </div>
);

export default App;
