import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino-http';
import session from 'express-session';
import morgan from 'morgan';
import { env } from './utils/env.js';
import dotenv from 'dotenv';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();

const PORT = Number(env('PORT'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cors());
  app.use(helmet());

  app.use(morgan('combined'));

  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    }),
  );

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 'success',
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const contact = await getContactById(req.params.contactId);
      if (contact) {
        res.status(200).json({
          status: 'success',
          message: `Successfully found contact with id ${req.params.contactId}!`,
          data: contact,
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: `Contact with id ${req.params.contactId} not found!`,
        });
      }
    } catch (error) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        res.status(404).json({
          status: 'error',
          message: `Invalid ID format: ${req.params.contactId}`,
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: error.message,
        });
      }
    }
  });

  app.use(express.static('public'));

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message,
    });
  });

  app
    .listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
      } else {
        throw err;
      }
    });
};
