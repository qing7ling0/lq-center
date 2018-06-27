import React from 'react';
import { createSelector } from 'reselect';
import { Dispatch } from 'redux';
import { loadHitokoto } from 'containers/HomePage/actions';
import { makeSelectHitokoto } from 'containers/HomePage/selectors';
import reducer from './reducer';
import saga from './saga';

import { $Call } from 'utility-types';
import { pageCompose} from 'utils/pageProps';

interface ILoginPageProps {
}

const mapStateToProps = createSelector(
  makeSelectHitokoto(),
  (hitokoto) => ({ hitokoto })
);

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onGetHitokoto: () => (dispatch(loadHitokoto()))
});

type Props = $Call<typeof mapStateToProps> & ILoginPageProps & $Call<typeof mapDispatchToProps>;

export class LoginPage extends React.PureComponent<Props, undefined> {

  public render() {
    return (
      <div>
        <p>{this.props.hitokoto}</p>
      </div>
    );
  }
}

export default pageCompose<ILoginPageProps>({
  mapStateToProps,
  mapDispatchToProps,
  reducer: {key: 'login', reducer},
  saga: {key: 'login', saga}
})(LoginPage);
