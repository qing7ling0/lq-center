import { IState } from 'Interfaces/state';
import { createSelector } from 'reselect';

export const selectHome = (state: IState) => state.get('login');

export const makeSelectHitokoto = () => createSelector(
  selectHome,
  (loginState) => loginState.get('hitokoto')
);
