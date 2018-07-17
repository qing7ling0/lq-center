import React from 'react';
import { IState } from 'Interfaces/state';
import { History } from 'history';
import { Form, Input, Icon, Checkbox, Button, Card, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { $Call } from 'utility-types';
import md5 from 'md5'

import actions from 'redux/actions';

import { pageCompose} from 'utils/pageProps';
import * as constants from './constants';

const FormItem = Form.Item;

export interface ILoginPageProps extends FormComponentProps {
  history: History;
}

const stateProps = (state: IState) => {
  const app: any = state.get('app');
  return {
    user: app && app.get('user') || null
  };
};

const actionCreators = {
  reqLogin: actions.reqLogin,
  reqLoginCheck: actions.reqLoginCheck
};

type Props = $Call<typeof stateProps> & ILoginPageProps & typeof actionCreators;

export class LoginPage extends React.PureComponent<Props, undefined> {
  constructor(props: Props) {
    super(props);
  }

  componentWillMount(){
    this.props.reqLoginCheck();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.user !== this.props.user && nextProps.user) {
      this.props.history.replace('/home');
    }
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const xdd = <div></div>
    return (
      <div className="page-login">
        <div className="mask" />
        <Card className="login-container relative-center">
          <div className="login-title">韬图教育</div>
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
      this.props.reqLogin(account, md5(password));
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

export default pageCompose<ILoginPageProps>({
  stateProps,
  actionCreators
})(Form.create()(LoginPage));
