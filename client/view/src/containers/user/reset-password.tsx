import React from 'react';
import { IState } from 'Interfaces/state';
import { match } from 'react-router'
import { Form, Input, Icon, Checkbox, Button, Card, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { $Call } from 'utility-types';

import actions from 'redux/actions';

import { pageCompose} from 'utils/pageProps';
// import FormItemComponent from '../../components/form/FormItemComponent';
import * as constants from 'constants/constants'

const FormItem = Form.Item;

export interface IResetPasswordPageProps extends FormComponentProps {
  match: match<any>;
}

const stateProps = (state: IState) => {
  const user: any = state.get('user');
  return {
    // userList: user.get('userList')
  };
};

const actionCreators = {
  reqResetPassword: actions.reqResetPassword
};

type Props = $Call<typeof stateProps> & IResetPasswordPageProps & typeof actionCreators;

export class ResetPasswordPage extends React.PureComponent<Props, undefined> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-login">
        <div className="mask" />
        <Card className="login-container relative-center" title={<div className="login-title">设置新密码</div>}>
          <Form className="login-form">
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '输入新密码!' }, {validator: this.checkPassword}]
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入新密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password2', {
                rules: [{ required: true, message: '再次输入密码!' }, {validator: this.checkPassword2}]
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="再次输入密码" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={() => this.onResetBtnClicked()} className="btn-login">重置</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }

  checkPassword = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback("密码不能为空!");
    } else if (value.length < constants.ACCOUNT_MIN_LENGTH || value.length > constants.ACCOUNT_MAX_LENGTH) {
      callback(`密码长度在${constants.ACCOUNT_MIN_LENGTH}-${constants.ACCOUNT_MAX_LENGTH}!`);
    } else if (!/^[0-9a-zA-Z~!@#$%\^&*\(\)_+-=\[\]\{\<\>\,\.\/?|\`\}]*$/.test(value)) {
      callback("密码只能是数字、字母!");
    }
    callback();
  }

  checkPassword2 = (rule: any, value: string, callback: any) => {
    let pw = this.props.form.getFieldValue("password")
    if (!value) {
      callback("密码不能为空!");
    } else if (value.length < constants.ACCOUNT_MIN_LENGTH || value.length > constants.ACCOUNT_MAX_LENGTH) {
      callback(`密码长度在${constants.ACCOUNT_MIN_LENGTH}-${constants.ACCOUNT_MAX_LENGTH}!`);
    } else if (!/^[0-9a-zA-Z~!@#$%\^&*\(\)_+-=\[\]\{\<\>\,\.\/?|\`\}]*$/.test(value)) {
      callback("密码只能是数字、字母!");
    } else if (pw !== value) {
      callback("两次密码不一致!");
    }
    callback();
  }

  onReset(password: string) {
    password = password.trim();
    let token = this.props.match.params.token
    this.props.reqResetPassword(token, password)
  }

  onResetBtnClicked() {
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        this.onReset(values.password);
      }
    });
  }
}

export default pageCompose<IResetPasswordPageProps>({
  stateProps,
  actionCreators
})(Form.create()(ResetPasswordPage));
