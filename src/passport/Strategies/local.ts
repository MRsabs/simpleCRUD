import bcrypt from 'bcryptjs';
// const LocalStrategy = require('passport-local').Strategy;
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../db/models/main';

const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async function(email: string, password: string, cb: Function) {
    return User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return cb(null, false, { message: 'Incorrect Email or Password' });
        } else {
          bcrypt.compare(password, user.password).then(res => {
            if (res) {
              return cb(null, user, { message: 'success' });
            } else {
              return cb(null, false, { message: 'Incorrect Email or Password' });
            }
          });
        }
      })
      .catch(err => cb(err));
  }
);

export default localStrategy;
