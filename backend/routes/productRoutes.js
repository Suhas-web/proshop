import express from "express";
import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
} from "../controllers/productsController.js";
import {
  userAuthentication,
  adminAuthentication,
} from "../middleware/authenticationMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts);
router.route("/").post(userAuthentication, adminAuthentication, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(userAuthentication, adminAuthentication, updateProduct);

export default router;
