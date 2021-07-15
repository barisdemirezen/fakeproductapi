import { Express, Request, Response } from 'express';
import { Product, IProduct } from '../models/product';
import { CallbackError } from 'mongoose';
import { cache } from '../cache/redis';

export const product = {
  getAll: async function (req: any, res: any) {
    const reqCategory: string = req.query.cat;
    const reqSort: string = req.query.price;
    const reqQuery: string = req.query.q;
    const categoryValue: string = reqCategory || '';
    const queryValue: string = reqQuery ? `.*${reqQuery}.*` : '';
    let sortValue: string;

    if (reqSort === 'asc') {
      sortValue = 'price';
    } else if (reqSort === 'desc') {
      sortValue = '-price';
    } else {
      sortValue = 'id';
    }
    // Set price sort to asc or desc if defined, or id as default if sort is undefined.
    const result: any = await cache.get('result');
    console.log(result);

    Product.find(
      {
        title: { $regex: queryValue, $options: 'i' },
        category: { $regex: categoryValue, $options: 'i' },
      },
      { _id: 0 },
      { sort: `${sortValue}` },
      (err: CallbackError, result: IProduct[]) => {
        if (err) throw err;
        cache.set('result', JSON.stringify(result));
        res.json({ status: '200', result });
      },
    );
  },

  getOne: async function (req: any, res: any) {
    const queryId: number = Number(req.params.id);
    if (Number.isNaN(queryId)) {
      res.json({ status: '400', error: 'Please enter valid number as an id' });
      throw new Error('Id is not a number!');
    }
    Product.findOne({ id: queryId }, (err: CallbackError, result: IProduct) => {
      if (err) throw err;
      if (result) {
        res.json({ status: '200', result });
      } else {
        res.status(404).json({
          status: '404',
          error: `No product is found with id ${queryId}`,
        });
      }
    });
  },

  add: async function (req: any, res: any) {
    const product: IProduct = {
      id: await getLastId(res),
      title: req.body.title || '',
      description: req.body.description || '',
      image: req.body.image || '',
      price: req.body.price || 0,
      category: req.body.category || '',
    };

    res.json({ status: '200', result: product });
  },

  update: async function (req: any, res: any) {
    const queryId: number = await validateId(Number(req.params.id), res);

    const found = await Product.findOne(
      { id: queryId },
      (err: CallbackError, result: IProduct) => {
        if (err) throw err;
        return result;
      },
    );

    if (!found) {
      res.json({
        status: '404',
        error: `No product is found with id ${queryId}`,
      });
      throw new Error('No product is found with id');
    }

    const product: IProduct = {
      id: Number(queryId),
      title: req.body.title || found.title,
      description: req.body.description || found.description,
      image: req.body.image || found.image,
      price: Number(req.body.price || found.price),
      category: req.body.category || found.category,
    };

    res.json({ status: '200', result: product });
  },

  invalidRoute: function (req: any, res: any) {
    res.json({ status: '404', error: 'This is not a valid route!' });
  },
};

let validateId = async function (param: number, res: any) {
  const id: number = Number(param);
  if (Number.isNaN(id)) {
    res.json({ status: '400', error: 'Please enter valid number as an id' });
    throw new Error('Id is not a number!');
  }
  return id;
};

let getLastId = async function (res: any) {
  const lastId: number = await Product.countDocuments(
    {},
    (err: CallbackError, count: number) => {
      if (err) {
        res.json({ status: '500', error: 'An error occured' });
        throw err;
      }
      return Number(count);
    },
  );
  return lastId;
};
