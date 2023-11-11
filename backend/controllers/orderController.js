import errorHandler from "../middleware/errorHandler.js";
import Order from "../models/orderModel.js";

//@desc Create new Order
//@route   POST /api/orders
//@access Private
const addOrders = errorHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("Bad request: No Orders");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      paymentMethod,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201);
    res.json(createdOrder);
  }
});

//@desc Get user Orders
//@route   GET /api/orders/mine
//@access Private
const getMyOrders = errorHandler(async (req, res) => {
  console.log(req.user._id);
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//@desc Get Order
//@route   Get /api/orders/:id
//@access Private
const getOrderById = errorHandler(async (req, res) => {
  const orderById = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (orderById) {
    res.status(200).json(orderById);
  } else {
    res.status(404).send("Invalid order id");
  }
});

//@desc Update Order
//@route   PUT /api/orders/:id/pay
//@access Private/Admin
const updateOrderToPaid = errorHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not found");
  }
});

//@desc Update Order
//@route   PUT /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = errorHandler(async (req, res) => {
  res.send("update Order To Delivered By Id");
});

//@desc Get all Orders
//@route   POST /api/orders
//@access Private/Admin
const getAllOrders = errorHandler(async (req, res) => {
  res.send("Get all orders");
});

export {
  addOrders,
  getAllOrders,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
};
