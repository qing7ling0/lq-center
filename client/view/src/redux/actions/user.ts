import * as types from '../action-type';
import { createAction, createStandardAction, getType, ActionType } from 'typesafe-actions';
import {IResponse} from 'Interfaces/response';

// const actions = {
//   reqLogin : createAction(LOGIN_REQ, resolve => {
//     return (account: string, password: string) => resolve({account, password, channel: "taotu"});
//   }),
//   resLogin : createStandardAction(LOGIN_RES)<IResponse>()
// };
// export default actions;
// export type LoginActionType = ActionType<typeof actions>;


export const reqGetUserList = createAction(types.GET_USER_LIST_REQ, resolve => {
  return () => resolve({});
})

export const resGetUserList = createStandardAction(types.GET_USER_LIST_RES)<IResponse>()


export const reqResetPassword = createAction(types.RESET_PASSWORD_REQ, resolve => {
  return (token, password) => resolve({token, password});
})

export const resResetPassword = createStandardAction(types.RESET_PASSWORD_RES)<IResponse>()

export const reqResetPasswordToken = createAction(types.RESET_PASSWORD_TOKEN_REQ, resolve => {
  return (account, redirect_uri) => resolve({account, redirect_uri});
})

export const resResetPasswordToken = createStandardAction(types.RESET_PASSWORD_TOKEN_RES)<IResponse>()