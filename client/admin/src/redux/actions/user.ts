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
