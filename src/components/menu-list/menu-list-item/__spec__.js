import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import MenuListItem from './menu-list-item';

describe('MenuListItem', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <MenuListItem>
        <div>Im a Child</div>
      </MenuListItem>
    );
  });

  it('renders a list item', () => {
    let item = TestUtils.findRenderedDOMComponentWithTag(instance, 'li');
    expect(item).toBeDefined();
  });

  it('renders children', () => {
    expect(instance.props.children.props.children).toEqual("Im a Child");
  });

  it('adds custom classes to the li if provided', () => {
    let customInstance = TestUtils.renderIntoDocument(
      <MenuListItem className='custom-class'>
        Im a Child
      </MenuListItem>
    );

    let list = TestUtils.findRenderedDOMComponentWithTag(customInstance, 'li');
    expect(list.classList).toMatch('custom-class');
  });
});