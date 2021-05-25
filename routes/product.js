const express = require('express');

const router = express.Router();

const product = require('../controllers/product');

router.get('/', product.getAll);

router.get('/:id', product.getOne);

router.post('/', product.add);

router.put('/:id', product.update);

router.delete('/:id', product.getOne);

router.get('*', product.invalidRoute);
router.post('*', product.invalidRoute);
router.put('*', product.invalidRoute);
router.delete('*', product.invalidRoute);

module.exports = router;
