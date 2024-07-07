import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = req.query;
    const filter = parseFilterParams(req.query);
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
      userId: req.user._id,
    });
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const userId = req.user._id;
    const contact = await getContactById(contactId, userId);

    if (!contact) {
      throw createHttpError(
        404,
        'Contact not found or you are not authorized to view it',
      );
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const { body, file } = req;
    if (!body.name || !body.phoneNumber) {
      next(createHttpError(400, 'Name and phone number are required!'));
      return;
    }

    const contact = await createContact(
      { ...body, photo: file.path },
      req.user._id,
    );

    res.status(201).json({
      status: 201,
      message: 'Successfully created contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { body, file } = req;
    const { contactId } = req.params;
    const userId = req.user._id;
    const { contact } = await updateContact(
      contactId,
      { ...body, photo: file.path },
      userId,
      {},
    );

    if (!contact) {
      throw createHttpError(
        404,
        'Contact not found or you are not authorized to update it',
      );
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const putContactController = async (req, res, next) => {
  try {
    const { body, file } = req;
    const { contactId } = req.params;
    const userId = req.user._id;
    const { isNew, contact } = await updateContact(
      contactId,
      { ...body, photo: file },
      userId,
      {
        upsert: true,
      },
    );

    if (!contact) {
      throw createHttpError(
        404,
        'Contact not found or you are not authorized to update it',
      );
    }

    const status = isNew ? 201 : 200;

    res.status(status).json({
      status,
      message: 'Successfully upserted contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { user } = req;
  const contact = await deleteContact(contactId, user._id);

  if (!contact) {
    const error = createHttpError(404, 'Contact not found');
    next(error);
    return;
  }
  res.status(204).send(204, 'Contact has been successfully deleted.');
};
