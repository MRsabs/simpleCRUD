/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import getPort from 'get-port';
import app from '~app.ts';
import { User } from '~db/models/main.ts';
import mongoose from 'mongoose';
let server: import('http').Server = null;
const data = {
  email: 'test@test.com',
  password: 'test123',
  product: {
    name: 'product name',
    price: 12,
    quantity: 10,
    description: 'product description',
    barcode: 123456
  }
};

const state = {
  token: '',
  productId: '',
  productToEdit: {
    price: 12,
    quantity: 10
  }
};

beforeAll(async done => {
  await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
  server = app.listen(await getPort(), done);
});
afterAll(async done => {
  await mongoose.connection.close();
  server.close(done);
});

describe('should register and login', () => {
  const { email, password } = data;
  test('should register a new user', async () => {
    try {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email,
          password
        });

      expect(res.status).toEqual(200);
    } catch (error) {
      console.log(error);
    }
  });

  test('should login a user', async () => {
    try {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email,
          password
        });
      state.token = res.body.data;
      expect(res.status).toEqual(200);
    } catch (error) {
      console.log(error);
    }
  });
});

describe('Create & Read & Edit & Remove a product', () => {
  test('should create a new product', async () => {
    try {
      const res = await request(app)
        .post('/dashboard')
        .set('Authorization', `Bearer ${state.token}`)
        .send(data.product);
      expect(res.status).toEqual(200);
    } catch (error) {
      console.log(error);
    }
  });

  test('should get list (only one for testing user) of user products', async () => {
    try {
      const res = await request(app)
        .get('/dashboard')
        .set('Authorization', `Bearer ${state.token}`);
      state.productId = res.body.data[0]._id;
      expect(res.status).toEqual(200);
    } catch (error) {
      console.log(error);
    }
  });

  test('should edit a product', async () => {
    try {
      const res = await request(app)
        .put('/dashboard')
        .set('Authorization', `Bearer ${state.token}`)
        .send({ id: state.productId, ...state.productToEdit });
      expect(res.status).toEqual(200);
    } catch (error) {
      console.log(error);
    }
  });

  test('should remove a user product', async () => {
    try {
      const res = await request(app)
        .delete('/dashboard')
        .set('Authorization', `Bearer ${state.token}`)
        .send({products: [state.productId]});
      expect(res.status).toEqual(200);
    } catch (error) {
      console.log(error);
    }
  });
});

describe('should delete the testing user and all of their products', () => {
  test('should delete TEST user', async () => {
    try {
      const op = await User.findOneAndDelete({ email: data.email });
      expect(op).toBeTruthy();
    } catch (error) {
      console.log(error);
    }
  });
});
