import React from 'react';
import { IState } from 'Interfaces/state';
import { Form, Input, Icon, Checkbox, Button, Card, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { $Call } from 'utility-types';

import actions from './actions';

import reducer from './reducer';
import saga from './saga';

import { pageCompose} from 'utils/pageProps';
import * as constants from './constants';
// import FormItemComponent from '../../components/form/FormItemComponent';

const FormItem = Form.Item;

export interface IUserListPageProps extends FormComponentProps {
  x: number;
}

const stateProps = (state: IState) => {
  const user: any = state.get('login');
  return {
    userList: user.get('userList')
  };
};

const actionCreators = {
  reqLogin: actions.reqLogin
};

type Props = $Call<typeof stateProps> & IUserListPageProps & typeof actionCreators;

export class UserListPage extends React.PureComponent<Props, undefined> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-login">
        <div className="mask" />
        <Card className="login-container relative-center">
          <div className="login-title">用户列表</div>
          <Form className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }, {validator: this.checkAccount}]
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }, {validator: this.checkPassword}]
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={() => this.onLoginBtnClicked()} className="btn-login">登陆</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }

  checkAccount(rule: any, value: string, callback: any) {
    if (!value) {
      callback("账号不能为空!");
    } else if (value.length < constants.ACCOUNT_MIN_LENGTH || value.length > constants.ACCOUNT_MAX_LENGTH) {
      callback(`账号长度在${constants.ACCOUNT_MIN_LENGTH}-${constants.ACCOUNT_MAX_LENGTH}!`);
    } else if (!/^[a-zA-Z0-9_-]*$/.test(value)) {
      callback("账号只能是数字、字母!");
    }
    callback();
  }

  checkPassword(rule: any, value: string, callback: any) {
    if (!value) {
      callback("密码不能为空!");
    } else if (value.length < constants.ACCOUNT_MIN_LENGTH || value.length > constants.ACCOUNT_MAX_LENGTH) {
      callback(`密码长度在${constants.ACCOUNT_MIN_LENGTH}-${constants.ACCOUNT_MAX_LENGTH}!`);
    } else if (!/^[0-9a-zA-Z~!@#$%\^&*\(\)_+-=\[\]\{\<\>\,\.\/?|\`\}]*$/.test(value)) {
      callback("密码只能是数字、字母!");
    }
    callback();
  }

  onLogin(account: string, password: string) {
    account = account.trim();
    password = password.trim();

    let focusAccount = false;
    let focusPassword = false;

    if (!account) {
      message.error("账号密码不能为空!");
      focusAccount = true;
    } else if (account.length < constants.ACCOUNT_MIN_LENGTH || account.length > constants.ACCOUNT_MAX_LENGTH) {
      message.error(`账号密码长度在${constants.ACCOUNT_MIN_LENGTH}-${constants.ACCOUNT_MAX_LENGTH}!`);
      focusAccount = true;
    } else if (!account) {
      // todo 验证字符串格式是否合法
      message.error("账号密码只能是数字、字母");
      focusAccount = true;
    }

    if (!password) {
      if (!focusAccount) {
        message.error("账号密码不能为空!");
      }
      focusPassword = true;
    } else if (password.length < constants.ACCOUNT_MIN_LENGTH || password.length > constants.ACCOUNT_MAX_LENGTH) {
      if (!focusAccount) {
        message.error(`账号密码长度在${constants.ACCOUNT_MIN_LENGTH}-${constants.ACCOUNT_MAX_LENGTH}!`);
      }
      focusPassword = true;
    }  else if (!password) {
      // todo 验证字符串格式是否合法
      if (!focusAccount) {
        message.error("账号密码只能是数字、字母");
      }
      focusPassword = true;
    }

    if (focusAccount || focusPassword) {
      // this.props.reqLogin(account, password);
      // if (focusAccount) {
      //   if(this.refAccountInput) {
      //     this.refAccountInput.focus();
      //   }
      // }
      // if (focusPassword) {
      //   if(this.refPasswordInput) {
      //     this.refPasswordInput.focus();
      //   }
      // }
      // this.setState({accountError:focusAccount, passwordError:focusPassword});
    } else {
      this.props.reqLogin(account, password);
      // this.props.reqLogin(account, password);
      // this.setState({accountError:false, passwordError:false});
    }
  }

  onLoginBtnClicked() {
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        this.onLogin(values.userName, values.password);
      }
    });
  }
}

export default pageCompose<IUserListPageProps>({
  stateProps,
  actionCreators,
  reducer: {key: 'login', reducer},
  saga: {key: 'login', saga}
})(Form.create()(UserListPage));
