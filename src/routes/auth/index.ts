import { Router } from 'express';
import registerRoute from './routes/register';
import loginRoute from './routes/login';

const admin = Router();

admin.use('/login', loginRoute);
admin.use('/register', registerRoute);

export default admin;
