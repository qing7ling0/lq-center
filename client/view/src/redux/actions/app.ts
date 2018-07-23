import { LOGIN_REQ, LOGIN_RES, LOGIN_CHECK_REQ, LOGIN_CHECK_RES, REGISTER_REQ, REGISTER_RES } from '../action-type';
import { createAction, createStandardAction } from 'typesafe-actions';
import { IResponse } from 'Interfaces/response';


export const reqLogin = createAction(LOGIN_REQ, resolve => {
  return (account: string, password: string) => resolve({account, password, channel: "taotu"});
})
export const resLogin = createStandardAction(LOGIN_RES)<IResponse>()

export const reqRegister = createAction(REGISTER_REQ, resolve => {
  return (account: string, password: string) => resolve({account, password, channel: "taotu"});
})
export const resRegister = createStandardAction(REGISTER_RES)<IResponse>()

export const reqLoginCheck = createAction(LOGIN_CHECK_REQ, resolve => {
  return () => resolve({});
})
export const resLoginCheck = createStandardAction(LOGIN_CHECK_RES)<IResponse>()
