const Product = require('../models/product');
//  const redis = require('../utility/cache');

exports.getAll = async (req, res) => {
  const reqCategory = req.query.cat;
  const reqSort = req.query.price;
  const reqQuery = req.query.q;
  const categoryValue = reqCategory || '';
  const queryValue = reqQuery ? `.*${reqQuery}.*` : '';
  let sortValue;

  if (reqSort === 'asc') {
    sortValue = 'price';
  } else if (reqSort === 'desc') {
    sortValue = '-price';
  } else {
    sortValue = 'id';
  }
  // Set price sort to asc or desc if defined, or id as default if sort is undefined.

  Product.find(
    {
      title: { $regex: queryValue, $options: 'i' },
      category: { $regex: categoryValue, $options: 'i' },
    },
    { _id: 0 },
    { sort: `${sortValue}` },
    (err, result) => {
      if (err) throw err;
      res.json({ status: '200', result });
    },
  );
};

exports.getOne = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.json({ status: '400', error: 'Please enter valid number as an id' });
    throw new Error('Id is not a number!');
  }
  Product.findOne({ id }, { _id: 0 }, (err, result) => {
    if (err) throw err;
    if (result) {
      res.json({ status: '200', result });
    } else {
      res
        .status(404)
        .json({ status: '404', error: `No product is found with id ${id}` });
    }
  });
};

exports.add = async (req, res) => {
  const title = req.body.title || '';
  const description = req.body.description || '';
  const image = req.body.image || '';
  const price = req.body.price || 0;
  const category = req.body.category || '';

  const lastId = await this.getLastId(res);

  const product = {
    id: Number(lastId + 1),
    title,
    description,
    image,
    price: Number(price),
    category,
  };

  res.json({ status: '200', result: product });
};

exports.update = async (req, res) => {
  const id = await this.validateId(req.params.id, res);

  const found = await Product.findOne({ id }, { _id: 0 }, (err, result) => {
    if (err) throw err;
    return result;
  });

  if (!found) {
    res.json({ status: '404', error: `No product is found with id ${id}` });
    throw new Error('No product is found with id');
  }

  const title = req.body.title || found.title;
  const description = req.body.description || found.description;
  const image = req.body.image || found.image;
  const price = req.body.price || found.price;
  const category = req.body.category || found.category;

  const product = {
    id: Number(id),
    title,
    description,
    image,
    price: Number(price),
    category,
  };

  res.json({ status: '200', result: product });
};

exports.validateId = async (param, res) => {
  const id = Number(param);
  if (Number.isNaN(id)) {
    res.json({ status: '400', error: 'Please enter valid number as an id' });
    throw new Error('Id is not a number!');
  }
  return id;
};

exports.getLastId = async (res) => {
  const lastId = await Product.countDocuments({}, (err, count) => {
    if (err) {
      res.json({ status: '500', error: 'An error occured' });
      throw err;
    }
    return Number(count);
  });
  return lastId;
};

exports.invalidRoute = (req, res) => {
  res.json({ status: '404', error: 'This is not a valid route!' });
};
