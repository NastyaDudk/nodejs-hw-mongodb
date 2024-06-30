import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: true,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['home', 'personal', 'work'],
      default: 'personal',
    },
    photo: { type: String },
  },
  { timestamps: true, versionKey: false },
);

contactSchema.post('save', (err, data, next) => {
  err.status = 400;
  next();
});

export const ContactsCollection = model('contacts', contactSchema);
