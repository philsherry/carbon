import I18n from 'i18n-js';
import React from 'react';

import Icon from './../../icon';

const FormSummary = props =>
  <div className='carbon-form-summary'>
    { summary(props, 'error') }
    { summary(props, 'warning') }
  </div>
;

const summary = (props, key) => {
  if (props[pluralize(key)] > 0) {
    return (
      <span className={ `carbon-form-summary__summary carbon-form-summary__${key}-summary` }>
        { translation(props, key) }&nbsp;<Icon type={ `${key}` } />&nbsp;
      </span>
    );
  }
};

const defaultTranslations = (errorCount, warningCount) => {
  return {
    errors: {
      defaultValue: {
        one: `There is ${ errorCount } error`,
        other: `There are ${ errorCount } errors`
      },
      count: parseInt(errorCount)
    },
    warnings: {
      defaultValue: {
        one: `There is ${ warningCount } warning`,
        other: `There are ${ warningCount } warnings`
      },
      count: parseInt(warningCount)
    },
    errors_and_warnings: {
      defaultValue: {
        one: ` and ${ warningCount } warning`,
        other: ` and ${ warningCount } warnings`
      },
      count: parseInt(warningCount)
    }
  };
};

const pluralize = (key) => {
  return `${key}s`;
};

const translateKey = (props, key) => {
  return warningAppend(props, key) ? 'errors_and_warnings' : pluralize(key);
};

const translation = (props, key) => {
  let location = `errors.messages.form_summary.${key}`,
      defaultTranslation = defaultTranslations(props.errors,props.warnings)[key];

  key = translateKey(props, key);

  return I18n.t(location, defaultTranslation);
};

const warningAppend = (props, key) => {
  return props.errors > 0 && props.warnings > 0 && key === 'warning';
};

export default FormSummary;
