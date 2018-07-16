import { fromJS } from 'immutable';
import { ActionsType } from '../actions';
import * as constants from 'constants/constants'

const initialState = fromJS({
  loading: false,
  error: false,
  userList: [],
  userListPage: constants.PAGE_DEFAULT
});

export default function reducer(state = initialState, action: ActionsType) {
  const result: any = action.payload;
  // switch (action.type) {
  //   case getType(actions.resGetUserList):
  //     state = state.set('loading', false);
  //     // console.log("resLogin=" + JSON.stringify(result));
  //     if (result.code === 0) {
  //       return state.set('user', result.data);
  //     }
  //     return state;
  //   case getType(actions.reqGetUserList):
  //     return state.set('loading', true);
  //   default:
  //     return state;
  // }

  return state;
}
