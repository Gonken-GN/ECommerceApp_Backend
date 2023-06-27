/**
* Programmer: D'Riski Maulana
* Filename: auth.middleware.js
* Contact: driskimaulana@upi.edu
* Date: April 04 2023
* Description: Request that need authentication should pass this function
* */

import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
export const auth = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    try {
      const token = authHeader.split(' ')[1];
      const decodedData = jwt.verify(token, process.env.JWT_SEC);
      // console.log(decodedData?.isAdmin);
      req.user = {
        id: decodedData?.id,
        isAdmin: decodedData?.isAdmin,
      }; // Store the user object in req.user
      next();
    } catch (err) {
      const response = res.status(400).json({
        status: 'fail',
        message: 'Authentication failed. Check auth token.',
      });
      return response;
    }
  }
  // const response = res.status(400).json({
  //   status: 'fail',
  //   message: 'Authentication failed. Check auth token.',
  // });
  // return response;
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  auth(req, res, () => {
    if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
      next();
    } else {
      const response = res.status(403).json({
        status: 'fail',
        message: 'Authentication failed. Check auth token test.',
      });
      return response;
    }
  });
};
export const verifyTokenAdmin = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  auth(req, res, () => {
    if (req.user && (req.user.isAdmin)) {
      next();
    } else {
      const response = res.status(403).json({
        status: 'fail',
        message: 'Authentication failed. Check auth token test.',
      });
      return response;
    }
  });
};

// eslint-disable-next-line consistent-return
// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.token;
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//       if (err) res.status(403).json('Token is not valid!');
//       req.user = user;
//       next();
//     });
//   } else {
//     return res.status(401).json('You are not authenticated!');
//   }
// };

// export const verifyTokenAndAuthorization = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json('You are not alowed to do that!');
//     }
//   });
// };
