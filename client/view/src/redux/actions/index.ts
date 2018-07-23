import * as app from './app'
import * as user from './user'
import { ActionType } from 'typesafe-actions';

const actions = {
  ...app,
  ...user,
}
export default actions;
export type ActionsType = ActionType<typeof actions>;