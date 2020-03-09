import { Schema } from 'mongoose';
import { unixNow } from '~global/functions';
import Joi from '@hapi/joi';
import logger from '~logger';

const user = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdOn: {
    type: Number,
    default: unixNow()
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products'
    }
  ]
});

// methods
user.methods.isValid = function(): Joi.ValidationResult {
  const UserIsValid = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{4,18}$/)
  });
  return UserIsValid.validate({ email: this.email, password: this.password });
};

user.methods.hashPassword = async function(): Promise<boolean> {
  try {
    const { hash } = await import('bcryptjs');
    this.password = await hash(this.password, 10);
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

export default user;
