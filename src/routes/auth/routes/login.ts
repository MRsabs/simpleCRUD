import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import response from '~global/response';
import { User } from '~db/models/main';

const loginRoute = Router().post('/', function(req, res, next) {
  passport.authenticate('local', function(err: unknown, user: User) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return response("failed", res, undefined, user)
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    req.logIn(user, { session: false }, function(errr: unknown) {
      if (errr) {
        return next(errr);
      }
      const payload = { id: user._id };
      const token = jwt.sign(payload, process.env.JWT_KEY);
      return response("success", res, token, user)
    });
  })(req, res, next);
});

export default loginRoute;
