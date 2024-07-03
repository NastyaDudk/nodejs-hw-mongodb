import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(2).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 2 symbols',
    'string.max': 'Name must be less than 20 symbols',
    'any.required': 'Name is required',
  }),

  age: Joi.number().integer().required().min(18),
  gender: Joi.string().required().valid('male', 'female', 'other'),
  avgMark: Joi.number().required().min(2).max(12),
  onDuty: Joi.boolean(),
});
