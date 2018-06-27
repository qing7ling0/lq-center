import React from 'react';
import moment from 'moment';

import { Form, Input, InputNumber, Switch, Radio, Upload, Icon, Cascader, Select, Checkbox, Button, DatePicker } from 'antd';
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import FormTextComponent from './FormTextComponent';
import FormColorPickerComponent from './FormColorPickerComponent';

const defaultFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

interface IProps {
  options: any;
  form: any;
  type: string;
}

export default class FormItemComponent extends React.PureComponent<IProps, undefined> {

  render() {
    return this.createFormItem(this.props.options);
  }

  createFormItem = (options: any) => {
    const { getFieldDecorator } = this.props.form;

    let itemOptions = { ...defaultFormItemLayout, label: options.label };
    itemOptions = { ...itemOptions, ...options.itemOptions };
    let childOptions: any = {};
    if (options.options) {
      childOptions = { ...options.options };
    }
    let child = null;
    switch (options.type) {
      case 'input':
        childOptions.type = childOptions.type || 'text';
        childOptions.placeholder = childOptions.placeholder || `输入${options.label}`;
        child = (
          <Input {...childOptions} />
        );
        break;
      case 'textarea':
        childOptions.type = childOptions.type || 'text';
        childOptions.placeholder = childOptions.placeholder || `输入${options.label}`;
        child = (
          <Input.TextArea {...childOptions} />
        );
        break;
      case 'number':
        childOptions.min = childOptions.min || 0;
        childOptions.max = options.max === 0 ? 0 : (options.max || Number.MAX_VALUE);
        childOptions.placeholder = childOptions.placeholder || `输入${options.label}`;
        child = (
          <InputNumber {...childOptions} />
        );
        break;
      case 'text':
        child = (
          <FormTextComponent {...childOptions} />
        );
        break;
      case 'colorPicker':
        child = (
          <FormColorPickerComponent {...childOptions} />
        );
        break;
      case 'select':
        childOptions.mode = childOptions.mode || '';
        childOptions.placeholder = childOptions.placeholder || `输入${options.label}`;
        child = (
          <Select {...childOptions}>
            {
              options.selectItems.map((item: any, index: number): any => {
                let haId: any = {};
                if (item._id) {
                  haId = { haId: item._id };
                }
                if (item.render) {
                  return <Option key={item.value} value={item.value} {...haId}>{item.render(item, index)}</Option>;
                } else {
                  return <Option key={item.value} value={item.value} {...haId}>{item.label}</Option>;
                }
              })
            }
          </Select>
        );
        break;
      case 'checkbox':
        if (options.checkboxItems.length === 1) {
          child = (
            <Checkbox {...childOptions}>{options.checkboxItems[0].label}</Checkbox>
          );
        } else {
          if (options.render) {
            const _options: any = childOptions.options;
            childOptions.options = null;
            child = (
              <Checkbox.Group {...childOptions}>
                {options.render(_options)}
              </Checkbox.Group>
            );
          } else {
            child = (
              <Checkbox.Group {...childOptions} />
            );
          }
        }
        break;
      case 'radioGroup':
        child = (
          <RadioGroup {...childOptions} />
        );
        break;
      case 'radioButton':
        child = (
          <RadioGroup {...childOptions}>
            {options.radioItems.map((item: any) => {
              return <RadioButton key={item.value} value={item.value}>{item.label}</RadioButton>;
            })}
          </RadioGroup>
        );
        break;
      case 'switch':
        child = (
          <Switch {...childOptions} />
        );
        break;
      case 'upload':
        child = (
          <div>
            {
              options.render ?
                options.render()
                :
                <Upload {...childOptions} >
                  <Button>
                    <Icon type='upload' />点击上传
                </Button>
                </Upload>
            }
          </div>
        );
        break;
      case 'datePicker':
        childOptions.placeholder = childOptions.placeholder || `输入${options.label}`;
        let _com: any = DatePicker;
        if (options.mode === 'month') {
          _com = DatePicker.MonthPicker;
        } else if (options.mode === 'range') {
          _com = DatePicker.RangePicker;
        }
        if (options.decoratorOptions && options.decoratorOptions.initialValue) {
          const _value = options.decoratorOptions.initialValue;
          if (!(_value instanceof moment)) {
            options.decoratorOptions.initialValue = moment(_value);
          }
        }
        child = (
          <_com name={options.name} {...childOptions} />
        );
        break;
      case 'cascader':
        childOptions.placeholder = childOptions.placeholder || `输入${options.label}`;
        child = (
          <Cascader {...childOptions} />
        );
        break;
    }
    let rules: any[] = [];
    if (options.rules) {
      rules = rules.concat(options.rules);
    } else if (options.rule) {
      if (options.rule.type) {
        rules.push({ type: options.rule.type, message: `输入的${options.label}不合法` });
      }
      if (options.rule.required) {
        rules.push({ required: true, message: `请输入${options.label}` });
      }
      if (options.rule.pattern) {
        rules.push({ pattern: options.rule.pattern, message: `输入的${options.label}不合法` });
      }
      if (options.rule.whitespace) { // 必选不能是空格
        rules.push({ whitespace: options.rule.whitespace, message: `请输入${options.label}` });
      }
      if (options.rule.validator) {
        rules.push({ validator: (rule: any, value: any, callback: any) => { return options.rule.validator(rule, value, callback, this.props.form); } });
      }
      if (options.rule.len) {
        rules.push({ len: options.rule.len, message: `字符不能超过${options.rule.len}个` });
      }
      if (options.rule.max || options.rule.min) {
        let msg = '';
        if (options.rule.hasOwnProperty('max') && options.rule.hasOwnProperty('min')) {
          msg = `字符个数在${options.rule.min}-${options.rule.max}之间`;
        } else if (options.rule.hasOwnProperty('max')) {
          msg = `字符个数不能超过${options.rule.max}个`;
        } else {
          msg = `字符个数不能少于${options.rule.max}个`;
        }
        rules.push({ max: options.rule.max, min: options.rule.min, message: msg });
      }
    }

    let fieldOp: any = {};
    if (options.decoratorOptions) {
      fieldOp = { ...options.decoratorOptions };
    }
    if (rules && rules.length > 0) {
      fieldOp.rules = rules;
    }
    return (
      <Form.Item
        key={options.name}
        {...itemOptions}
        className='form-item'
      >
        <div className='left-addon'>{options.addonBefore ? options.addonBefore : null}</div>
        {
          getFieldDecorator(options.name, fieldOp)(child)
        }
        <div className='right-addon'>{options.addonAfter ? options.addonAfter : null}</div>
      </Form.Item>
    );
  }
}
