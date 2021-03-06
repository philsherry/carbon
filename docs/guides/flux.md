# Flux

While React is used for building components and views, [Flux](https://facebook.github.io/flux/) handles controlling, transforming and delivering the data between the components.

It is important to understand that Flux is not a part of React, it is an architecture for how we can handle our data and could work with any number of frameworks. This guide will not go into detail of how Flux works, as there should be plenty of information for that available online. Instead, we will explain the Flux utilities provided with Carbon.

## The Components

Components provided by Carbon are not tied to Flux, they are just regular React components.

## The Dispatcher

Although Flux is not a framework, Facebook do provide a dispatcher we can use. We can import this from the Flux node module.

```js
// ./src/dispatcher/index.js

import { Dispatcher } from 'flux';

// initialize the dispatcher here, so there is only ever one instance of it
let AppDispatcher = new Dispatcher();

export default AppDispatcher;
```

We only need to define this in our application once. It is a singleton, meaning that there is only one instance of it used across our entire application.

## Creating a Store

Carbon provides a base class for creating a store. This should be used to extend our own store in our application:

```js
// ./src/stores/user/index.js

import Store from 'carbon/lib/utils/flux/store';
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';
import Dispatcher from 'dispatcher';

// our store!
class User extends Store {}

// define our initial data using immutable.js
let data = ImmutableHelper.parseJSON({});

// initialize our store here, so there is only ever one instance of it
export defaults new MyStore('userStore', data, Dispatcher);
```

The store should also be a singleton, so we should make sure we initialize it within the same file that we define it.

The store has a few requirements for it to function correctly:

* We should initialize our store with a name, this is the key we use will to access our store in our React component.
* We should initialize our store with data, this is the initial payload of data that our store will use. This could either be from an AJAX request, from a variable on the DOM or even hardcoded JSON.
* We should initialize our store with our applications Dispatcher.

### Subscribing to Events

So our store is setup, we now need it to subscribe to events that are published by our applications Dispatcher.

Let's create a quick Flux constant and action that will dispatch an event:

```js
// ./src/constants/user/index.js

export default {
  USER_VALUE_UPDATED: 'userValueUpdated'
}
```

The constant defines a unique name within our application that will be used to emit a particular event. We can then use the constant in our action to dispatch the event:

```js
// ./src/actions/user/index.js

import Dispatcher from 'dispatcher';
import UserConstants from 'constants/user';

let UserActions = {
  userValueUpdated: (ev, props) => {
    Dispatcher.dispatch({
      actionType: UserConstants.USER_VALUE_UPDATED,
      value: ev.target.value,
      name: props.name
    })
  }
};
```

The action we have defined expects to receive two params: `ev` and `props`. All inputs in Carbon emit at least these two params on their `onChange` events.

From `props`, we can get the input name to know which input has changed, so when we dispatch this action we can tell the store the input's name and the input's new value.

So now we can update the store to subscribe to this event by using the same constant:

```js
// ./src/stores/user/index.js

import Store from 'carbon/lib/utils/flux/store';
import ImmutableHelper from 'carbon/lib/utils/helpers/immutable';
import Dispatcher from 'dispatcher';
import UserConstants from 'constants/user';

class User extends Store {
  // define a function on the store class using the constant
  [UserConstants.USER_VALUE_UPDATED](action) {
    this.data = this.data.set(action.name, action.value);
  }
}

let data = ImmutableHelper.parseJSON({});

export defaults new MyStore('userStore', data, Dispatcher);
```

Our new function updates the stores data using the input name and value sent by the action.

So we now have an action called `userValueUpdated`, which when called dispatches an event called `USER_VALUE_UPDATED`. Our store is subscribed to this event and will update its data whenever it is dispatched.

### Connecting a React Component to our Flux Store

The store is now updating its data - but we have no React components connected to the store! Lets set one up:

```js
// ./src/views/user/index.js

import React from 'react';
import { connect } from 'utils/flux';
import Textbox from 'carbon/lib/components/textbox';
import UserStore from 'stores/user';
import UserActions from 'actions/user';

class UserView extends React.Component {
  render() {
    return (
      <Textbox name="foobar"
        value={ this.state.userStore.get('foobar') }
        onChange={ UserActions.userValueUpdated } />
    );
  }
}

// connect the view component to our store
export default connect(UserView, UserStore);
```

At the core of it, this is just a React component. Our component renders a Carbon Textbox and gives it a name.

However, on the last line it calls a connect function (provided by Carbon) to connect our component with our store. This function sets up event listeners for when the store is updated - when it detects a change in the store it will call `setState` on itself with the new data. It also makes the stores data available through the components state using the name we defined for the store (in this case, it is available as `this.state.userStore`).

Through this connection, we can set the Textbox's value to use the value from the store. We can also set the `onChange` event to trigger the action we defined earlier - completing the Flux loop!

## Differences from Flux

Carbon attempts to do as much of the Flux setup for you as possible - however there is not a lot to it. We recommend you familiarise yourself with these two files in Carbon:

* [The `connect` function](https://github.com/Sage/carbon/blob/master/src/utils/flux/flux.js)
* [The base Store class](https://github.com/Sage/carbon/blob/master/src/utils/flux/store/store.js)

This implementation does not stray far from the recommended setup from [Flux examples](https://facebook.github.io/flux/docs/todo-list.html). The only notable difference is how an action is triggered on the store.

Many of the example demonstrate a `switch`/`case` block. With Carbon, we check each registered store to see if there is a corresponding function that matches the dispatched action type. If it finds one, it calls it (see the `dispatcherCallback` function in the [base store class](https://github.com/Sage/carbon/blob/master/src/utils/flux/store/store.js)).
