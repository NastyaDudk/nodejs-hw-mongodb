import { ContactCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  return await ContactCollection.find();
};

export const getContactById = async (contactId) => {
  return await ContactCollection.findById(contactId);
};

export const createContact = async (payload) => {
  return await ContactCollection.create(payload);
};

export const updateContact = async (contactId, contactData) => {
  return await ContactCollection.findByIdAndUpdate(contactId, contactData, {
    new: true,
  });
};

export const deleteContact = async (contactId) => {
  return await ContactCollection.findByIdAndDelete(contactId);
};
