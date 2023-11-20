import express from "express";
import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";
import {
  userAuthentication,
  adminAuthentication,
} from "../middleware/authenticationMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(userAuthentication, adminAuthentication, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(userAuthentication, adminAuthentication, updateProduct)
  .delete(userAuthentication, adminAuthentication, deleteProduct);

export default router;
