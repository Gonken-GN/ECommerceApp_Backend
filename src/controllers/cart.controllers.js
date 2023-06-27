/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for Product Controllers
 * */
import Cart from '../models/cart.models.js';

export const createCart = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const {
    userId, products,
  } = req.body;
  try {
    const savedCart = Cart({
      userId, products,
    });
    await savedCart.save();
    const response = res.status(200).json({
      status: 'success',
      data: savedCart,
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

export const updateCart = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  const {
    userId, products,
  } = req.body;
  try {
    const cart = await Cart.findByIdAndUpdate(id, {
      $set: userId, products,
    }, { new: true });
    const response = res.status(200).json({
      status: 'success',
      data: cart,
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

export const deleteCart = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    await Cart.findByIdAndDelete(id);
    const response = res.status(200).json({
      status: 'success',
      message: 'Cart has been deleted',
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

export const getCartByUserId = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      const response = res.status(400).json({
        status: 'fail',
        message: 'Product not found',
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      data: cart,
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

export const getAllCart = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const cart = await Cart.find();
    const response = res.status(200).json({
      status: 'success',
      data: cart,
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
