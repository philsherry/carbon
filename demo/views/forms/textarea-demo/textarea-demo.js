import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import Textarea from 'components/textarea';
import NumberComponent from 'components/number';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';

import { transform } from 'babel-standalone';

class Demo {
  constructor(name) {
    this.name = name;
    this.code = `<${name}`;
    this.hasProps = false;
    this.hasChildren = false;
  }

  addProps = (props, data) => {
    for (let index in props) {
      let prop = props[index];
      return this.addProp(prop, data.get(prop));
    }
  }

  addProp = (prop, value) => {
    if (value) {
      this.hasProps = true;
      if (typeof value === "boolean") {
        this.code += `\n  ${prop}={ ${value} }`;
      } else {
        this.code += `\n  ${prop}='${value}'`;
      }
    }
  }

  close = () => {
    if (this.hasChildren) {
      this.code += `\n</${this.name}>`;
    } else if (this.hasProps) {
      this.code += "\n/>";
    } else {
      this.code += " />";
    }
  }

  toString = () => {
    return this.code;
  }
}

class TextareaDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['textarea', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'textarea');
  }

  cachedCode = null

  getCode = () => {
    try {
      let code = this.value('value') || this.code;
      return this.cachedCode = <div className="foobar">{ eval(transform(code, { presets: ['es2015', 'react'] }).code) }</div>;
    } catch(err) {
      return this.cachedCode;
    }
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <div>
        { this.getCode() }
        <Textarea
          className="bar"
          onChange={ this.action.bind(this, 'value') }
          rows="15"
          value={ this.value('value') || this.code }
        />
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let demo = new Demo('Textarea');
    demo.addProps(['label', 'disabled'], this.state.appStore.get('textarea'));
    demo.close();
    return demo.toString();
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
        <Row>
          <Textbox
            label="Label"
            labelInline={ true }
            value={ this.value('label') }
            onChange={ this.action.bind(this, 'label') }
          />
          <Textbox
            label="Prefix"
            labelInline={ true }
            value={ this.value('prefix') }
            onChange={ this.action.bind(this, 'prefix') }
          />
        </Row>
        <Row>
          <Checkbox
            label="Disabled"
            value={ this.value('disabled') }
            onChange={ this.action.bind(this, 'disabled') }
          />
          <Checkbox
            label="Read Only"
            value={ this.value('readOnly') }
            onChange={ this.action.bind(this, 'readOnly') }
          />
          <Checkbox
            label="Expandable"
            value={ this.value('expandable') }
            onChange={ this.action.bind(this, 'expandable') }
          />
        </Row>
        <Row>
          <NumberComponent
            label="Character Limit"
            labelInline={ true }
            value={ this.value('characterLimit') }
            onChange={ this.action.bind(this, 'characterLimit') }
          />
          <Checkbox
            label="Enforce Character Limit"
            value={ this.value('enforceCharacterLimit') }
            onChange={ this.action.bind(this, 'enforceCharacterLimit') }
          />
        </Row>
      </div>
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Textarea"
        readme="components/textarea"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

global.React = React;
global.Textarea = Textarea;
global.Row = Row;
global.Textbox = Textbox;
global.Checkbox = Checkbox;

export default connect(TextareaDemo, AppStore);
