import { LOGIN_REQ, LOGIN_RES } from '../action-type';
import { createAction, createStandardAction } from 'typesafe-actions';
import { IResponse } from 'Interfaces/response';


export const reqLogin = createAction(LOGIN_REQ, resolve => {
  return (account: string, password: string) => resolve({account, password, channel: "taotu"});
})

export const resLogin = createStandardAction(LOGIN_RES)<IResponse>()
