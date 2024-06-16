import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateMongoId = (idName) => (req, res, next) => {
  const id = req.params[idName];

  if (!isValidObjectId(id)) {
    next(createHttpError(404, 'ID is not valid'));
    return;
  }
  next();
};
