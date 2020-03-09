import Joi from '@hapi/joi';

export const UserIsValid = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().regex(/^[a-zA-Z0-9]{4,18}$/)
});

// export default UserIsValid;
