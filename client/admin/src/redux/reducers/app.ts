import { fromJS } from 'immutable';
import actions, { ActionsType } from '../actions';
import { getType } from 'typesafe-actions';

const initialState = fromJS({
  loading: false,
  error: false,
  user: undefined
});

export default function reducer(state = initialState, action: ActionsType) {
  const result: any = action.payload;
  switch (action.type) {
    case getType(actions.resLogin):
      if (result.code === 0) {
        return state.set('user', result.data);
      }
      return state;
    default:
      return state;
  }
}
