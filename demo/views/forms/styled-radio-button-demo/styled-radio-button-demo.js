import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';
import Immutable from 'immutable'

import StyledRadioButton from 'components/styled-radio-button';
import Checkbox from 'components/checkbox';
import Textbox from 'components/textbox';
import Row from 'components/row';
import Icon from 'components/icon';
import Button from 'components/button';
import Pod from 'components/pod';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';

class RadiButtonDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['styled_radio_button', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'styled_radio_button');
  }

  onChanging = (ev) => {
    console.log(ev.target.value);
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div>
        <StyledRadioButton onChange={ this.onChanging } className='styled-button' name='test' value='test1' >
          <div className='thing'>
            <Icon className='radio-icon' type='search' />
          </div>
        </StyledRadioButton>
        <span className='radio-or'>
        - OR -
        </span>
        <StyledRadioButton
          onChange={ this.onChanging }
          className='styled-button'
          name='test'
          value='test2'
        >
          <div className='thing'>
            FOO
          </div>
        </StyledRadioButton>
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import RadioButton from 'carbon/lib/components/radio-button';\n\n";
    return html;
  }

  /**
   * @method controls
   */
  get controls() {
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Styled Radio Button"
        readme="components/styled-radio-button"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(RadiButtonDemo, AppStore);
