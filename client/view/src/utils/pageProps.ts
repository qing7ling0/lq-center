import { $Call } from 'utility-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { IReducer, ISaga } from '../Interfaces/saga';
import injectReducer from './injectReducer';
import injectSaga from './injectSaga';

interface IPageComposeType {
  mapStateToProps: any;
  mapDispatchToProps: any;
  reducer: IReducer;
  saga: ISaga;
}

function pageCompose<PageProps>(pageComposeType: IPageComposeType) {

  type stateProps = $Call<typeof pageComposeType.mapStateToProps>;
  type dispatchProps = $Call<typeof pageComposeType.mapDispatchToProps>;

  const withConnect = connect<stateProps, dispatchProps, PageProps>(pageComposeType.mapStateToProps, pageComposeType.mapDispatchToProps);
  const withReducer = injectReducer(pageComposeType.reducer);
  const withSaga = injectSaga(pageComposeType.saga);

  const _compose = compose({
    withReducer,
    withSaga,
    withConnect
  });

  return _compose;
}
