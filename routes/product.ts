import express from 'express';

const router = express.Router();

import {product} from '../controllers/product';

router.get('/', product.getAll);

router.get('/:id', product.getOne);

router.post('/', product.add);

router.put('/:id', product.update);

router.delete('/:id', product.getOne);

router.get('*', product.invalidRoute);
router.post('*', product.invalidRoute);
router.put('*', product.invalidRoute);
router.delete('*', product.invalidRoute);

export = router;
