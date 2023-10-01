import errorHandler from "../middleware/errorHandler.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

// desc: GET all products
// endpoint: /api/products
// Access: public
const getProducts = errorHandler(async (req, res) => {
  res.status(200).json(await Product.find({}));
});

const getProductById = errorHandler(async (req, res) => {
  const product =
    mongoose.Types.ObjectId.isValid(req.params.id) &&
    (await Product.findById(req.params.id));
  if (product) {
    return res.status(200).json(product);
  }
  res.status(404).json({ code: 404, message: "Product Not Found" });
});

export { getProducts, getProductById };
