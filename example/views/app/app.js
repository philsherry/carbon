import React from 'react';
import { connect } from 'utils/flux';
import Form from 'components/form';
import { Tabs, Tab } from 'components/tabs';
import Grid from 'components/grid';
import Button from 'components/Button';
import ContactView from './subviews/contact';

import ContactsStore from './../../stores/contacts';
import ContactsActions from './../../actions/contacts';

class Contacts extends React.Component {

  tempTabs = () => {
    let tabs = [];
    let data = this.state.ContactsStore.get('tabs');
    
    data.map((tabData) => {
      let tabId = tabData.get('tabId');
      let tabName = tabData.getIn(['data', 'name'])

      if (!tabName || tabName == '') {
        tabName = 'Contact';
      }

      tabs.push(
        <Tab key={ tabId } title={ tabName } tabId={ tabId }
          onTabDelete={ ContactsActions.contactTabDelete }>
          <ContactView
            tabId={ tabId }
            type={ tabData.get('type') }
            contact={ tabData.get('data') } />
        </Tab>
      )
    });

    return tabs;
  }

  render() {
    let fields = [{ name: 'name' }, { name: 'company' }, { name: 'type' }]
    
    return (
      <div className='view-contacts'>
        <h1 className="view-contact__title">Contacts</h1>

        <Tabs>
          <Tab title='Index' tabId='index' key='index'>

            <Button onClick={ ContactsActions.contactNew } className='new-contact-button'>New Contact</Button>

            <Grid
              fields={ fields }
              data={ this.state.ContactsStore.get('contacts') }
              onRowClick={ ContactsActions.contactRowClicked }
              onRowDelete={ ContactsActions.contactRowDelete }
            />
          </Tab>
            
          { this.tempTabs() }
        </Tabs>
      </div>
    )
  }
}

export default connect(Contacts, ContactsStore);
