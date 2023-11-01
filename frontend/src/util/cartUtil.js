export const addDecimals = (num) => {
  return (Math.round(Number(num) * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //caluclate shipping price(If price>200 then free, else 10 Rs shipping)
  state.shippingPrice = addDecimals(state.itemsPrice > 200 ? 0 : 10);

  //calculate tax price (18%)
  state.taxPrice = addDecimals(state.itemsPrice * 0.18);

  //calcluate totalPrice
  const total =
    Number(state.taxPrice) +
    Number(state.shippingPrice) +
    Number(state.itemsPrice);
  state.totalPrice = parseFloat(total).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
