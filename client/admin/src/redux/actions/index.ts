import * as app from './app.js'
import * as user from './user.js'
import { ActionType } from 'typesafe-actions';

const actions = {
  ...app,
  ...user,
}
export default actions;
export type ActionsType = ActionType<typeof actions>;