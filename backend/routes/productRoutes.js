import express from "express";
const router = express.Router();
import errorHandler from "../middleware/errorHandler.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

router.get(
  "/",
  errorHandler(async (req, res) => {
    res.json(await Product.find({}));
  })
);

router.get(
  "/:id",
  errorHandler(async (req, res) => {
    const product =
      mongoose.Types.ObjectId.isValid(req.params.id) &&
      (await Product.findById(req.params.id));
    if (product) {
      return res.status(200).json(product);
    }
    res.status(404).json({ code: 404, message: "Product Not Found" });
  })
);

export default router;
