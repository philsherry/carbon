import React from 'react';
import Table from './table';
import Totals from './totals';

import Pod from 'carbon/lib/components/pod';

export default (props) => {
  return (
    <div>
      <Table />
      <Totals />
    </div>
  );
};
