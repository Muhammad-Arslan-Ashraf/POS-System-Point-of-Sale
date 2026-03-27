import React, { useState } from "react";
import CashierInfoModal from "../modals/CashierInfoModal";
import { useSelector } from "react-redux";

const Header = () => {
  const [cashier, setCashier] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("cashier")) || {
        name: "M Ali raza",
        shift: "Morning Shift",
      }
    );
  });
  const [showModal, setShowModal] = useState(false);
  const handleSave = (upadated) => {
    setCashier(upadated);
    localStorage.setItem("cashier", JSON.stringify(upadated));
    setShowModal(false);
  };
  const selector = useSelector((state) => state.shared.navData);
  return (
    <>
      <header className="header">
        {/* Brand */}
        <div className="header-brand">
          <div className="header-brand-logo">🍔</div>
          <div>
            <p className="header-brand-name">Malik Burge Point</p>
            <p className="header-brand-sub">POINT OF SALE</p>
          </div>
        </div>

        {/* Page Badge */}
        <div className="header-badge-wrap">
          <button className="header-badge">{selector}</button>
        </div>

        {/* Cashier */}
        <div className="header-cashier">
          <div className="header-cashier-avatar">
            {cashier?.name?.charAt(0)}
          </div>
          <div>
            <p className="header-cashier-name">{cashier.name}</p>
            <p className="header-cashier-shift">{cashier.shift}</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="header-cashier-edit-btn"
          >
            <svg
              className="w-3 h-3 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </header>
      {showModal && (
        <CashierInfoModal
          cashier={cashier}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default Header;
