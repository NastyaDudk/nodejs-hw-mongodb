import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { ENV_VARS } from './constants/index.js';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  const app = express();

  app.set('etag', false);

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      data: contacts,
      message: 'Successfully found contacts!',
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact) {
      res.json({
        message: `Successfully found contact with id ${contactId}`,
        contact,
      });
    } else {
      res.status(404).json({ message: 'Contact not found!' });
    }
  });

  app.use((err, req, res, next) => {
    res
      .status(500)
      .json({ message: 'Something went wrong', error: err.message });
  });

  const PORT = env(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
