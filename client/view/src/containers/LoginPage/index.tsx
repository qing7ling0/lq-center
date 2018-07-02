import React from 'react';
import { createSelector } from 'reselect';
import { Dispatch } from 'redux';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { loadHitokoto } from 'containers/HomePage/actions';
import { makeSelectHitokoto } from 'containers/HomePage/selectors';

import reducer from './reducer';
import saga from './saga';

import { $Call } from 'utility-types';
import { pageCompose} from 'utils/pageProps';
// import FormItemComponent from '../../components/form/FormItemComponent';

const FormItem = Form.Item;

interface ILoginPageProps {
  form: Form;
}

const mapStateToProps = createSelector(
  makeSelectHitokoto(),
  (hitokoto) => ({ hitokoto })
);

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onGetHitokoto: () => (dispatch(loadHitokoto()))
});

type Props = $Call<typeof mapStateToProps> & ILoginPageProps & FormComponentProps & $Call<typeof mapDispatchToProps>;

export class LoginPage extends React.PureComponent<Props, undefined> {

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
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
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
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
})(LoginPage);
