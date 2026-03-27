import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../redux/addToCart";
import ReceiptModal from "./modals/ReceiptModal";
import useModal from "../hooks/useModal";
import cartHelpers from "../utils/cartHelpers";
import usePlaceOrder from "../hooks/usePlaceOrder";

const Delivery_Options = [
  { id: 1, name: "Takeaway", icon: "🥡" },
  { id: 2, name: "Dine In", icon: "🍽️" },
  { id: 3, name: "Delivery", icon: "🛵" },
];
const OrderPanel = () => {
  const [devliveryOpt, setDeliveryOpt] = useState("Dine In");
  const [cashMethod, setCashMethod] = useState("Cash");
  const [discount, setDiscount] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const cartItems = useSelector((state) => state.addToCart.cartItems);
  const { totalPrice, disCountAmount, finalAmount } = cartHelpers(
    cartItems,
    discount,
  );

  const dispatch = useDispatch();
  const receiptModal = useModal();

  const { placeOrder } = usePlaceOrder();
  const [currentOrder, setCurrentOrder] = useState(null);
  const handlePlaceOrder = () => {
    const success = placeOrder({
      customerName,
      devliveryOpt,
      cashMethod,
      discount,
      cartItems,
    });
    if (success) {
      setCurrentOrder(success);
      console.log(success);

      receiptModal.open();
      setDeliveryOpt("Dine In");
      setCashMethod("Cash");
      setDiscount(null);
      setCustomerName("");
      dispatch(clearCart());
    } else {
      alert("order not placed");
    }
  };

  return (
    <>
      {/* Cart Panel */}
      <div className="cart-panel">
        {/* Order Type */}
        <div className="cart-order-type">
          <p className="cart-section-label pt-1 flex justify-between gap-5">
            Order Type
          </p>

          <div className="cart-type-toggle">
            {Delivery_Options.map((Elm) => (
              <button
                key={Elm.id}
                onClick={() => setDeliveryOpt(Elm.name)}
                className={
                  devliveryOpt === Elm.name
                    ? "cart-type-btn-active"
                    : "cart-type-btn"
                }
              >
                {Elm.icon} {Elm.name}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer name (optional)…"
            className="cart-customer-input"
          />
        </div>

        {/* Cart Items */}
        <div className="cart-items">
          {cartItems?.map((items) => (
            <div
              key={`${items.id}_${items.selectedVar}`}
              className="cart-items-list"
            >
              <div className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-header">
                    <p className="cart-item-name">{items.name}</p>
                    <button
                      onClick={() =>
                        dispatch(
                          removeItem({
                            id: items.id,
                            selectedVar: items.selectedVar,
                          }),
                        )
                      }
                      className="cart-item-remove"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Variant hai to show karo */}
                  {items.selectedVar && (
                    <p className="cart-item-variant">{items.selectedVar}</p>
                  )}

                  <p className="cart-item-price-each">Rs {items.price}</p>
                </div>
                <div className="cart-item-right">
                  <p className="cart-item-total">
                    Rs {items.price * items.quantity}
                  </p>
                  <div className="cart-item-qty">
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuantity({
                            id: items.id,
                            selectedVar: items.selectedVar,
                          }),
                        )
                      }
                      className="cart-qty-btn"
                    >
                      −
                    </button>
                    <span className="cart-qty-value">{items.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          increaseQuantity({
                            id: items.id,
                            selectedVar: items.selectedVar,
                          }),
                        )
                      }
                      className="cart-qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="cart-footer">
          <div className="cart-subtotal-row">
            <span className="cart-subtotal-label">Items</span>
            <span className="cart-subtotal-badge">{cartItems.length}</span>
          </div>

          <div className="cart-discount-row">
            <input
              type="number"
              placeholder="Discount…"
              className="cart-discount-input"
              value={discount || ""}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <p className="cart-discount-select text-center">
              <span>%</span>
            </p>
          </div>

          <div className="text-white font-bold flex justify-between gap-2">
            <h4 className="cart-total-label cart-total-value">Total</h4>
            <span className="cart-total-value">{finalAmount}</span>
          </div>

          <p className="cart-section-label pt-2.5">Payment Method</p>
          <div className="cart-payment-row">
            <button
              onClick={(e) => setCashMethod("Cash")}
              className={
                cashMethod === "Cash"
                  ? "cart-payment-btn-active"
                  : "cart-payment-btn"
              }
            >
              💵 Cash
            </button>
            <button
              onClick={() => setCashMethod("Online")}
              className={
                cashMethod === "Online"
                  ? "cart-payment-btn-active"
                  : "cart-payment-btn"
              }
            >
              📱 Online
            </button>
          </div>

          <div className="cart-actions">
            <button
              onClick={() => dispatch(clearCart())}
              className="cart-clear-btn"
            >
              🗑️ Clear
            </button>
            <button
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
              className="cart-place-btn"
            >
              ✓ Place Order
            </button>
          </div>
        </div>
      </div>
      {receiptModal.isOpen && (
        <ReceiptModal onClose={receiptModal.close} order={currentOrder} />
      )}
    </>
  );
};

export default OrderPanel;
