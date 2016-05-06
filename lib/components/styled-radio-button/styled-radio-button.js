'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsDecoratorsInput = require('./../../utils/decorators/input');

var _utilsDecoratorsInput2 = _interopRequireDefault(_utilsDecoratorsInput);

var StyledRadioButton = (0, _utilsDecoratorsInput2['default'])((function (_React$Component) {
  _inherits(StyledRadioButton, _React$Component);

  function StyledRadioButton() {
    _classCallCheck(this, StyledRadioButton);

    _get(Object.getPrototypeOf(StyledRadioButton.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(StyledRadioButton, [{
    key: 'render',

    /**
     * Renders the component with props.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var _inputProps = this.inputProps;
      var children = _inputProps.children;

      var props = _objectWithoutProperties(_inputProps, ['children']);

      var inputProps = {
        id: this.labelID,
        name: this.props.name,
        value: this.props.value,
        onChange: this.props.onChange
      };

      var input = _react2['default'].createElement(this.inputType, _extends({}, props));

      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        input,
        _react2['default'].createElement(
          'label',
          { htmlFor: this.labelID },
          this.props.children
        )
      );
    }
  }, {
    key: 'mainClasses',

    /**
     * Uses the mainClasses method provided by the decorator to add additional classes.
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (0, _classnames2['default'])('ui-styled-radio-button', this.props.className);
    }

    /**
     * Uses the inputClasses method provided by the decorator to add additional classes.
     *
     * @method inputClasses
     * @return {String} input className
     */
  }, {
    key: 'inputClasses',
    get: function get() {
      return 'ui-styled-radio-button__input';
    }

    /**
     * A getter that combines props passed down from the input decorator with
     * radiobutton specific props.
     *
     * @method inputProps
     * @return {Object} Props to be applied to the input
     */
  }, {
    key: 'inputProps',
    get: function get() {
      var props = _objectWithoutProperties(this.props, []);

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
  }, {
    key: 'labelID',
    get: function get() {
      return this._guid;
    }
  }], [{
    key: 'propTypes',
    value: {

      /**
      * Sets the checked state of the radio button
      *
      * @property defaultChecked
      * @type {Boolean}
      * @default false
      */
      defaultChecked: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      defaultChecked: false
    },
    enumerable: true
  }]);

  return StyledRadioButton;
})(_react2['default'].Component));

exports['default'] = StyledRadioButton;
module.exports = exports['default'];