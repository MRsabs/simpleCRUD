import mongoose from 'mongoose';
import logger from '~logger';

async function dataBase(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_LOCAL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true , useFindAndModify: false});
    logger.info('MongoDB Connected');
  } catch (error) {
    logger.error(error);
  }
}

export default dataBase;
