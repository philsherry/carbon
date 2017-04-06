'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Builds props object containing top level data tags
 *
 * @param {String} name of component
 * @param {Object} component props
 * @return {Object} dataTagProps
 */
function tagComponent(component, props) {
  var tagProps = _defineProperty({}, 'data-component', component);

  if (props.element) {
    tagProps['data-element'] = props.element;
  }
  if (props.role) {
    tagProps['data-role'] = props.role;
  }

  return tagProps;
}

exports.tagComponent = tagComponent;