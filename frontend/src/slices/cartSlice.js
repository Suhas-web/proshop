import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(Number(num) * 100) / 100).toFixed(2);
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x._id === item._id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existingItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      //Calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      //caluclate shipping price(If price>200 then free, else 10 Rs shipping)
      state.shippingPrice = addDecimals(state.itemsPrice > 200 ? 0 : 10);

      //calculate tax price (18%)
      state.taxPrice = addDecimals(state.itemsPrice * 0.18);
      console.log("Tax price" + state.taxPrice);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
