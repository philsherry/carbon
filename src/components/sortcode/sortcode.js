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
    formattedValue: null
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
   * A getter that combines props passed down from the input decorator with
   * sortcode specific props.
   *
   * @method inputProps
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.value = this.formattedValue;
    props.maxLength = '2';

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
      value: this.props.value

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

        <div className='field1'>
          { this.inputHTML }
          { this.validationHTML }
        </div>

        <span> - </span>

        <div className='field2'>
          { this.inputHTML }
          { this.validationHTML }
        </div>

        <span> - </span>

        <div className='field3  '>
          { this.inputHTML }
          { this.validationHTML }
        </div>

      </div>
    );
  }
}
)));

export default Sortcode;
