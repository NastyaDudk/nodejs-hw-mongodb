import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();

    res.status(200).json({
      data: contacts,
      message: 'Successfully retrieved all contacts',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || 'An error occurred while retrieving contacts',
    });
  }
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    res.status(200).json({
      data: contact,
      message: `Contact with ID ${contactId} found. ${
        contact ? `Successfully found contact with id ${contactId}!` : ''
      }`,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || 'Contact not found',
    });
  }
};

export const createContactController = async (req, res) => {
  try {
    const newContact = await createContact(req.body);

    res.status(201).json({
      data: newContact,
      message: 'Contact created successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || 'Failed to create contact',
    });
  }
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;

  try {
    const updatedContact = await updateContact(contactId, req.body);

    res.status(200).json({
      data: updatedContact,
      message: 'Contact updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || 'Failed to update contact',
    });
  }
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  try {
    await deleteContact(contactId);

    res.status(200).json({
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || 'Failed to delete contact',
    });
  }
};
