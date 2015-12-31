import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

/**
 * A Sortcode widget.
 *
 * == How to use a Sortcode in a component:
 *
 * In your file
 *
 *   import Sortcode from 'carbon/lib/components/sortcode';
 *
 * To render a Textbox:
 *
 *   <SortCode name="mySortCode" />
 *
 * @class Sortcode
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
const Sortcode = Input(InputLabel(InputValidation(
class Sortcode extends React.Component {

  state = {
    formattedValue: null,
    value1: null,
    value2: null,
    value3: null
  }

  /**
   * Main Class getter
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return 'ui-sortcode';
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   */
  get inputClasses() {
    return 'ui-sortcode__input';
  }

  /**
   * Callback to update the hidden field on change.
   *
   * @method emitOnChangeCallback
   * @param {String} val The unformatted decimal value
   */
  emitOnChangeCallback = (val) => {
    let hiddenField = this.refs.hidden;
    hiddenField.value = val;

    this._handleOnChange({ target: hiddenField });
  }

  formatHiddenValue = (ev) => {
    debugger
  }

  /**
   * Handles Change to visible field
   *
   * @method handleVisibleInputChange
   * @param {Object} ev event
   */
  handleVisibleInputChange = (ev) => {
    this.setState({ visibleValue: ev.target.value });
    this.emitOnChangeCallback(this.formatHiddenValue(ev));
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * sortcode specific props.
   *
   * @method inputProps
   */
  get inputProps() {
    let { ...props } = this.props;
    props.onChange = this.handleVisibleInputChange;
    props.className = this.inputClasses;
    props.id = this.props.fieldId;
    debugger
    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   */
  get hiddenInputProps() {
    var props = {
      ref: "hidden",
      type: "hidden",
      readOnly: true,
      value: this.formattedHiddenValue

    };
    return props;
  }


  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses }>

        { this.labelHTML }
        <input { ...this.hiddenInputProps } />

        <div value={ this.state.value1 } fieldId='1'>
          { this.inputHTML }
          { this.validationHTML }
        </div>

        <span> - </span>

        <div value={ this.state.value2 } fieldId='2'>
          { this.inputHTML }
          { this.validationHTML }
        </div>

        <span> - </span>

        <div value={ this.state.value3 } fieldId='3'>
          { this.inputHTML }
          { this.validationHTML }
        </div>

      </div>
    );
  }
}
)));

export default Sortcode;
