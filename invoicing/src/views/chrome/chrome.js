import React from 'react';
import AppWrapper from 'carbon/lib/components/app-wrapper';
import NavBar from 'carbon/lib/components/navigation-bar';

export default props => {
  return (
    <div>
      <NavBar
        className='navigation-bar'
        as='secondary'
      />
      <AppWrapper>
        { props.children }
      </AppWrapper>
    </div>
  );
}
