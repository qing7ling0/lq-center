import { combineReducers } from 'redux';
import { compose } from 'redux';
import { message } from 'antd'
import { ActionsType } from '../actions';

import app from './app'
import user from './user'

interface IReducerNext {
  state: any;
  action: ActionsType
}

const reducers = combineReducers({app, user})

function errorReducer(next: IReducerNext): IReducerNext {
  if (!next) return null;
  let {action} = next;
  const result: any = action.payload;
  if (result && result.code && result.code < 0 && result.message) {
    message.error(result.message);
  }
  return next;
}

function loadingReducer(next: IReducerNext): IReducerNext {
  if (!next) return null;
  let {action, state} = next;
  if (action.type && action.type.endsWith('_REQ')) {
    state = state.set('loading', true);
  } else if (action.type && action.type.endsWith('_RES')) {
    state = state.set('loading', false);
  }
  return {state, action};
}

function listReducers(next: IReducerNext): IReducerNext {
  if (!next) return null;
  let {action, state} = next;
  let interrupt = false;
  if (action.type && action.type.endsWith('_PAGELIST')) {
    const result: any = action.payload;
    if (result.code === 0 && result.data) {
      let list = {};
      for(let key in result.data) {
        state = state.set(key, result.data[key].list).set(key+"Page", result.data[key].page);
        interrupt = true;
      }
    }
  }
  return {state, action :interrupt ? null : action};
}

function reducerCommon(state: any, action: ActionsType): IReducerNext {
  return compose(errorReducer, listReducers, loadingReducer)({state, action});
}

function reducer(reducers:any): any {
  let ret: any = {};
  for(let key of reducers) {
    ret[key] = (state: any, action: ActionsType) => {
      return reducerCommon(reducers[key](state, action), action).state;
    }
  }
  return ret;
}

export default combineReducers(reducer({app, user}))