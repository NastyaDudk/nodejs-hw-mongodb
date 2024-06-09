import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (error) {
    console.error('Error while fetching all contacts:', error);
    return [];
  }
};

export const getContactById = async (id) => {
  try {
    const contact = await ContactsCollection.findOne({ _id: id });
    return contact;
  } catch (error) {
    console.error('Error while fetching contact by id:', error);
    return null;
  }
};
