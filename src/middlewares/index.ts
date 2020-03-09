import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import compression from 'compression';


async function middleWares(app: express.Application): Promise<void> {
  // Parse incoming requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // helmet middleware
  app.use(helmet());
  // compression
  app.use(compression());

  // initializing Passport
  require('~passport/config');
  app.use(passport.initialize());
}

export default middleWares;
