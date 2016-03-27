import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes.js';

if (module.hot) {
  module.hot.decline("./routes.js");
}

ReactDOM.render(
  <Routes/>,
  document.getElementById('app')
);
