import moment from 'moment';
import jwt from 'jsonwebtoken';
import express from 'express';


export const unixNow = (): number => {
  return moment().unix();
};

export const getDay = (timestamp: number): number => {
  return moment.unix(timestamp).day();
};

export const getIdFromJwt = (request: express.Request): string => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const { id } = jwt.decode(request.headers.authorization.split('Bearer')[1].trim());
  return id;
};

export const isDev = (arg?: unknown): unknown | boolean => {
  function isProduction(): boolean {
    if (process.env.NODE_ENV === 'production') {
      return true;
    } else {
      return false;
    }
  }

  if (arg === undefined) {
    return isProduction();
  } else {
    if (isProduction()) {
      return undefined;
    } else {
      return arg;
    }
  }
};