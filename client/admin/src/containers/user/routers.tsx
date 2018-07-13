import React, { Component } from 'react';
import {Route, Redirect} from 'react-router'

import UserListPage from './list'

import * as constants from 'constants/constants'

const routers: Array<any> = [
  (<Route 
    key={constants.Routers.userList.id} 
    path={constants.Routers.userList.url}  
    exact={true} 
    strict={true} 
    component={UserListPage} />),
  (<Redirect 
    key={constants.Routers.user.id} 
    from={constants.Routers.user.url} 
    to={constants.Routers.userList.url}
  />)
]

export default routers