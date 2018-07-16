import React from 'react';
import { History } from 'history'
import { Icon, Menu } from 'antd';

import SubMenu from 'antd/lib/menu/SubMenu';
import utils from 'utils/utils'

interface INavComponetProps {
    currentNavKey: string;
    history: History;
    user: any;
    menus: any[];
    routersIDMap: any[];
}

interface INavStates {
    loading: boolean;
    success: boolean,
    openKeys: string[],
    selectedKeys: string[]
}

export class NavComponet extends React.PureComponent<INavComponetProps, INavStates> {
  // 构造函数，在创建组件的时候调用一次
  constructor(props: INavComponetProps) {
    super(props);

    this.state = {
      loading: false,
      success: true,
      openKeys: [],
      selectedKeys: []
    }
  }

  componentWillMount(){
    this.navReset(this.props.currentNavKey);
  }

  componentDidMount() {
  }
  
  componentWillUpdate(nextProps: INavComponetProps, nextState: INavStates){
    if (nextProps.currentNavKey !== this.props.currentNavKey) {
      this.navReset(nextProps.currentNavKey);
    }
  }

  render() {
    let items = this.renderSubMenus(this.props.menus, true);
    return (
      <div className="nav-container">
        <div className="nav-header-container">
          韬图教育
        </div>
        <Menu className="nav-menu-container"
          mode="inline"
          theme="dark"
          inlineCollapsed={false}
          openKeys={this.state.openKeys}
          selectedKeys={this.state.selectedKeys}
          onOpenChange={this.onOpenChange}
          onClick={(item: any)=>{
            this.props.history.replace(this.props.routersIDMap[item.key].url);
          }}
        >
          {items}
        </Menu>
      </div>
    );
  }

  onOpenChange(openKeys: string[]) {
    this.setState({openKeys:openKeys})
  }

  navReset(key: string) {
    let numKey = utils.stringToInt(key, 0);
    let arrNav = [];
    while(numKey > 0) {
      arrNav.push(numKey);
      numKey = Math.floor(numKey / 100);
    }
    let _selectedKeys = [];
    let _openKeys = this.state.openKeys;
    for(let i=0; i<arrNav.length; i++) {
      if (i === 0) {
        _selectedKeys.push(arrNav[i]+'');
      } else {
        let key = arrNav[i] + '';
        if (_openKeys.indexOf(key) === -1){
          _openKeys.push(arrNav[i]+'');
        }
      }
    }

    this.setState({openKeys:_openKeys, selectedKeys:_selectedKeys});
  }

  renderSubMenus(subMenus: any[], sub: boolean): any {
    if (!subMenus) return null;

    return subMenus.map((item, index) => {
      let view = null;
      if (sub) {
        if (item.subMenus) {
          let subViews = this.renderSubMenus(item.subMenus, false);
          view = (<SubMenu className="nav-sub-menu-container" key={item.id} title={<span><Icon type={item.icon} /><span className="nav-menu-title">{item.name}</span></span>}>{subViews}</SubMenu>);
        } else {
          view = (<Menu.Item key={item.id}><span><Icon type={item.icon} /><span className="nav-menu-title">{item.name}</span></span></Menu.Item>);
        }
      } else {
        if (item.subMenus) {
          let subViews = this.renderSubMenus(item.subMenus, false);
          view = (<SubMenu key={item.id} title={<span className="nav-menu-sub-title">{item.name}</span>}>{subViews}</SubMenu>);
        } else {
          view = (<Menu.Item key={item.id}><span><Icon type="right" /><span className="nav-menu-sub-title">{item.name}</span></span></Menu.Item>);
        }
      }
      return view;
    });
  }
}

export default NavComponet;