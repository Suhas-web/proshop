import express from "express";
import {
  addOrders,
  getAllOrders,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import {
  userAuthentication,
  adminAuthentication,
} from "../middleware/authenticationMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(userAuthentication, addOrders)
  .get(userAuthentication, adminAuthentication, getAllOrders);

router.route("/mine").get(userAuthentication, getMyOrders);
router.route("/:id").get(userAuthentication, getOrderById);

router.route("/:id/pay").put(userAuthentication, updateOrderToPaid);

router
  .route("/:id/deliver")
  .put(userAuthentication, adminAuthentication, updateOrderToDelivered);

export default router;
