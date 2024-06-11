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
      message: 'Successfully found contacts!',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const contact = await getContactById(id);

    if (!contact) {
      return next(
        createHttpError({
          status: 404,
          message: `Contact not found!`,
          data: null,
        }),
      );
    }

    res.status(200).json({
      data: contact,
      message: `Successfully found contact with id ${id}!`,
    });
  } catch (err) {
    next(err);
  }
};

export const createContactController = async (req, res) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    const newContact = await createContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    res.status(201).json({
      status: 'success',
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await updateContact(contactId, req.body);

    if (!result) {
      return next(
        createHttpError({
          status: 404,
          message: `Contact not found!`,
          data: null,
        }),
      );
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.contact,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);

    if (!contact) {
      return next(
        createHttpError({
          status: 404,
          message: `Contact not found!`,
          data: null,
        }),
      );
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
