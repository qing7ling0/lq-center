import React from 'react';
import { SketchPicker } from 'react-color';

interface IProps {
  value: any;
  onChange: any;
}

export default class FormColorPickerComponent extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      pickerVisible: false,
      value: this.props.value || {}
    };
  }

  componentWillReceiveProps(nextProps: IProps) {
    // Should be a controlled component.
    if (nextProps.value !== this.props.value) {
      const value = nextProps.value;
      this.setState({value});
    }
  }

  triggerChange(changedValue: any) {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render() {
    const color = this.state.value || 0xffff00;
    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = (color) & 0xff;
    return (
      <span className='form-item-color-picker'>
        <div className='box' style={{backgroundColor: `rgb(${r},${g},${b})`}} onClick={() => { this.setState({pickerVisible: true}); }} />
        {
          this.state.pickerVisible ?
          <div>
            <div className='mask' onClick={() => { this.setState({pickerVisible: false}); }} />
            <div className='color-panel' onClick={(e) => { e.stopPropagation(); }}>
              <SketchPicker color={{r, g, b, a: 1}} onChange={this.handleColorChange} />
            </div>
          </div>
          : null
        }
      </span>
    );
  }

  handleColorChange = (color: any) => {
    if (color) {
      const value = ((color.rgb.r << 16) & 0xff0000) + ((color.rgb.g << 8) & 0xff00) + (color.rgb.b & 0xff);
      this.setState({value});
      this.triggerChange(value);
    }
  }
}
