import React from 'react';
import { Router, Route } from 'react-router';

import Chrome from './views/chrome';
import Homepage from './views/homepage';
import Actions from './views/actions';
import Forms from './views/forms';
import Grids from './views/grids';
import Charts from './views/charts';
import Notifications from './views/notifications';
import Modals from './views/modals';
import Layout from './views/layout';
import Misc from './views/misc';

export default class Routes extends React.Component {

  componentWillMount() {
    this.forceUpdate(); // a little hack to help us re-render when this module is hot reloaded
  }

  render() {
    return (
      <Router>
        <Route component={ Chrome }>
          <Route path="/" component={ Homepage } />
          <Route path="/actions" component={ Actions } />
          <Route path="/forms" component={ Forms } />
          <Route path="/grids" component={ Grids } />
          <Route path="/charts" component={ Charts } />
          <Route path="/notifications" component={ Notifications } />
          <Route path="/modals" component={ Modals } />
          <Route path="/layout" component={ Layout } />
          <Route path="/misc" component={ Misc } />
        </Route>
      </Router>
    );
  }
};
