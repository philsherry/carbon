import React from 'react';
import Row from 'carbon/lib/components/row';

import AddressDetails from './address-details';
import InvoiceDetails from './invoice-details';

export default (props) => {
  return (
    <Row>
      <InvoiceDetails />
      <AddressDetails />
    </Row>
  )
};

