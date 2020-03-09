import { Router } from 'express';
import passport from 'passport';
import response from '~global/response';
import { User, Product } from '~db/models/main';
import logger from '~logger';
import { getIdFromJwt } from '~global/functions';

const dashboard = Router();

dashboard.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(getIdFromJwt(req)).populate('products');
    response('success', res, user.products, user);
  } catch (error) {
    logger.error(error);
    response('serverError', res, undefined, error);
  }
});

dashboard.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const owner = await User.findById(getIdFromJwt(req));
    const newProduct = new Product({ ...req.body });
    owner.products.push(newProduct);
    await Promise.all([owner.save(), newProduct.save()]);
    response('success', res, 'ok', { owner, newProduct });
  } catch (error) {
    logger.error(error);
    response('unknown', res, undefined, error);
  }
});

dashboard.put('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { id } = req.body;
    delete req.body.id;
    const user = await User.findById(getIdFromJwt(req));

    // TODO #security_risk => modified request
    if (!user.products.includes(id)) {
      logger.error({ userProducts: user.products, targetedProduct: id, userInfo: req.ip });
      return response('unauthorized', res, undefined, { userProducts: user.products, targetedProduct: id });
    }

    await Product.findByIdAndUpdate(id, { ...req.body });

    return response('success', res, 'ok', { userProducts: user.products, targetedProduct: id });
  } catch (error) {
    logger.error(error);
    return response('unknown', res, undefined, error);
  }
});

dashboard.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { products } = req.body;
    const user = await User.findById(getIdFromJwt(req));

    for (let i = 0; i < products.length; i++) {
      if (!user.products.includes(products[i])) {
        throw 'unauthorized';
      } else {
        await Product.findByIdAndDelete(products[i]);
        user.products.splice(user.products.indexOf(products[i]), 1);
        await user.save();
      }
    }

    return response('success', res, 'ok', { userProducts: user.products, targetedProducts: products });
  } catch (error) {
    logger.error(error, req.ip);
    if (error === 'unauthorized') {
      return response('unauthorized', res, undefined, { targetedProduct: req.body.products });
    } else {
      return response('failed', res, undefined, error);
    }
  }
});

export default dashboard;
