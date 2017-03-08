import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'carbon/lib/utils/router';

import Invoicing from 'views/invoicing';

var routes = (
  <Route path="/" component={ Invoicing } />
);

startRouter(routes);
