import React from 'react';
import { createSelector } from 'reselect';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { loadHitokoto } from 'containers/HomePage/actions';
import { makeSelectHitokoto } from 'containers/HomePage/selectors';
import reducer from './reducer';
import saga from './saga';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { $Call } from 'utility-types';
import { ONCE_TILL_UNMOUNT } from 'utils/constants';

interface ILoginPageProps {
}

const mapStateToProps = createSelector(
  makeSelectHitokoto(),
  (hitokoto) => ({ hitokoto })
);

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onGetHitokoto: () => (dispatch(loadHitokoto()))
});

type stateProps = $Call<typeof mapStateToProps>;
type dispatchProps = $Call<typeof mapDispatchToProps>;
type Props = stateProps & ILoginPageProps & dispatchProps;

export class LoginPage extends React.PureComponent<Props, undefined> {

  public render() {
    return (
      <div>
        <p>{this.props.hitokoto}</p>
      </div>
    );
  }
}

// tslint:disable-next-line:max-line-length
const withConnect = connect<stateProps, dispatchProps, ILoginPageProps>(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga, mode: ONCE_TILL_UNMOUNT });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(LoginPage);
