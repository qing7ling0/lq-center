import { fromJS } from 'immutable';
import actions, { ActionsType } from '../actions';
import * as constants from 'constants/constants'
import { getType } from 'typesafe-actions';

export const initialState = fromJS({
  loading: false,
  error: false,
  userList: [],
  userListPage: constants.PAGE_DEFAULT,
  resetPasswordTokenInfo: {
    account: '',
    token: '',
    email: ''
  },
  resetPasswordSuccess: false
});

export function reducer(state = initialState, action: ActionsType) {
  const result: any = action.payload;
  switch (action.type) {
    case getType(actions.reqResetPasswordToken):
      return state.set('resetPasswordTokenInfo', {account:'', token:'', email:''});
    case getType(actions.resResetPasswordToken):
      if (result.code === 0) {
        return state.set('resetPasswordTokenSuccess', result.data);
      }
      return state;
    case getType(actions.reqResetPassword):
      return state.set('resetPasswordSuccess', false);
    case getType(actions.resResetPassword):
      if (result.code === 0) {
        return state.set('resetPasswordSuccess', true);
      }
      return state;
    default:
      return state;
  }

  return state;
}
