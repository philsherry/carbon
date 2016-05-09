import Dispatcher from './../dispatcher';
import TemplateConstants from './../constants/template';
import Store from 'utils/flux/store';
import ImmutableHelper from 'utils/helpers/immutable';
import Immutable from 'immutable';

let data = ImmutableHelper.parseJSON({
  grid_dialog_pattern: {
    data: [],
    dialog: {
      open: false,
      data: null
    }
  }
});

class TemplateStore extends Store {

  [TemplateConstants.TEMPLATE_TABLE_UPDATED](action) {
    this.data = this.data.setIn([action.template, 'data'], Immutable.fromJS(action.items));
  }

  [TemplateConstants.TEMPLATE_TABLE_ROW_CLICKED](action) {
    this.data = this.data.setIn([action.template, 'dialog', 'open'], true);
    this.data = this.data.setIn([action.template, 'dialog', 'data'], action.data);
  }

  [TemplateConstants.TEMPLATE_CLOSE_TABLE_DIALOG](action) {
    this.data = this.data.setIn([action.template, 'dialog', 'open'], false);
    this.data = this.data.setIn([action.template, 'dialog', 'data'], null);
  }

}

export default new TemplateStore('templateStore', data, Dispatcher);
