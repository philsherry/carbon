'use strict';

global.ElementsTagTest = {
  run: function run(wrapper, elements) {
    elements.forEach(function (element) {
      it('include \'data-element="' + element + '"\'', function () {
        expect(wrapper.find({ 'data-element': element }).length).toEqual(1);
      });
    });
  }
};

global.RootTagTest = {
  run: function run(rootNode, comp, elem, role) {
    expect(rootNode.prop('data-component')).toEqual(comp);
    expect(rootNode.prop('data-element')).toEqual(elem);
    expect(rootNode.prop('data-role')).toEqual(role);
  }
};