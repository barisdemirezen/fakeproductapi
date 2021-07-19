import { Schema, model } from 'mongoose';

interface IProduct {
        id: number,
        title: string,
        description: string,
        image: string,
        price: number,
        category: string
}

const productSchema = new Schema<IProduct>({
  id: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
});

const Product = model<IProduct>('Product', productSchema, 'Products');

export {Product, IProduct};