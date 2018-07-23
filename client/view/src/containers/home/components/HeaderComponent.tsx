import React from 'react';
import { Row, Col, Avatar, Dropdown, Icon, Menu } from 'antd';

const USER_MENUS = [
  {key: 'profile', title: '个人信息'},
  {key: 'logout', title: '退出'}
];

export interface IHomeHeaderComponetProps {
  user: any;
}

export class HomeHeaderComponet extends React.PureComponent<IHomeHeaderComponetProps, any> {
  userMenus: any = null;

  // 构造函数，在创建组件的时候调用一次
  constructor(props: IHomeHeaderComponetProps) {
    super(props);

    this.userMenus = (
      <Menu onClick={(item) => {
        switch(item.key) {
          case 'profile':
          break;
          case 'logout':
            // this.props.reqLogout();
          break;
        }}}>
        {
          USER_MENUS.map((item) => {
            return (<Menu.Item key={item.key}>{item.title}</Menu.Item>);
          })
        }
      </Menu>
    )
  }

  componentWillMount() {}

  componentDidMount() {}
  
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div className="header">
        <Row>
          <Col span={6} style={{height: 64}} className="header-col">
            {/* <Button type="primary" onClick={this.toggleCollapsed}>
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button> */}
          </Col>
          <Col span={12} className="header-col" />
          <Col span={6} style={{height: 64}} className="header-col">
          {
            (this.props.user) ?
            <Dropdown overlay={this.userMenus}>
              <div className="header-user-container">
                <Avatar className="header-user-avatar" size="default" icon="user" />
                <div className="header-user-name">
                  {this.props.user.name} <Icon type="down" />
                </div>
              </div>
            </Dropdown>
            : null
          }
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomeHeaderComponet;
