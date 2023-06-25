/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */
import Product from '../models/product.models.js';

export const createProduct = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const {
    title, desc, img, categories, size, color, price,
  } = req.body;
  try {
    const savedProduct = await Product({
      title, desc, img, categories, size, color, price,
    });
    savedProduct.save();
    const response = res.status(200).json({
      status: 'success',
      data: savedProduct,
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

export const updateProduct = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  const {
    title, desc, img, categories, size, color, price,
  } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, {
      $set: title, desc, img, categories, size, color, price,
    }, { new: true });
    const response = res.status(200).json({
      status: 'success',
      data: product,
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

export const deleteProduct = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    const response = res.status(200).json({
      status: 'success',
      message: 'Product has been delete',
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
