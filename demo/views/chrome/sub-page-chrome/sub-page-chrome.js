import React from 'react';

import { connect } from 'utils/flux';
import { titleize, humanize } from 'underscore.string';
import ComponentStore from './../../../stores/component';
import I18n from 'i18n-js';

// Demo Site
import PageHeaderSmall from './../../common/page-header-small';
import SubPageNavigation from './../../common/sub-page-navigation';

import Wrapper from './../../common/wrapper';
import BrowserHelper from 'utils/helpers/browser';

/**
 * wraps the sub-pages in some further chrome items
 *
 * @param {object} props.children immediately rendered
 * @param {object} props.previousPage page object with a name and URL for the scroller
 * @param {object} props.nextPage see `previousPage` above
 * @return {SubPageChrome}
 */
class SubPageComponent extends React.Component {
  render() {
    let definition = this._getDefinition();

    return (
      <article className='sub-page-chrome'>
        <PageHeaderSmall
          subtitle={ this.subtitle(definition) }
          title={ this.name() }
          titleAppend={ this.titleAppend(definition) }
        />

        <Wrapper>
          { this.props.children }

          <SubPageNavigation
            availableRoutes={ this.props.routes }
            currentLocation={ this._location() }
            definition={ definition }
          />
        </Wrapper>
      </article>
    );
  }

  name = () => {
    let name = this._hasNameParam() ? this.props.params.name : this._getLastPartOfLocation();
    return titleize(humanize(name));
  }

  subtitle = (definition) => {
    if (definition) {
      return definition.get('description');
    } else {
      let scope = this._location().pathname.replace(/\//g, ".").substr(1);
      return I18n.t(`${scope}.subtitle`, { defaultValue: '' });
    }
  }

  titleAppend = (definition) => {
    if (definition) {
      return definition.get('type');
    }
  }

  _getDefinition = () => {
    if (this._hasNameParam()) {
      return this.state.componentStore.get(this.props.params.name);
    }
  }

  _getLastPartOfLocation = () => {
    let parts = this._location().pathname.split("/");
    return parts[parts.length - 1];
  }

  _hasNameParam = () => {
    return this.props.params && this.props.params.name;
  }

  _location = () => {
    return BrowserHelper.getDocument().location;
  }
}

export default connect(SubPageComponent, ComponentStore);
