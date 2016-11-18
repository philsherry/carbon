import React, { PropTypes } from 'react';
import I18n from "i18n-js";

import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

import Events from 'utils/helpers/events';
import classNames from 'classnames';

import { validProps } from '../../utils/ether';


const Sortcode = Input(InputLabel(InputValidation(
class Sortcode extends React.Component {
  static propTypes = {
    groups: PropTypes.string.isRequired,
    groupLength: PropTypes.string.isRequired,
  }

  state = {
    value: ''
  }

  onKeyDown = (ev) => {
    if (!Events.isNumberKey(ev) && !Events.isTabKey(ev) && !Events.isBackspaceKey(ev)) {
      ev.preventDefault()
    };
  }

  maxLength = () => {
    return (this.props.groups * this.props.groupLength) + this.props.groups - 1;
  }

  onChange = (ev) => {
    if (ev.target.value.length > this.maxLength) {
      return;
    }

    let formattedValue = ev.target.value.replace(/-/g, '');
    let visibleValue = ev.target.value;

    for (let i = this.props.groupLength; i < visibleValue.length; i += this.props.groupLength + 1) {
      visibleValue = this.insertAt(visibleValue, i, '-')
    }

    this.setState({ value: visibleValue});
    this._comp.value = formattedValue;
    this._handleOnChange({ target: this._comp });
  }

  insertAt(string, index, character) {
    if (string.charAt(index) === character) return string;

    let result = string.substr(0, index) + character + string.substr(index, index + this.props.groupLength);
    return result;
  }

  // onPaste = (ev) => {
  //   debugger
  //   ev.preventDefault();
  //   this.onChange(ev.clipboardData.getData('text/plain'));
  // }

  get inputProps() {
    let { ...props } = validProps(this);
    props.onKeyDown = this.onKeyDown;
    props.className = this.inputClasses;
    props.onChange = this.onChange;
    props.onPaste = this.onPaste;
    props.value = this.state.value;
    props.ref = (c) => { this._visible = c };
    return props;
  }

  get hiddenInputProps() {
    return {
      value: this.props.value,
      ref:  (c) => { this._comp = c },
      type: "hidden",
      readOnly: true
    };
  }
  get mainClasses() {
    return 'carbon-sortcode';
  }

  get inputClasses() {
    return 'carbon-sortcode__input';
  }


  render() {
    return (
      <div className={ this.mainClasses } >
        { this.labelHTML }
        { this.inputHTML }
        <input { ...this.hiddenInputProps }/>
        { this.validationHTML }
        { this.fieldHelpHTML }
      </div>
    );
  }
})));

export default Sortcode;
