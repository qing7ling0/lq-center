import React, { Component } from 'react';

interface IProps {
  value: any;
  render: (value: any) => {};
}

class FormTextComponent extends Component<IProps, any> {
  // 构造函数，在创建组件的时候调用一次
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: this.props.value || ''
    };
  }

  componentWillReceiveProps(nextProps: IProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({value});
    }
  }

  render() {
    const value = (this.state.value !== null && this.state.value !== undefined) ? this.state.value : '';
    return (
      <div className='form-text'>
        {
          this.props.render ?
          this.props.render(value)
          :
          value
        }
      </div>
    );
  }
}

export default FormTextComponent;
