import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    screen: 'list', // list, create
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts });
    })
  }

  removeContact = (contact) => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact);
  }
  render() {
    const { screen, contacts } = this.state;

    return (
      <div >
        {screen === 'list' && (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={contacts}
            onNavigate={() => this.setState({screen: 'create'})}
          />
        )}
        {screen === 'create' && (
          <CreateContact />
        )}
      </div>
    )
  }
}

export default App;
