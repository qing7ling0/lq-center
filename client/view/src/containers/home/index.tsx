import React from 'react';
import { Switch, Redirect } from 'react-router';
import { Layout, Row, Col, Avatar, message } from 'antd';
import { History } from 'history'
const { Header, Content, Sider, Footer } = Layout;
import { FormComponentProps } from 'antd/lib/form';
import { $Call } from 'utility-types';

import { IState } from 'Interfaces/state';
import { pageCompose} from 'utils/pageProps';

import HomeHeaderComponet from './components/HeaderComponent'
import NavComponent from './components/NavComponent'
import routers from './routers'
import * as constants from 'constants/constants'
import actions from 'redux/actions';

export interface IHomePageProps extends FormComponentProps {
  history: History;
}

const stateProps = (state: IState) => {
  const app: any = state.get('app');
  return {
    user: app.get('user') || null,
    loading: app.get('loading') || false,
    loginCheckMessage: app.get('loginCheckMessage') || ""
  };
};

const actionCreators = {
  reqLoginCheck: actions.reqLoginCheck
};

type Props = $Call<typeof stateProps> & IHomePageProps & typeof actionCreators;

class HomePage extends React.PureComponent<Props, undefined> {
  
  componentDidMount(){
    const {reqLoginCheck, user} = this.props;
    if (!user) {
      reqLoginCheck();
    }
  }

  componentWillReceiveProps(nextProps: Props){
    if (!nextProps.loading && !nextProps.user) {
      if (nextProps.loginCheckMessage) {
        message.error(nextProps.loginCheckMessage);
      }
      this.props.history.replace('/login');
    }
  }

  public render() {
    return (
      <Layout className="page-home">
        <Sider className="nav-container">
          <NavComponent history={this.props.history} user={this.props.user} currentNavKey={""} menus={[]} routersIDMap={[]} />
        </Sider>
        <Layout>
          <HomeHeaderComponet user={this.props.user} />
          <Content>
            <div className="content-container">
              {
                this.props.user ?
                <Switch>
                  {routers} 
                  (<Redirect 
                    key={constants.Routers.user.id} 
                    from={constants.Routers.user.url} 
                    to={constants.Routers.userList.url}
                  />)
                </Switch>
                : null
              }
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
  
}

export default pageCompose<IHomePageProps>({
  stateProps,
  actionCreators
})(HomePage);
