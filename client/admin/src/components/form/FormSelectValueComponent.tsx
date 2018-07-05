import React, { Component } from 'react';
import { Select } from 'antd';

interface IProps {
  source: any[];
  value: any;
  onChange: (value: any) => {};
}

class FormSelectValueComponent extends Component<IProps, any> {
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
    const source = this.props.source || [];
    return (
      <Select
        defaultActiveFirstOption={true}
        mode='combobox'
        filterOption={false}
        onChange={(value: any) => {
          this.props.onChange(this.findItemByName(value));
        }}
      >
        {
          source.map((item, index) => {
            return (<Select.Option key={index} value={item.name}>{item.name}</Select.Option>);
          })
        }
      </Select>
    );
  }

  findItemByName(name: string): any {
    if (!this.props.source) {
      return {_id: 0, name};
    }
    for (const item of this.props.source) {
      if (item.name === name) {
        return item;
      }
    }

    return {_id: 0, name: ''};
  }
}

export default FormSelectValueComponent;
