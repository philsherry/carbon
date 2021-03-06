import React from 'react';
import classNames from 'classnames';
import Icon from './../icon';
import Modal from './../modal';

/**
 * A DialogFullScreen widget.
 *
 * == How to use a DialogFullScreen in a component:
 *
 * In your file
 *
 *   import DialogFullScreen from 'carbon/lib/components/dialog-full-screen';
 *
 * To render a DialogFullScreen:
 *
 *   <DialogFullScreen onCancel={ customEventHandler } />
 *
 * The component rendering the DialogFullScreen must pass down a prop of 'open' in order to open the dialog.
 *
 * You need to provide a custom cancel event handler to handle a close event.
 *
 * @class DialogFullScreen
 * @constructor
 */
class DialogFullScreen extends Modal {

  static defaultProps = {
    open: false,
    enableBackgroundUI: true
  }

  /**
   * Returns classes for the dialog.
   *
   * @return {String} dialog className
   */
  get dialogClasses() {
    return 'carbon-dialog-full-screen__dialog';
  }

  /**
   * Returns main classes for the component combined with
   * Dialog main classes.
   *
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      this.props.className,
      'carbon-dialog-full-screen'
    );
  }

  componentTags(props) {
    return {
      'data-component': 'dialog-full-screen',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }

  /**
   * Returns the computed HTML for the dialog.
   * @override
   *
   * @return {Object} JSX for dialog
   */
  get modalHTML() {
    return (
      <div
        ref={ (d) => { this._dialog = d; } }
        className={ this.dialogClasses }
        { ...this.componentTags(this.props) }
      >
        <div className='carbon-dialog-full-screen__header'>
          { this.renderTitle() }
          <Icon
            className='carbon-dialog-full-screen__close'
            data-element='close'
            onClick={ this.props.onCancel }
            type='close'
          />
        </div>

        <div className='carbon-dialog-full-screen__content' data-element='content'>
          { this.props.children }
        </div>
      </div>
    );
  }

  /**
   * Returns title prop wrapped in <h2> if title is a string otherwise returns the title prop directly.
   * Dialog main classes.
   *
   * @return {Object} JSX
   */
  renderTitle = () => {
    if (typeof (this.props.title) === 'string' || this.props.title instanceof String) {
      return <h2 className='carbon-dialog-full-screen__title' data-element='title'>{ this.props.title }</h2>;
    }
    return this.props.title;
  }
}

export default DialogFullScreen;
