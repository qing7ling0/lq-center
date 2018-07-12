import { fromJS } from 'immutable';
import actions, { LoginActionType } from './actions';
import { getType } from 'typesafe-actions';

const initialState = fromJS({
  loading: false,
  error: false,
  hitokoto: undefined
});

export default function loginReducer(state = initialState, action: LoginActionType) {
  const result: any = action.payload;
  switch (action.type) {
    case getType(actions.resLogin):
      state = state.set('loading', false);
      console.log("resLogin=" + JSON.stringify(result));
      if (result.code === 0) {
        state.set('user', result.data.user);
      }
    case getType(actions.reqLogin):
      return state.set('loading', true);
    default:
      return state;
  }
}
