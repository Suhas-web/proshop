import React from "react";
import ReactDOM from "react-dom/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import AdminRoute from "./components/AdminRoute";
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/register" element={<RegisterScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<HomeScreen />}></Route>
        <Route path="/search/:keyword" element={<HomeScreen />}></Route>
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={<HomeScreen />}
        ></Route>
        <Route path="/page/:pageNumber" element={<HomeScreen />}></Route>
        <Route path="/product/:id" element={<ProductScreen />}></Route>
        <Route path="/cart" element={<CartScreen />}></Route>
        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<ShippingScreen />}></Route>
          <Route path="/payment" element={<PaymentScreen />}></Route>
          <Route path="/placeOrder" element={<PlaceOrderScreen />}></Route>
          <Route path="/order/:id" element={<OrderScreen />}></Route>
          <Route path="/users/profile" element={<UserProfileScreen />}></Route>
        </Route>
        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/orderList" element={<OrderListScreen />}></Route>
          <Route
            path="/admin/productList"
            element={<ProductListScreen />}
          ></Route>
          <Route
            path="/admin/productList/page/:pageNumber"
            element={<ProductListScreen />}
          ></Route>
          <Route
            path="/admin/product/:id/edit"
            element={<ProductEditScreen />}
          ></Route>
          <Route path="/admin/userList" element={<UserListScreen />}></Route>
          <Route
            path="/admin/user/:id/edit"
            element={<UserEditScreen />}
          ></Route>
        </Route>
      </Route>
    </Route>
  )
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={false}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
