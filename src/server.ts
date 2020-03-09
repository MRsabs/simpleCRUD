import app from './app';
import logger from '~logger';
import dataBase from '~db/config';

console.log(process.env.NODE_ENV)
// connect to mongo
dataBase()

app.listen(process.env.DEV_PORT, () => {
  logger.info(`SERVER STARTED ON PORT: ${process.env.DEV_PORT}`);
});