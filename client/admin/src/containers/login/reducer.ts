import { fromJS } from 'immutable';
import {message} from 'antd'
import actions, { LoginActionType } from './actions';
import { getType } from 'typesafe-actions';

const initialState = fromJS({
  loading: false,
  error: false,
  user: undefined
});

export default function loginReducer(state = initialState, action: LoginActionType) {
  const result: any = action.payload;
  if (result && result.code && result.code < 0 && result.message) {
    message.error(result.message);
  }
  switch (action.type) {
    case getType(actions.resLogin):
      state = state.set('loading', false);
      // console.log("resLogin=" + JSON.stringify(result));
      if (result.code === 0) {
        return state.set('user', result.data);
      }
      return state;
    case getType(actions.reqLogin):
      return state.set('loading', true);
    default:
      return state;
  }
}
