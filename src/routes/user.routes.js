/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import {
  deleteUser, getAllUser, getUserStats, getuserById, updateUser,
} from '../controllers/user.controllers.js';
import { verifyTokenAdmin, verifyTokenAndAuthorization } from '../middleware/auth.middleware.js';

const router = express.Router();
router.put('/:id', verifyTokenAndAuthorization, updateUser);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);
router.get('/:id', verifyTokenAdmin, getuserById);
router.get('/', verifyTokenAdmin, getAllUser);
router.get('/stats/user', verifyTokenAdmin, getUserStats);

export default router;
