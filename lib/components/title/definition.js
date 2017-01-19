'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = {
  component: _2.default,
  key: 'title',
  text: {
    bemClass: 'carbon-title',
    details: '[content needed] Basic designs description for the component',
    description: '[content needed] Basic example of the component',
    name: 'Title',
    type: 'layout'
  },
  defaultProps: _2.default.defaultProps,
  props: _2.default.propTypes
};

definition.demoProps = {
  start: 'This is the first part',
  end: 'and this is the second part'
};

exports.default = definition;