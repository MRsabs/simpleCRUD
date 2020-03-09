import { model, Document } from 'mongoose';
import user from './schemas/user';
import product from './schemas/product';
import Joi from '@hapi/joi';

// models
export const User = model<User>('users', user);
export const Product = model<Product>("products", product)


// types
export interface User extends Document {
  isValid(): Joi.ValidationResult;
  hashPassword(): Promise<void>;
  email: string;
  password: string;
  products: Array<Product>;
}
interface Product extends Document {
  name: string;
  price: number; 
  quantity: number;
  description: string;
  barCode: number;
}
