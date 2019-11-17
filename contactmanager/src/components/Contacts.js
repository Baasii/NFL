import React, { Component } from 'react';
import Contact from './Contact';

export default class Contacts extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: 'John Doe',
        email: 'jdeo@hmail.com',
        phone: '555-555-555'
      },
      {
        id: 2,
        name: 'Karen Marks',
        email: 'kar@hmail.com',
        phone: '777-234-555'
      },
      {
        id: 3,
        name: 'Henry Johnson',
        email: 'hen@hmail.com',
        phone: '333-225-111'
      }
    ]
  };

  render() {
    const { contacts } = this.state;
    return (
      <div>
        {contacts.map(contact => (
          <Contact
            key={contact.id}
            contact={contact}
        
          />
        ))}
      </div>
    );
  }
}
