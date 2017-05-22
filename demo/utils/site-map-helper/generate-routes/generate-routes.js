import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Document from './../../../views/pages/document';

export default obj => {
  return generateRoutesFor(obj);
}

const generateRoutesFor = (obj, base = '') => {
  let arr = [];

  for (let key in obj) {
    let value = obj[key];

    if (value.component) {
      arr.push(
        <Route exact key={ key } path={ base + key } component={ value.component } />
      );
    } else if (value.items) {
      arr = arr.concat(generateRoutesFor(value.items, key));
    } else {
      arr.push(
        <Route exact key={ key } path={ base + key } component={ Document } document={ value } />
      );
    }
  }
  debugger

  return arr;
}
