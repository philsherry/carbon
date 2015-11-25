## :warning: This is a working document and may not reflect current best practice.
## :warning: Carbon is still in alpha and subject to change.

# Testing a Component

## Introduction

Carbon provides modular, reusable components written with the [React](https://facebook.github.io/react/) JavaScript library. Carbon aims to provide a wide range of useful components but specific requirements may require you to create your own custom components.

In this guide, we will walk through testing a simple React Component - A Button.

## Setup

Carbon uses the [Jasmine](http://jasmine.github.io/) testing framework together with [Karma](http://karma-runner.github.io/0.13/index.html) which allows you to run your tests within a real browser environment. Code coverage is tracked using [Istanbul](https://github.com/gotwarlost/istanbul). If you would like to learn more about our testing set up you can view the karma config file and the spec setup file [here](https://github.com/Sage/carbon-factory/tree/master/src/gulp).

## The Component

By following the `creating-a-component` guide you should of created a button component that looks similar to the following:

Final Button

```javascript
import React from 'react';

class Button extends React.Component {

  static defaultProps = {
    as:       'secondary',
    children: 'Click Me',
    disabled: false
  }

  static propTypes = {
    as:        React.PropTypes.string,
    children:  React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    disabled:  React.PropTypes.bool.isRequired
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let {className, ...props} = this.props;

    className = 'ui-button ui-button--' + props.as +
      (props.disabled ? ' ui-button--disabled ' : ' ') + className;

    return (
      <div>
        <button
          className={ className }
          { ...props } >

          { props.children }
        </button>
      </div>
    );
  }
};

export default Button;
```

## Understanding the boilerplate

The `spec.js` file within the button directory is generated with by the `carbon component button` command and describes the behavior of the button through unit tests. The code below shows the generated file:

```javascript
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Button from './index';

describe('Button', () => {
  it('failing test demo', () => {
    expect(1).toEqual(2);
  });
});
```

The generated code has 3 import statements.
* React - Familiar React Stuff
* ReactTestUtils - [ReactTestUtils](https://facebook.github.io/react/docs/test-utils.html)
* Button - The component file we are describing

The second part of the generated code should be familiar to anyone who has used the jasmine testing framework before and should be fairly self explanatory.

## Running the specs
Within your working directory running the command:

```sh
gulp test
```

This command will run all specs within the current project. This command only needs to be run once and it will listen to any file changes within our directory.

The result of `gulp test`:

```sh
PhantomJS 1.9.8 (Mac OS X 0.0.0) Button failing test demo FAILED
	Expected 1 to equal 2.
  at browserify <- /path/carbon/src/components/button/__spec__.js:7:4
```

The output of the gulp tells us that we have a failing spec. We expected that 1 should equal 2 on line 7 column 4 of the button component spec.

Lets fix that spec. Change the expect statement so that we expect 1 to equal 1 and save the spec file. Gulp should pick up on this change, recompile the file and run the full spec suite again. This time you should see a nice `SUCCESS` message.

### Gulp test options

Carbons `gulp test` can be passed a number of different options.

#### Coverage
Running the command `gulp test --coverage` will run the full suite of specs and also generate a cover report using [istanbul](https://github.com/gotwarlost/istanbul). This command will continue to listen to any changes re-running the specs and re-generating the coverage report.

This will appear in your console in the form of
```sh
=============================== Coverage summary ===============================
Statements   : 95.99% ( 2060/2146 ), 342 ignored
Branches     : 94.75% ( 975/1029 ), 319 ignored
Functions    : 94.99% ( 360/379 ), 8 ignored
Lines        : 92.77% ( 1104/1190 )
================================================================================
```

To get a more detailed look at the coverage including inspection of individual files you can open up the generated coverage document using the command

```sh
open coverage/PhantomJS\ 1.9.8\ \(Mac\ OS\ X\ 0.0.0\)/index.html
```

from the root of your project.

* <i>Note: the coverage folder is only generated once the `gulp test --coverage` command has been run<i>

#### Build
Running the command `gulp test --build` will run the suite of tests once and generate a coverage report for the test suite. This command is used by Codeship

#### Browsers
Running the command `gulp test -b chrome` will open up a chrome browser and run the test suite within it. The browser option can be changed to 'firefox', 'safari' or 'phantomjs'. The last of which being the default browser that is run with gulp test.

The advantage of running the tests within an actual browser is that you can insert debugger statements into your code. Open up the browsers dev tools and step through your tests or code.

### Running single tests and files

```javascript
fdescribe("when ...", function () { // to [f]ocus on a single group of tests
  fit("should ...", function () {...}); // to [f]ocus on a single test case
});
... and:

xdescribe("when ...", function () { // to e[x]clude a group of tests
  xit("should ...", function () {...}); // to e[x]clude a test case
});
```

## On with the tests

There are a few different ways of testing react components and for each component we want to make sure we are testing the rendered tree structure based on different props and state as well as the behaviour of our components by simulating events and updates. If you would like to read about different methods for testing react components you can read about them [here](http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/).

The button test will utilise the renderIntoDocument method provided by Reacts TestUtils. This method allow us to test our components against a actual DOM.


Lets start writing our tests. Within the describe button block we want to render a basic button before each test is run. Set up a beforeEach block and use the renderIntoDocument function to render a button.

```javascript
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Button from './index';

describe('Button', () => {
  let basic_button;

  beforeEach((), => {
    basic_button = TestUtils.renderIntoDocument(
      <Button/>
    );
  }

  it('failing test demo', () => {
    expect(1).toEqual(2);
  });
});
```

We can now use the basic_button instance to access the rendered button component. Including its props and refs.
Firstly we want to check that a basic_button comes with some set defaults such as the type or `as` property is set to 'secondary', the `children` property is set to 'Click Me' and that it is not disabled.

Lets create a nested describe and it block to test the defaults of the basic_button.

```javascript
// ...imports
describe('Button', () => {
  let basic_button;

  beforeEach((), => {
    basic_button = TestUtils.renderIntoDocument(
      <Button/>
    );
  }

  describe('A basic button', () => {
    it('renders a button with defaults', () => {
      expect(basic_button.props.as).toEqual('secondary');
      expect(basic_button.props.children).toEqual('Click Me');
      expect(basic_button.props.disabled).toEqual(false);
    });
  });
});
```

We can now run `gulp test` and check that the specs are passing.

As well as checking that the defaultProps get applied correctly to the button we also want to check that passed properties are applied to the button. Lets create three more buttons in our beforeEach.
* Primary
* Secondary
* Disabled

```javascript
// ...imports
// ..describe
let basic_button;
let primary_button;
let secondary_button;
let disabled_button;

beforeEach((), => {
  basic_button = TestUtils.renderIntoDocument(
    <Button/>
  );

  primary_button = TestUtils.renderIntoDocument(
    <Button
      name="Primary Button"
      as="primary"
      onClick={ spy }
      >Primary</Button>
  );

  secondary_button = TestUtils.renderIntoDocument(
    <Button
      name="Secondary Button"
      className="customClass"
      >Secondary</Button>
  );

  disabled_button = TestUtils.renderIntoDocument(
    <Button
      name="Disabled Button"
      disabled={ true }
      >Disabled</Button>
  );
}
```

We can now add three more describe blocks to our tests.

```javascript
describe('A basic button', () => {
  it('renders a button with defaults', () => {
    expect(basic_button.props.as).toEqual('secondary');
    expect(basic_button.props.children).toEqual('Click Me');
    expect(basic_button.props.disabled).toEqual(false);
  });
});

describe('A primary button', () => {
  it('renders a primary button', () => {
    expect(primary_button.props.name).toEqual('Primary Button');
    expect(primary_button.props.as).toEqual('primary');
    expect(primary_button.props.children).toEqual('Primary');
    expect(primary_button.props.disabled).toEqual(false);
  });
});

describe('A secondary button', () => {
  it('renders a secondary button', () => {
    expect(secondary_button.props.name).toEqual('Secondary Button');
    expect(secondary_button.props.as).toEqual('secondary');
    expect(secondary_button.props.children).toEqual('Secondary');
    expect(secondary_button.props.disabled).toEqual(false);
  });
});

describe('A disabled button', () => {
  it('renders a disabled button', () => {
    expect(disabled_button.props.name).toEqual('Disabled Button');
    expect(disabled_button.props.as).toEqual('secondary');
    expect(disabled_button.props.children).toEqual('Disabled');
    expect(disabled_button.props.disabled).toEqual(true);
  });
});
```

As well as the defaults of the button we also want to check the rendered button contains the appropriate class names that will allow the button styling to be applied. Create a new describe block that will cover the class logic within the render method. For these test we will use another test utility provided by react. The utility is provided by ReactDOM instead of test utils and therefore requires a new import statement.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Button from './index';
```
