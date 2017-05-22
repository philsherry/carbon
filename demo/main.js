import React from 'react';
import 'utils/css';
import { startRouter } from 'utils/router';
import { Route, Switch } from 'react-router-dom';
import { enableMock } from './xhr-mock';

import Document from './views/pages/document';

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

// global.imagePath = 'https://assets.na.sageone.com/carbon/demo/latest/assets/images';
global.imagePath = '/assets/images';

enableMock();

const routes = (
  <Chrome>
    <Route exact path="/" component={ Home } />

    <SubPageChrome>
    </SubPageChrome>
  </Chrome>
);

startRouter(routes);
