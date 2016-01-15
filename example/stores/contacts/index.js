import Dispatcher from './../../dispatcher';
import ContactsConstants from './../../constants/contacts';
import Store from 'utils/flux/store';
import Immutable from 'immutable';
import ImmutableHelper from 'utils/helpers/immutable';
import BigNumber from 'bignumber.js';

const data = ImmutableHelper.parseJSON({
  contacts: [
    {
      id: '0', name: 'Contact 1', company: 'Company 1', type: 'Customer'
    },
    {
      id: '1', name: 'Contact 2', company: 'Company 2', type: 'Customer'
    },
    {
      id: '2', name: 'Contact 3', company: 'Company 3', type: 'Supplier'
    },
    {
      id: '3', name: 'Contact 4', company: 'Company 4', type: 'Supplier'
    },
  ],
  tabs: []
});

class ContactsStore extends Store {
  constructor(name, data, Dispatcher, opts = {}) {
    super(name, data, Dispatcher, opts);
  }

  [ContactsConstants.CONTACTS_ROW_CLICKED](action) {
    let alreadyOpen = false;

    this.data.get('tabs').forEach((tab) => {
      if (tab.get('contactId') == action.contact.get('id')) {
        alreadyOpen = true;
      }
    });

    if (!alreadyOpen) {
      let tabId = ImmutableHelper.guid();
      let tabData = Immutable.fromJS({ contactId: action.contact.get('id'), tabId: tabId, type: 'show', data: action.contact });
      this.data = this.data.setIn(['tabs', this.data.get('tabs').count()], tabData);
    }
  }

  [ContactsConstants.CONTACTS_UPDATE_TAB_CONTACT](action) {
    let tabIndex;

    this.data.get('tabs').forEach((tab, index) => {
      if (tab.get('contactId') == action.contact.get('id')) {
        tabIndex = index;
      }
    });

    this.data = this.data.setIn(['tabs', tabIndex, 'data', action.field], action.value);
  }

  [ContactsConstants.CONTACTS_SAVE_CONTACT](action) {
    let contactIndex, tabId;

    this.data.get('contacts').forEach((contact, index) => {
      if (contact.get('id') == action.contactId) {
        contactIndex = index;
      }
    });

    this.data.get('tabs').forEach((tab, index) => {
      if (tab.get('contactId') == action.contactId) {
        tabId = index;
      }
    });

    this.data = this.data.setIn(['contacts', contactIndex], action.contact);
    this.data = this.data.deleteIn(['tabs', tabId]);
  }
}

export default new ContactsStore('ContactsStore', data, Dispatcher, { history: false });
