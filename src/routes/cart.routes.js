/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import {
  createCart, deleteCart, getAllCart, getCartByUserId, updateCart,
} from '../controllers/cart.controllers.js';
import { auth, verifyTokenAdmin, verifyTokenAndAuthorization } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', auth, createCart);
router.put('/:id', verifyTokenAndAuthorization, updateCart);
router.delete('/:id', verifyTokenAndAuthorization, deleteCart);
router.get('/', verifyTokenAdmin, getAllCart);
router.get('/:userId', verifyTokenAndAuthorization, getCartByUserId);

export default router;
