'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _optionsHelper = require('utils/helpers/options-helper');

var _optionsHelper2 = _interopRequireDefault(_optionsHelper);

var _definition = require('./../../../demo/utils/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var columnDefinition = new _definition2.default('child', {}, {
  description: 'Sets up a basic column-based UI layout.',
  designerNotes: '\n* Useful to organise the UI of a page into a simple column-based layout.\n* Configure the number of columns, the margin between them, and any separators.\n  ',
  relatedComponentsNotes: '\n* Need an overall container? [Try App Wrapper](/components/app-wrapper).\n* Need a container for your primary navigation? [Try Navigation Bar](/components/navigation-bar).\n* Need a layout with controls and guidance text? [Try Settings Row](/components/settings-row).\n ',
  props: ['columnOffset', 'columnSpan', 'columnAlign', 'columnClasses'],
  propTypes: {
    columnOffset: "String",
    columnSpan: "String",
    columnAlign: "String",
    columnClasses: "String",
    children: "Node"
  },
  propDescriptions: {
    columnOffset: "Offset this column by a certain number of columns.",
    columnSpan: "Span this column by a certain number of columns.",
    columnAlign: "Align the content of this column.",
    columnClasses: "Apply custom classes to this column.",
    children: "This component supports children."
  }
});

var definition = new _definition2.default('row', _2.default, {
  associatedDefinitions: [columnDefinition],
  hiddenProps: ['children'],
  propValues: {
    children: '<div/>\n  <div/>\n  <div/>\n  <div/>\n  <div/>\n  <div/>'
  },
  propTypes: {
    gutter: "String",
    columnDivide: "Boolean",
    columns: "String"
  },
  propDescriptions: {
    gutter: "Define how wide the gutter between the rows and columns should be.",
    columnDivide: "Enable a divider between each column.",
    columns: "Define a certain amount of columns, instead of basing it on the number of children."
  },
  propOptions: {
    gutter: _optionsHelper2.default.sizesFull
  }
});

exports.default = definition;