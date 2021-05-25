const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
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

const Product = mongoose.model('Product', productSchema, 'Products');

module.exports = Product;
