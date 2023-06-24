/**
* Programmer: D'Riski Maulana
* Filename: auth.middleware.js
* Contact: driskimaulana@upi.edu
* Date: April 04 2023
* Description: Request that need authentication should pass this function
* */

import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

const auth = (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
  next,
  // eslint-disable-next-line consistent-return
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(' ')[1];
      const decodedData = jwt.verify(token, process.env.JWT_SEC);
      req.user = decodedData?.user;
      next();
    } catch (err) {
      const response = res.status(400).json({
        status: 'fail',
        message: 'Authentication failed. Check auth token.',
      });
      return response;
    }
  }
};

export default auth;
