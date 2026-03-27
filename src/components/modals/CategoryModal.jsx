import React, { useState } from "react";

const CategoryModal = ({ onClose, onSave, category }) => {
  const [name, setName] = useState(category?.name || "");
  const [icon, setIcon] = useState(category?.icom || "");

  // handleSave
  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name, icon });
    onClose();
  };
  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">{category ? "Edit" : "Add Cat"}</h3>
            <button onClick={onClose} className="modal-close-btn">
              ✕
            </button>
          </div>
          <div className="modal-body">
            <div>
              <label className="modal-label">Category Name</label>
              <input
                placeholder="e.g. Burgers, Pizza"
                className="modal-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="modal-label">Emoji / Icon</label>
              <input
                onChange={(e) => setIcon(e.target.value)}
                placeholder="🍔"
                maxLength={4}
                className="modal-input"
              />
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

export default CategoryModal;
