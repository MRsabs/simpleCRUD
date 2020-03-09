import passport from 'passport';
import jwt from './Strategies/jwt';
import local from './Strategies/local';

passport.use(jwt);
passport.use(local);
