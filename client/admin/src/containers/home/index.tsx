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
import * as constants from '../../constants/constants'

export interface IHomePageProps extends FormComponentProps {
  history: History;
}

const stateProps = (state: IState) => {
  const login: any = state.get('login');
  return {
    user: login.get('user')
  };
};

const actionCreators = {
};

type Props = $Call<typeof stateProps> & IHomePageProps & typeof actionCreators;

class HomePage extends React.PureComponent<Props, undefined> {
  public render() {
    return (
      <Layout>
        <Sider style={{overflowX: 'hidden', overflowY: 'auto', backgroundColor: '#181d20'}}>
          <NavComponent history={this.props.history} user={this.props.user} currentNavKey={""} menus={[]} routersIDMap={[]} />
        </Sider>
        <Layout>
          <HomeHeaderComponet user={this.props.user} />
          <Content>
            <div className="content-container">
              <Switch>
                {routers} 
                (<Redirect 
                  key={constants.Routers.user.id} 
                  from={constants.Routers.user.url} 
                  to={constants.Routers.userList.url}
                />)
              </Switch>
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
