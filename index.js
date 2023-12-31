/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import authRouter from './src/routes/auth.routes.js';
import userRouter from './src/routes/user.routes.js';
import productRouter from './src/routes/product.routes.js';
import cartRouter from './src/routes/cart.routes.js';
import orderRouter from './src/routes/order.routes.js';

const init = () => {
  // setting up the server
  const server = express();
  server.use(bodyParser.json({ limit: '10mb', extended: true }));
  server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  server.use(cors());
  server.use(helmet());
  server.use(morgan('common'));

  // register the routes
  server.use('/auth', authRouter);
  server.use('/users', userRouter);
  server.use('/products', productRouter);
  server.use('/carts', cartRouter);
  server.use('/orders', orderRouter);

  // get env from .env file
  dotenv.config();
  // get port from .env
  const PORT = process.env.PORT || 5000;
  // start the server
  mongoose.connect(process.env.MONGOOSE_CONNECT_URL)
    .then(() => server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message));
};

init();
