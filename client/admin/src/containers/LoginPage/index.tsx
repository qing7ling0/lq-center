import React from 'react';
import { createSelector } from 'reselect';
import { IState } from 'Interfaces/state';
import { Dispatch } from 'redux';
import { Form, Input, Icon, Checkbox, Button, Card } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { loadHitokoto } from 'containers/LoginPage/actions';

import reducer from './reducer';
import saga from './saga';

import { $Call } from 'utility-types';
import { pageCompose} from 'utils/pageProps';
// import FormItemComponent from '../../components/form/FormItemComponent';

const FormItem = Form.Item;

export interface ILoginPageProps extends FormComponentProps {
  x: number;
}

const mapStateToProps = createSelector(
  (state: IState) => state.get('login'),
  (loginState: IState) => ({ hitokoto: loginState.get('hitokoto') })
);

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onGetHitokoto: () => (dispatch(loadHitokoto()))
});

type Props = $Call<typeof mapStateToProps> & ILoginPageProps & $Call<typeof mapDispatchToProps>;

export class LoginPage extends React.PureComponent<Props, undefined> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-login">
        <div className="mask" />
        <Card className="login-container relative-center">
          <div className="login-title">韬图教育</div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }]
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }]
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="btn-login">登陆</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }

  handleSubmit() {
    return false;
  }
}

export default pageCompose<ILoginPageProps>({
  mapStateToProps,
  mapDispatchToProps,
  reducer: {key: 'login', reducer},
  saga: {key: 'login', saga}
})(Form.create()(LoginPage));
