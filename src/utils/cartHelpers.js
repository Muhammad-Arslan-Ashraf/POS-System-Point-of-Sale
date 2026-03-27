const cartHelpers = (cartItems, discount = 0) => {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discountValue = parseFloat(discount || 0);
  const disCountAmount = Math.round((totalPrice * discountValue) / 100);
  const finalAmount = Math.max(0, Math.round(totalPrice - disCountAmount));

  return {
    totalPrice,
    disCountAmount,
    finalAmount,
  };
};
export default cartHelpers;
