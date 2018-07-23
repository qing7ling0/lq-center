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

export interface IResetPasswordTokenPageProps extends FormComponentProps {
  match: match<any>;
}

const stateProps = (state: IState) => {
  const user: any = state.get('user');
  return {
    // userList: user.get('userList')
    tokenInfo: user.get('resetPasswordTokenInfo')
  };
};

const actionCreators = {
  reqResetPasswordToken: actions.reqResetPasswordToken
};

type Props = $Call<typeof stateProps> & IResetPasswordTokenPageProps & typeof actionCreators;

export class ResetPasswordTokenPage extends React.PureComponent<Props, undefined> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-login">
        <div className="mask" />
        <Card className="login-container relative-center" title={<div className="login-title">重置密码申请</div>}>
        {
          this.props.tokenInfo && this.props.tokenInfo.email ?
          <div>邮件已发送至你的邮箱{this.props.tokenInfo.email} 快去查收邮件吧</div>
          :
          <Form className="login-form">
            <FormItem>
              {getFieldDecorator('account', {
                rules: [{ required: true, message: '输入账号!' }, {validator: this.checkAccount}]
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入账号" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={() => this.onResetBtnClicked()} className="btn-login">申请</Button>
            </FormItem>
          </Form>
        }
          
        </Card>
      </div>
    );
  }

  checkAccount = (rule: any, value: string, callback: any) => {
    if (!value) {
      callback("账号不能为空!");
    } else if (value.length < constants.ACCOUNT_MIN_LENGTH || value.length > constants.ACCOUNT_MAX_LENGTH) {
      callback(`账号长度在${constants.ACCOUNT_MIN_LENGTH}-${constants.ACCOUNT_MAX_LENGTH}!`);
    } else if (!/^[a-zA-Z0-9_-]*$/.test(value)) {
      callback("账号只能是数字、字母!");
    }
    callback();
  }


  onResetBtnClicked() {
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        this.props.reqResetPasswordToken(values.account.trim())
      }
    });
  }
}

export default pageCompose<IResetPasswordTokenPageProps>({
  stateProps,
  actionCreators
})(Form.create()(ResetPasswordTokenPage));
