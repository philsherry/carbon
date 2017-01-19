'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Title widget.
 *
 * == How to use a Title in a component:
 *
 * In your file
 *
 *   import Title from 'carbon/lib/components/title';
 *
 * To render the Title:
 *
 *   <Title
 *     start='First bit of the title'
 *     end='and the last bit of the title'
 *     highlight='start'
 *   />
 *
 * @class Title
 * @constructor
 */
var Title = function (_React$Component) {
  _inherits(Title, _React$Component);

  function Title() {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
  }

  _createClass(Title, [{
    key: 'classes',
    value: function classes() {
      return (0, _classnames2.default)('carbon-title--' + this.props.highlight + '-highlighted', 'carbon-title');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { className: this.classes() },
        _react2.default.createElement(
          'span',
          { className: 'carbon-title__start' },
          this.props.start
        ),
        _react2.default.createElement(
          'span',
          { className: 'carbon-title__end' },
          this.props.end
        )
      );
    }
  }]);

  return Title;
}(_react2.default.Component);

Title.propTypes = {
  /**
   * first part of the title
   *
   * @property start
   * @type {string}
   */
  start: _react2.default.PropTypes.string,

  /**
   * second part of the title
   *
   * @property end
   * @type {string}
   */
  end: _react2.default.PropTypes.string,

  /**
   * second part of the title
   *
   * @property end
   * @type {string}
   */
  highlight: _react2.default.PropTypes.string
};
Title.defaultProps = {
  highlight: 'start'
};
exports.default = Title;