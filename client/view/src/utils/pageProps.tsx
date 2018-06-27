import { $Call } from 'utility-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { IReducer, ISaga } from 'Interfaces/saga';
import injectReducer from './injectReducer';
import injectSaga from './injectSaga';
import { ONCE_TILL_UNMOUNT } from 'constants/constants';

interface IPageComposeType {
  mapStateToProps: any;
  mapDispatchToProps: any;
  reducer: IReducer;
  saga: ISaga;
}

function pageCompose<PageProps>(pageComposeType: IPageComposeType) {

  type stateProps = $Call<typeof pageComposeType.mapStateToProps>;
  type dispatchProps = $Call<typeof pageComposeType.mapDispatchToProps>;
  if (pageComposeType.saga.mode) {
    pageComposeType.saga.mode = ONCE_TILL_UNMOUNT;
  }

  const withConnect = connect<stateProps, dispatchProps, PageProps>(pageComposeType.mapStateToProps, pageComposeType.mapDispatchToProps);
  const withReducer = injectReducer(pageComposeType.reducer);
  const withSaga = injectSaga(pageComposeType.saga);

  return compose(
    withReducer,
    withSaga,
    withConnect
  );
}

export {
  pageCompose
};
