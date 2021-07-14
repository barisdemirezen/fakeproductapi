import { Express, Request, Response } from "express"; 
import {Product, IProduct} from '../models/product';

export const product = {

    getAll : async function (req: Request, res: Response) {
        const reqCategory:string = String(req.query.cat);
        const reqSort:string = String(req.query.price);
        const reqQuery:string = String(req.query.q);
        const categoryValue:string = reqCategory || '';
        const queryValue:string = reqQuery ? `.*${reqQuery}.*` : '';
        let sortValue:string;
      
        if (reqSort === 'asc') {
          sortValue = 'price';
        } else if (reqSort === 'desc') {
          sortValue = '-price';
        } else {
          sortValue = 'id';
        }
        // Set price sort to asc or desc if defined, or id as default if sort is undefined.
      
        Product.find(
          ({
            title: { $regex: queryValue, $options: 'i' },
            category: { $regex: categoryValue, $options: 'i' },
          }),
          { _id: 0 },
          { sort: `${sortValue}` },
          (err:Error, result:IProduct[]) => {
            if (err) throw err;
            res.json({ status: '200', result });
          },
        );
      },
      
      getOne : async function (req: Request, res: Response) {
        const queryId:number = Number(req.params.id);
        if (Number.isNaN(queryId)) {
          res.json({ status: '400', error: 'Please enter valid number as an id' });
          throw new Error('Id is not a number!');
        }
        Product.findOne(
          ({ id:queryId }),
          (err:Error, result:IProduct) => {
          if (err) throw err;
          if (result) {
            res.json({ status: '200', result });
          } else {
            res
              .status(404)
              .json({ status: '404', error: `No product is found with id ${queryId}` });
          }
        });
      },
      
      add : async function (req: Request, res: Response) {
        const title = req.body.title || '';
        const description = req.body.description || '';
        const image = req.body.image || '';
        const price = req.body.price || 0;
        const category = req.body.category || '';
      
        const lastId: number = await this.getLastId(res);
      
        const product = {
          id: (lastId + 1),
          title,
          description,
          image,
          price: Number(price),
          category,
        };
      
        res.json({ status: '200', result: product });
      },
      
      update : async function (req: Request, res: Response) {
        const queryId: number = await this.validateId(Number(req.params.id), res);
      
        const found = await Product.findOne(({ id:queryId }), (err:Error, result:JSON) => {
          if (err) throw err;
          return result;
        });
      
        if (!found) {
          res.json({ status: '404', error: `No product is found with id ${queryId}` });
          throw new Error('No product is found with id');
        }
      
        const title = req.body.title || found.title;
        const description = req.body.description || found.description;
        const image = req.body.image || found.image;
        const price = req.body.price || found.price;
        const category = req.body.category || found.category;
      
        const product = {
          id: Number(queryId),
          title,
          description,
          image,
          price: Number(price),
          category,
        };
      
        res.json({ status: '200', result: product });
      },
      
      validateId : async function (param: number, res: Response) {
        const id:number = Number(param);
        if (Number.isNaN(id)) {
          res.json({ status: '400', error: 'Please enter valid number as an id' });
          throw new Error('Id is not a number!');
        }
        return id;
      },
      
      getLastId : async function (res: Response) {
        const lastId: number = await Product.countDocuments({}, (err:Error, count: number) => {
          if (err) {
            res.json({ status: '500', error: 'An error occured' });
            throw err;
          }
          return Number(count);
        });
        return lastId;
      },
      
      invalidRoute :  function (req: Request, res: Response) {
        res.json({ status: '404', error: 'This is not a valid route!' });
      }

}

