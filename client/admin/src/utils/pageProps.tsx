import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { createSelector } from 'reselect';

import { IReducer, ISaga } from 'Interfaces/saga';
import { IState } from 'Interfaces/state';
import injectReducer from './injectReducer';
import injectSaga from './injectSaga';
import { ONCE_TILL_UNMOUNT } from 'constants/constants';

interface IPageComposeType {
  stateProps: any;
  actionCreators: any;
  reducer: IReducer;
  saga: ISaga;
}

function pageCompose<PageProps>(pageComposeType: IPageComposeType) {

  type stateProps = typeof pageComposeType.stateProps;
  type dispatchProps = typeof pageComposeType.actionCreators;
  if (pageComposeType.saga.mode) {
    pageComposeType.saga.mode = ONCE_TILL_UNMOUNT;
  }

  const withConnect = connect<stateProps, dispatchProps, PageProps>(createSelector((state: IState) => state, pageComposeType.stateProps), (dispatch: Dispatch) => (bindActionCreators(pageComposeType.actionCreators, dispatch)));
  const withReducer = injectReducer(pageComposeType.reducer);
  const withSaga = injectSaga(pageComposeType.saga);

  return compose(
    withReducer,
    withSaga,
    withConnect
  );
}

function createActionDispatch(action: any, dispatch: Dispatch) {
  const args: any = arguments;

  console.log(arguments[0]);
  const a: any[] = [];
  for (let index = 0; index < args.length; index++) {
    const element = arguments[index];
    a.push(element);
  }
  dispatch(action(...a));
}

function bindActionCreators<T>(actions: any, dispatch: Dispatch): T {
  if (!actions || !dispatch) {
    return null;
  }

  const ret: any = {};
  for (const key in actions) {
    if (actions.hasOwnProperty(key)) {
      ret[key] = (...items: any[]) => {
        dispatch(actions[key](...items));
      };
    }
  }

  return ret;
}

export {
  pageCompose
};
