import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Menu } from './menu';
import { shallow } from 'enzyme';

describe('Menu', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Menu className="foobar">
        foo
      </Menu>
    );
  });

  it('renders with correct classes', () => {
    let div = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    expect(div.className).toEqual('carbon-menu foobar carbon-menu--primary');
  });

  it('renders with secondary class', () => {
    instance = TestUtils.renderIntoDocument(
      <Menu className="foobar" as="secondary">
        foo
      </Menu>
    );
    let div = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    expect(div.className).toEqual('carbon-menu foobar carbon-menu--secondary');
  });

  describe("tags on component", () => {
    let wrapper = shallow(<Menu element='bar' role='baz'>Test</Menu>);

    it('include correct component, element and role data tags', () => {
      window.RootTagTest.run(wrapper, 'menu', 'bar', 'baz');
    });
  });
});
