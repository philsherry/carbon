import React from 'react';
import Row from 'components/row';
import Number from 'components/number';
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
class Sortcode extends React.Component {

  /**
    * Stores the document - allows us to override it different contexts, such as
    * when running tests.
    *
    * @property _document
    * @type {document}
    */
   _document = document;


   state = {
     sortCode1: { value: null },
     sortCode2: { value: null },
     sortCode3: { value: null }
   }

  /**
  * Determine if sort code inputs need to be validated.
  *
  * @method checkSortCode
  * @return {Void}
  */
  checkSortCode = () => {
   setTimeout(() => {
     let focusedElement = this._document.activeElement,
         focusedElementName = focusedElement.name,
         focusOnSortCodeInputs = (focusedElementName) && (focusedElementName.indexOf(this.props.name) !== -1);

     if (!focusOnSortCodeInputs) {
       debugger
     }
   }, 0);
  };

  /**
   * Validates sort code inputs.
   *
   * @method validateSortCode
   */
  validateSortCode = () => {
    // if the hidden input is a valid sort code
    let valid = this.sortCodeHidden.validate();
    let errorMessage = valid ? null : this.sortCodeHidden.state.errorMessage;
    // if valid, reset error states for sort code inputs; otherwise, set error states/message for sort code inputs.
    this.sortCode1.setState({ errorMessage: null, valid: valid });
    this.sortCode2.setState({ errorMessage: null, valid: valid });
    this.sortCode3.setState({ errorMessage: errorMessage, valid: valid });
  };

  /**
   * On key down of any sort code input, reset the validation for sort code.
   *
   * @method handleSortCodeKeyDown
   * @param {Object} ev event
   */
  handleSortCodeKeyDown = (ev) => {
    // prevent entering dash key code
    if(ev.which === 189) {
      ev.preventDefault();
    } else {
      this.setState({ errorMessage: null, valid: true });
    }
  };

  /**
   * Main Class getter
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    let classes = "ui-sortcode";

    if (this.props.className) {
      classes += ` ${this.props.className}`;
    }

    return classes;
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

  formatVisibleValue = (ev) => {
    debugger
  }

  // /**
  //  * Handles Change to visible field
  //  *
  //  * @method handleVisibleInputChange
  //  * @param {Object} ev event
  //  */
  // handleVisibleInputChange = (ev) => {
  //
  //   this.setState({ visibleValue: ev.target.value });
  //   // this.emitOnChangeCallback(this.formatHiddenValue(ev));
  // }

  /**
   * A getter that combines props passed down from the input decorator with
   * sortcode specific props.
   *
   * @method inputProps
   */
  get inputProps() {
    let { ...props } = this.props;

    props.columnSpan = '1';
    props.label = false;
    props.maxLength = '2';
    // props.onChange = this.handleVisibleInputChange;
    props.className = this.inputClasses;
    props.onBlur = this.checkSortCode;
    props.onKeyDown = this.handleSortCodeKeyDown;

    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   */
  get hiddenInputProps() {
    let props = {
      className: 'ui-sort-code__input--hidden',
      type: "hidden",
      readOnly: true,
      maxLength: '6'
      // value: this.formattedHiddenValue
    };

    return props;
  }


  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let sortCodeName  = 'sortCode',
        sortCodeName1 = sortCodeName + '1',
        sortCodeName2 = sortCodeName + '2',
        sortCodeName3 = sortCodeName + '3';

    return (
       <div className={ this.mainClasses }>
         <Number
             name={ sortCodeName }
             ref={ (elem) => this.sortCodeHidden = elem }
             { ...this.hiddenInputPropsprops } />

         <Row columns='10' className='row--sortcode'>
           <div columnSpan='3'>
           </div>

           <Row columnSpan='7' columns='5' className='row--sortcode__fields'>
             <Number
                { ...this.inputProps }
                 name={ sortCodeName1 }
                 value={ this.state.sortCode1.value }
                 ref={ (elem) => this.sortCode1 = elem }/>

             <div columnSpan='1' className='sortcode__separator'>-</div>

             <Number
                { ...this.inputProps }
                 name={ sortCodeName2 }
                 value={ this.state.sortCode2.value }
                 ref={ (elem) => this.sortCode2 = elem }/>

             <div columnSpan='1' className='sortcode__separator'>-</div>

             <Number
                { ...this.inputProps }
                 name={ sortCodeName3 }
                 value={ this.state.sortCode3.value }
                 ref={ (elem) => this.sortCode3 = elem }/>
           </Row>
         </Row>
       </div>
     );
  }
};

export default Sortcode;
