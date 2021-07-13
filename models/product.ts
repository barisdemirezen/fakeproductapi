import { Schema, model } from 'mongoose';

interface Product {
        id: number,
        title: string,
        description: string,
        image: string,
        price: number,
        category: string
}

const productSchema = new Schema<Product>({
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

const ProductModel = model<Product>('Product', productSchema, 'Products');

module.exports = ProductModel;