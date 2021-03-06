import MenuItem from './';
import Definition from './../../../../demo/utils/definition';

let definition = new Definition('menu-item', MenuItem, {
  description: '[content needed] Basic example of the component',
  designerNotes: '[content needed] Basic designs description for the component',
  propTypes: {
    alternate: "Boolean",
    divide: "Boolean",
    href: "String",
    selected: "Boolean",
    submenu: "String",
    submenuDirection: "String",
    target: "String",
    to: "String"
  },
  propDescriptions: {
    alternate: "Applies an alternate styling for the item.",
    divide: "Applies a dividing line above an item.",
    href: "A href to link the menu item to.",
    selected: "Applies styling to suggest this item is selected.",
    submenu: "Text for the menu item if the children are a submenu.",
    submenuDirection: "Direction for the submenu to align.",
    target: "Target for the link (eg. _blank)",
    to: "A React Router link for the menu item."
  }
});

export default definition;
