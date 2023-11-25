import errorHandler from "../middleware/errorHandler.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

// desc: GET all products
// endpoint: /api/products
// Access: public
const getProducts = errorHandler(async (req, res) => {
  const pageSize = 1;
  const page = Number(req.query.pageNumber) || 1;
  //search
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const totalProducts = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res
    .status(200)
    .json({ products, page, pages: Math.ceil(totalProducts / pageSize) });
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

// desc: DELETE product
// endpoint: DELETE /api/products/:id
// Access: Private/Admin
const deleteProduct = errorHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// desc: Create a review
// endpoint: POST /api/products/:id/reviews
// Access: Private
const createReview = errorHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
};
