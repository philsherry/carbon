import React from 'react';
import AppWrapper from 'carbon/lib/components/app-wrapper';
import NavBar from 'carbon/lib/components/navigation-bar';

export default props => {
  return (
    <div>
      <NavBar
        as='secondary'
      />
      <AppWrapper>
        { props.children }
      </AppWrapper>
    </div>
  );
}
