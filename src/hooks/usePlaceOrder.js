import { useDispatch, useSelector } from "react-redux";
import cartHelpers from "../utils/cartHelpers";

const usePlaceOrder = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.addToCart.cartItems);

  // order number
  const getNextOrderNumber = () => {
    const lastNumber = parseInt(localStorage.getItem("last_order_number")) || 0;
    const nextNumber = lastNumber + 1;
    localStorage.setItem("last_order_number", nextNumber);
    return String(nextNumber).padStart(5, "0");
  };

  //   placeOrder function
  const placeOrder = ({
    customerName,
    devliveryOpt,
    cashMethod,
    discount,
    cartItems,
  }) => {
    const { totalPrice, disCountAmount, finalAmount } = cartHelpers(
      cartItems,
      discount,
    );
    const cashier = JSON.parse(localStorage.getItem("cashier")) || {
      name: "Ali",
      shift: "Unknown",
    };
    const order = {
      id: Date.now(),
      orderNumber: getNextOrderNumber(),
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString("en-PK"),
      time: new Date().toLocaleTimeString("en-PK"),
      cashier: cashier.name,
      shift: cashier.shift,
      customerName: customerName || "Walk-in Customer",
      deliveryType: devliveryOpt,
      paymentMethod: cashMethod,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        selectedVar: item.selectedVar || null,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
      subtotal: totalPrice,

      disCountAmount: disCountAmount,
      totalAmount: finalAmount,
    };
    try {
      const existingOrder =
        JSON.parse(localStorage.getItem("all_orders")) || [];
      localStorage.setItem(
        "all_orders",
        JSON.stringify([...existingOrder, order]),
      );

      return order;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };
  return { placeOrder };
};
export default usePlaceOrder;
