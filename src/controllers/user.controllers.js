/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */
import cryptoJS from 'crypto-js';
import User from '../models/user.models.js';

export const updateUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { username, email, password } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, {
      $set: {
        username,
        email,
        password: cryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
      },
    }, { new: true });
    if (!user) {
      const response = res.status(403).json({
        status: 'fail',
        message: 'User not found',
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      data: user,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};

export const deleteUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      const response = res.status(403).json({
        status: 'fail',
        message: 'User not found',
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      message: 'User has been deleted',
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};

export const getuserById = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      const response = res.status(403).json({
        status: 'fail',
        message: 'User not found',
      });
      return response;
    }
    const { password, ...others } = user._doc;
    const response = res.status(200).json({
      status: 'success',
      data: others,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};

export const getAllUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const query = req.query.new;
  try {
    const user = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
    if (!user) {
      const response = res.status(403).json({
        status: 'fail',
        message: 'User not found',
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      data: user,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};

export const getUserStats = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    const response = res.status(200).json({
      status: 'success',
      data,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};
