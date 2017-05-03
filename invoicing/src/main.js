import React from 'react';
import { Route } from 'react-router';
import { startRouter } from './../../src/utils/router';

import NewInvoice from 'views/new-invoice';
import Chrome from 'views/chrome';

var routes = (
  <Route component={ Chrome }>
    <Route path="/" component={ NewInvoice }/>
  </Route>
);

startRouter(routes);
