/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import { createProduct, deleteProduct, updateProduct } from '../controllers/product.controllers.js';
import { verifyTokenAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyTokenAdmin, createProduct);
router.put('/:id', verifyTokenAdmin, updateProduct);
router.delete('/:id', verifyTokenAdmin, deleteProduct);

export default router;
