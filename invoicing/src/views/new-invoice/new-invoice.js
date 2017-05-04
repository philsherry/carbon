import React from 'react';
import Heading from './heading';
import Details from './details';
import LineItems from './line-items';
import Terms from './terms';

import Pod from 'carbon/lib/components/pod';

class NewInvoice extends React.Component {
  render() {
    return (
      <div>
        <Heading />
        <Details />

        <Pod>
          <LineItems />
        </Pod>

        <Pod>
          <Terms />
        </Pod>
      </div>
    );
  }
}

export default NewInvoice
