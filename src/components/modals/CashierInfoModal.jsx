import React, { useState } from "react";

const CashierInfoModal = ({ cashier, onClose, onSave }) => {
  const [name, setName] = useState(cashier.name);
  const [shift, setShift] = useState(cashier.shift);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name, shift });
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-box">
          <div className="modal-header">
            <h3 className="modal-title">Cashier Info</h3>
            <button onClick={onClose} className="modal-close-btn">
              ✕
            </button>
          </div>
          <div className="modal-body">
            <div>
              <label className="modal-label">Cashier Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="modal-input"
              />
            </div>
            <div>
              <label className="modal-label">Shift</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="modal-select"
              >
                <option>Morning Shift</option>
                <option>Evening Shift</option>
                <option>Night Shift</option>
              </select>
            </div>
            <div className="modal-footer">
              <button onClick={onClose} className="modal-cancel-btn">
                Cancel
              </button>
              <button onClick={handleSave} className="modal-save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashierInfoModal;
