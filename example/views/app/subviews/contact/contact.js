import React from 'react';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Button from 'components/Button';
import Form from 'components/form';

import ContactsActions from './../../../../actions/contacts';

class Contact extends React.Component {

  state = { type: 'show' }

  componentWillMount() {
    if (this.props.type == 'create') {
      this.setState({ type: 'edit' });
    }
  }

  handleEditClick = () => {
    this.setState({type: 'edit'})  
  }

  handleSubmit = (ev, valid) => {
    ev.preventDefault();

    if (valid) {
      ContactsActions.saveContact(ev, this.props)
    }
  }

  handleFieldUpdate = (ev, props) => {
    ContactsActions.updateTabContact(ev, props, this.props)
  }

  get renderShow() {
    return (
      <div>
        <Button
          onClick={ this.handleEditClick }
          className='edit-contact-button'>Edit</Button>
        <Row>
          <Textbox
            name="name"
            value={ this.props.contact.get('name') }
          />

          <Textbox
            name="company"
            value={ this.props.contact.get('company') }
          />
        </Row>
      </div>
    )
  }

  get renderEdit() {
    return (
      <Form afterFormValidation={ this.handleSubmit }>
        <Row>
          <Textbox
            name="name"
            value={ this.props.contact.get('name') }
            onChange={ this.handleFieldUpdate }
          />

          <Textbox
            name="company"
            value={ this.props.contact.get('company') }
            onChange={ this.handleFieldUpdate }
          />
        </Row>
      </Form>
    )
  }

  render() {
    return (
      <div>
        { this.state.type == 'edit' ? this.renderEdit : this.renderShow }
      </div>
    );
  }
}

export default Contact;
