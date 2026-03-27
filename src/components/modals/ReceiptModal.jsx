import React from "react";

const ReceiptModal = ({ onClose, order }) => {
  const handlePrint = () => {
    window.print();
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[1000] flex items-center justify-center p-5"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl w-full shadow-2xl overflow-hidden"
          style={{ maxWidth: 384 }}
        >
          {/* Header — no-print */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ background: "linear-gradient(135deg,#1e1b4b,#1e293b)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-base"
                style={{ background: "rgba(99,102,241,0.3)" }}
              >
                🧾
              </div>
              <span className="text-white font-bold text-sm">
                Receipt Ready
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90"
                style={{ background: "#6366f1" }}
              >
                🖨️ Print
              </button>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white text-xl leading-none"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Receipt Body — print-area */}
          <div className="p-5 font-mono text-xs print-area">
            <div
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: 800,
                marginBottom: 2,
                color: "#1e293b",
              }}
            >
              🍔 Malik Burger Point
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: 10,
                color: "#94a3b8",
                marginBottom: 10,
                letterSpacing: 2,
              }}
            >
              POINT OF SALE
            </div>
            <hr
              style={{
                border: "none",
                borderTop: "1px dashed #cbd5e1",
                marginBottom: 8,
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                marginBottom: 3,
              }}
            >
              <b>#{order.orderNumber}</b>
              <span>{order.time}</span>
            </div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>
              📅 {order.date}
            </div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>
              👨‍💼 Cashier: {order.cashier}
            </div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>
              👤 {order.customerName}
            </div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>
              {order.deliveryType} | {order.paymentMethod}
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "1px dashed #cbd5e1",
                marginBottom: 8,
              }}
            />

            <table
              style={{
                width: "100%",
                fontSize: 11,
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "3px 0",
                      color: "#94a3b8",
                    }}
                  >
                    Item
                  </th>
                  <th style={{ textAlign: "center", color: "#94a3b8" }}>Qty</th>
                  <th style={{ textAlign: "right", color: "#94a3b8" }}>
                    Amount
                  </th>
                </tr>
              </thead>
              {order.items.map((i) => (
                <tbody key={i.id}>
                  <tr>
                    <td style={{ padding: "4px 0" }}>
                      {i.name} {i.selectedVar && `(${i.selectedVar})`}
                    </td>
                    <td style={{ textAlign: "center" }}>{i.quantity}</td>
                    <td style={{ textAlign: "right", fontWeight: 700 }}>
                      Rs {i.total}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>

            <hr
              style={{
                border: "none",
                borderTop: "1px dashed #cbd5e1",
                margin: "10px 0 8px",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                marginBottom: 3,
                color: "#64748b",
              }}
            >
              <span>Subtotal</span>
              <span>Rs {order.subtotal}</span>
            </div>

            {/* Discount */}
            {order.disCountAmount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  marginBottom: 3,
                  color: "#ef4444",
                }}
              >
                <span>Discount</span>
                <span>- Rs {order.disCountAmount}</span>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 16,
                fontWeight: 800,
                color: "#1e293b",
                borderTop: "2px solid #1e293b",
                paddingTop: 6,
                marginTop: 4,
              }}
            >
              <span>TOTAL</span>
              <span>Rs {order.totalAmount}</span>
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "1px dashed #cbd5e1",
                marginTop: 12,
                marginBottom: 8,
              }}
            />

            <div
              style={{
                textAlign: "center",
                fontSize: 11,
                color: "#94a3b8",
                marginTop: 4,
              }}
            >
              Shukriya! Dobara tashreef lain 😊
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: 10,
                color: "#cbd5e1",
                marginTop: 6,
              }}
            >
              Developed by M Arslan
            </div>
            <div
              style={{ textAlign: "center", fontSize: 10, color: "#cbd5e1" }}
            >
              arslanashraf185@gmail.com
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptModal;
