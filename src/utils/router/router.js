import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

/**
 * Exposes the history object to allow developers to redirect and control the
 * route state (see https://github.com/ReactJSTraining/history/tree/master/docs)
 *
 * @property history
 * @type {Object}
 */
// export const history = browserHistory;


class MyRouter extends React.Component {

  componentDidUpdate() {
    this.onRouteUpdate();
  }

  onRouteUpdate() {
    global.window.scrollTo(0, 0);

    if (global.ga) {
      global.ga('set', 'page', global.location.pathname);
      global.ga('send', 'pageview');
    }
  };

  render() {
    return (
      <BrowserRouter>
        { this.props.children }
      </BrowserRouter>
    );
  }
}

/**
 * Handles boilerplate for starting the React Router with the given routes.
 *
 * You can import this function with the following:
 *
 *   import { startRouter }R[MaR[MaR from 'carbon/lib/utils/router';
 *
 * You can then use the function like this:
 *
 *   var routes = <Route />;
 *   startRouter(routes);
 *
 * You can also provide an optional second parameter if you want to manually tell
 * the router where it should render it's components (by default this uses an
 * element with an ID of 'app'):
 *
 *   var routes = <Route />;
 *   startRouter(routes, document.getElementById('foo'));
 *
 * @method startRouter
 * @param {Object} routes The routes to send to React Router.
 * @param {HTMLElement} target (optional) Where in the DOM should React render.
* @return {void}
 */
export function startRouter(routes, target = document.getElementById('app')) {
  // render the router into the DOM
  if (target) {
    ReactDOM.render((
      <MyRouter>
        { routes }
      </MyRouter>
    ), target);
  }
}
