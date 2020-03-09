import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '~db/models/main';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY
};

const jwtStrategy = new Strategy(jwtOptions, async ({ id }, next) => {
  try {
    const userExist = await User.findById(id);
    next(null, userExist);
  } catch (error) {
    next(null, false);
  }
});

export default jwtStrategy;
