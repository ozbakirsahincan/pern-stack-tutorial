import express from 'express';
const router = express.Router();

import {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

router.get('/', getProducts);
router.post('/', createProduct);

router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;