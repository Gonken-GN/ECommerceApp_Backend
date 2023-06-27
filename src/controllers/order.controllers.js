/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for Product Controllers
 * */
import Order from '../models/order.models.js';

export const createOrder = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const {
    userId, products, amount, address, status,
  } = req.body;
  try {
    const savedOrder = Order({
      userId, products, amount, address, status,
    });
    await savedOrder.save();
    const response = res.status(200).json({
      status: 'success',
      data: savedOrder,
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

export const updateOrder = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  const {
    userId, products, amount, address, status,
  } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, {
      $set: userId, products, amount, address, status,
    }, { new: true });
    const response = res.status(200).json({
      status: 'success',
      data: order,
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

export const deleteOrder = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id);
    const response = res.status(200).json({
      status: 'success',
      message: 'Order has been deleted',
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

export const getOrderByUserId = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId });
    if (!orders) {
      const response = res.status(400).json({
        status: 'fail',
        message: 'Product not found',
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      data: orders,
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

export const getAllOrder = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const orders = await Order.find();
    const response = res.status(200).json({
      status: 'success',
      data: orders,
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

export const getMonthlyIncome = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);
    const response = res.status(200).json({
      status: 'success',
      data: income,
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
