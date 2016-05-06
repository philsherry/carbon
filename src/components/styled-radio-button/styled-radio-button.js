import React from 'react';
import classNames from 'classnames';
import Input from './../../utils/decorators/input';

const StyledRadioButton = Input(
class StyledRadioButton extends React.Component {

    static propTypes = {

      /**
      * Sets the checked state of the radio button
      *
      * @property defaultChecked
      * @type {Boolean}
      * @default false
      */
      defaultChecked: React.PropTypes.bool
    }

  static defaultProps = {
    defaultChecked: false
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames (
      'ui-styled-radio-button',
      this.props.className
    );
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} input className
   */
  get inputClasses() {
    return 'ui-styled-radio-button__input';
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * radiobutton specific props.
   *
   * @method inputProps
   * @return {Object} Props to be applied to the input
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.type = "radio";
    props.id = this.labelID;
    return props;
  }

  /**
   * ID used for the label.
   *
   * @method labelID
   * @return {String}
   */
  get labelID() {
    return this._guid;
  }

  /**
   * Renders the component with props.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let { children, ...props } = this.inputProps;
    let inputProps = {
      id: this.labelID,
      name: this.props.name,
      value: this.props.value,
      onChange: this.props.onChange
    }

    let input = React.createElement(this.inputType, { ...props });

    return(
      <div className={ this.mainClasses }>
        { input }
        <label htmlFor={ this.labelID }>
          { this.props.children }
        </label>
      </div>
    );
  }
}
);

export default StyledRadioButton;
