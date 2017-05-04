import React from 'react';
import Pod from 'carbon/lib/components/pod';
import Textbox from 'carbon/lib/components/textbox';
import DateComponent from 'carbon/lib/components/date';

export default (props) => {
  return (
    <Pod>
      Invoice Details
      <Textbox { ...inputProps('Name') }/>
      <Textbox { ...inputProps('Customer') }/>
      <Textbox { ...inputProps('Ref') }/>
      <DateComponent { ...inputProps('Invoice Date') }/>
    </Pod>
  )
};

const inputProps = (name) => {
  return {
    label: name,
    labelInline: true,
    labelAlign: 'right'
  }
}
