import React from 'react';
import TextboxDemo from './textbox-demo';
import DecimalDemo from './decimal-demo';
import DropdownDemo from './dropdown-demo';
import DateDemo from './date-demo';
import CheckboxDemo from './checkbox-demo';
import RadioButtonDemo from './radio-button-demo';
import StyledRadioButtonDemo from './styled-radio-button-demo';

class Forms extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Forms</h1>
        <CheckboxDemo />
        <RadioButtonDemo/>
        <StyledRadioButtonDemo/>
        <TextboxDemo />
        <DecimalDemo />
        <DateDemo />
        <DropdownDemo />
      </div>
    );
  }
}

export default Forms;
