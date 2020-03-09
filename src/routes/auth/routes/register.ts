import { Router } from 'express';
import { User } from '~db/models/main';
import response from '~global/response';
import logger from '~logger';

const registerRoute = Router().post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email: email.toLowerCase(), password });
    const isValid = user.isValid();
    if (!(isValid.error)) {
      await user.hashPassword();
      await user.save();
      return response('success', res, 'ok', user);
    } else {
      logger.error({ msg: 'modified request', userInfo: req.ip });
      return response('failed', res, undefined, isValid);
    }
  } catch (error) {
    logger.error(error);
    return response('serverError', res, undefined, error);
  }
});

export default registerRoute;
