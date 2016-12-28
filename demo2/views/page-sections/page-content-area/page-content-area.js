import React from 'react';
import classNames from 'classnames';

import SimpleHeading from '../../components/simple-heading';
import Wrapper from '../../chrome/wrapper';

/**
 * Simple, site wrapped content area that loads a heading
 *
 * @param {object} props
 * @param {String} props.title
 * @return {PageContentArea}
 */
export default props => (
  <section className='demo-page-content-area'>
    <Wrapper>
      <SimpleHeading title={ props.title } link={ props.link } />
      <div className='demo-page-content-area__content'>
        { props.children }
      </div>
    </Wrapper>
  </section>
);
