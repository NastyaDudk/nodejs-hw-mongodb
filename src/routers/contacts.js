import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateMongoId, validateBody } from '../middlewares/index.js';
import { createContactSchema } from '../validation/createContactsSchema.js';
import { updateContactSchema } from '../validation/updateContactsSchema.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkChildPermission } from '../middlewares/checkChildPermission.js';
import { upload } from '../middlewares/upload.js';

const contactsRouter = Router();

contactsRouter.use('/:contactId', validateMongoId('contactId'));

contactsRouter.use('/', authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  upload.single('avatar'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

contactsRouter.put(
  '/:contactId',
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

contactsRouter.patch(
  '/:contactId',
  checkChildPermission('teacher', 'parent'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default contactsRouter;
