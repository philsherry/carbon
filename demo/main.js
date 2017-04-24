import React from 'react';
import './../src/utils/css';
import { Route } from 'react-router';
import { startRouter } from './../src/utils/router';
import ReactDOM from 'react-dom';
import { enableMock } from './xhr-mock';
import Button from 'components/button';

// Languages
import './i18n/en';
// Additional components we expose to the window
import './expose';

// Demo
import Chrome from './views/chrome';
import SubPageChrome from './views/chrome/sub-page-chrome';
import Home from './views/pages/home';

import SiteMap from './site-map';

import Highcharts from 'highcharts';
global.Highcharts = Highcharts;

global.imagePath = 'https://assets.na.sageone.com/carbon/demo/latest/assets/images';
global.imagePath = '/assets/images';

enableMock();

const routes = (
  <Route component={ Chrome }>
    <Route path="/" component={ Home } />

    <Route component={ SubPageChrome }>
      { SiteMap.generateRoutes() }
    </Route>
  </Route>
);

startRouter(routes);
