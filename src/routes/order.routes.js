/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import {
  createOrder, deleteOrder, getAllOrder, getMonthlyIncome, getOrderByUserId, updateOrder,
} from '../controllers/order.controllers.js';
import { auth, verifyTokenAdmin, verifyTokenAndAuthorization } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', auth, createOrder);
router.put('/:id', verifyTokenAdmin, updateOrder);
router.delete('/:id', verifyTokenAdmin, deleteOrder);
router.get('/', verifyTokenAdmin, getAllOrder);
router.get('/:userId', verifyTokenAndAuthorization, getOrderByUserId);
router.get('/stats/income', verifyTokenAdmin, getMonthlyIncome);

export default router;
