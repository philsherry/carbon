import React from 'react';
import Heading from './heading';
import Details from './details';

import Pod from 'carbon/lib/components/pod';

class NewInvoice extends React.Component {
  render() {
    return (
      <div>
        <Heading />
        <Details />

        <div>
          <Pod>Table</Pod>
        </div>

        <div>
          <Pod>T&C</Pod>
        </div>
      </div>
    );
  }
}

export default NewInvoice
