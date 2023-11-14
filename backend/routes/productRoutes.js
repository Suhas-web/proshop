import express from "express";
import {
  getProductById,
  getProducts,
  createProduct,
} from "../controllers/productsController.js";
import {
  userAuthentication,
  adminAuthentication,
} from "../middleware/authenticationMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts);
router.route("/").post(userAuthentication, adminAuthentication, createProduct);
router.route("/:id").get(getProductById);

export default router;
