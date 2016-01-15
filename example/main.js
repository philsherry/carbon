import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';
import App from './views/app';

var routes = (
  <Route path="/" component={ App } />
);

startRouter(routes);
