import express from 'express';
import { product } from '../controllers/product';

const router = express.Router();

router.get('/', product.getAll);

router.get('/:id', product.getOne);

router.post('/', product.add);

router.put('/:id', product.update);

router.delete('/:id', product.getOne);

router.get('*', product.invalidRoute);
router.post('*', product.invalidRoute);
router.put('*', product.invalidRoute);
router.delete('*', product.invalidRoute);

export default router;
