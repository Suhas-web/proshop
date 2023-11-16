import errorHandler from "../middleware/errorHandler.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

// desc: GET all products
// endpoint: /api/products
// Access: public
const getProducts = errorHandler(async (req, res) => {
  res.status(200).json(await Product.find({}));
});

// desc: GET product by id
// endpoint: /api/products/:id
// Access: public
const getProductById = errorHandler(async (req, res) => {
  const product =
    mongoose.Types.ObjectId.isValid(req.params.id) &&
    (await Product.findById(req.params.id));
  if (product) {
    return res.status(200).json(product);
  }
  res.status(404).json({ code: 404, message: "Product Not Found" });
});

// desc: Create product
// endpoint: /api/products
// Access: Private/Admin
const createProduct = errorHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample desc",
  });
  const createdProduct = product.save();
  res.status(201).json(createdProduct);
});

// desc: Update product
// endpoint: PUT /api/products/:id
// Access: Private/Admin
const updateProduct = errorHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;
  }
  const updateProduct = await product.save();
  if (updateProduct) {
    res.status(200).json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getProducts, getProductById, createProduct, updateProduct };
