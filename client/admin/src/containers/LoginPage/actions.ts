import { LOAD_HITOKOTO, LOAD_HITOKOTO_SUCCESS, LOAD_HITOKOTO_ERROR, LOGIN_REQ, LOGIN_RES } from './constants';
import { createAction, createStandardAction, getType, ActionType } from 'typesafe-actions';
import {IResponse} from 'Interfaces/response';

const actions = {
  reqLogin : createAction(LOGIN_REQ, resolve => {
    return (account: string, password: string) => resolve({account, password, channel: "taotu"});
  }),
  resLogin : createStandardAction(LOGIN_RES)<IResponse>()
};
export default actions;
export type LoginActionType = ActionType<typeof actions>;
