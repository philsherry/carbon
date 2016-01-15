import Dispatcher from './../../dispatcher';
import ContactsConstants from './../../constants/contacts';

let ContactsActions = {
  contactRowClicked: (ev, props) => {
    Dispatcher.dispatch({
      actionType: ContactsConstants.CONTACTS_ROW_CLICKED,
      row_id: props.row_id,
      contact: props.data 
    });
  },

  contactNew: (ev) {
    Dispatcher.dispatch({
      actionType: ContactsConstants.CONTACTS_NEW,
      row_id: props.row_id,
      contact: props.data 
    });
  }

  saveContact: (ev, props) => {
    Dispatcher.dispatch({
      actionType: ContactsConstants.CONTACTS_SAVE_CONTACT,
      tabId: props.tabId,
      contactId: props.contact.get('id'),
      contact: props.contact
    });
  },

  updateTabContact: (ev, field_props, props) => {
    Dispatcher.dispatch({
      actionType: ContactsConstants.CONTACTS_UPDATE_TAB_CONTACT,
      tabId: props.tabId,
      contactId: props.contact.get('id'),
      contact: props.contact,
      value: ev.target.value,
      field: field_props.name
    });
  }
}

export default ContactsActions
