import React, { useState } from "react";
import CategoryModal from "../components/modals/CategoryModal";
import { DEFAULT_CATEGORIES } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCard,
  deleteCategory,
  editCategory,
} from "../redux/categorySlice";
import ItemsModal from "../components/modals/ItemsModal";
import useModal from "../hooks/useModal";

const CategoryPage = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  const addCatModal = useModal();
  const editModal = useModal();
  const itemModal = useModal();
  const editItem = useModal();

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <>
      <div className="cat-page">
        <div className="cat-page-header">
          <div>
            <h1 className="cat-page-title">Categories &amp; Items</h1>
            <p className="cat-page-subtitle">
              Manage your menu categories and items
            </p>
          </div>
          <button onClick={() => addCatModal.open()} className="cat-add-btn">
            + Add Category
          </button>
        </div>

        <div className="space-y-4">
          {categories.map((Elm) => (
            <div key={Elm.id} className="cat-card">
              <div className="cat-card-header">
                <div className="cat-card-header-left">
                  <div className="cat-card-icon">{Elm.icon}</div>
                  <span className="cat-card-name">{Elm.name}</span>
                  <span className="cat-card-count">
                    {Elm.items.length} items
                  </span>
                </div>
                <div className="cat-card-header-right">
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(Elm.id)}
                    className="cat-delete-btn"
                  >
                    <svg
                      width={14}
                      height={14}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                    Delete
                  </button>
                  <button
                    onClick={() => editModal.open(Elm)}
                    className="cat-edit-btn"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => itemModal.open(Elm)}
                    className="cat-item-add-btn"
                  >
                    + Item
                  </button>
                </div>
              </div>

              <div className="cat-card-body">
                {Elm.items.length === 0 ? (
                  // Items-empty
                  <p className="cat-card-empty">
                    No items found — click '+ Item' above to add one.
                  </p>
                ) : (
                  // if item use map
                  Elm.items.map((item) => (
                    <div key={item.id} className="cat-item-thumb">
                      {/*img*/}
                      <div className="cat-item-thumb-img">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          item.icon || "🍔"
                        )}
                      </div>

                      <p className="cat-item-thumb-name">{item.name}</p>

                      {/* variations */}
                      <p className="cat-item-thumb-price">
                        {item.variationType === "single" && `Rs ${item.price}`}
                        {item.variationType === "size" &&
                          `Rs ${item.sizes?.[0]?.price}+`}
                        {item.variationType === "custom" &&
                          `Rs ${item.variants?.[0]?.price}+`}
                      </p>

                      <button
                        onClick={() => editItem.open(item)}
                        className="cat-item-thumb-edit"
                      >
                        edit
                      </button>
                      <div className="py-2">
                        {" "}
                        <button
                          onClick={() => dispatch(deleteCard(item.id))}
                          className="cat-item-thumb-del px-3.5 w-24"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* add cat.... */}
      {addCatModal.isOpen && (
        <CategoryModal
          onClose={addCatModal.close}
          onSave={(data) => {
            dispatch(addCategory(data));
            addCatModal.close();
          }}
        />
      )}
      {/* edit cat... */}
      {editModal.isOpen && (
        <CategoryModal
          onClose={editModal.close}
          category={editModal.data}
          onSave={(data) => {
            dispatch(editCategory({ ...data, id: editModal.data.id }));
            editModal.close();
          }}
        />
      )}
      {itemModal.isOpen && (
        <ItemsModal onClose={itemModal.close} category={itemModal.data} />
      )}
      {editItem.isOpen && (
        <ItemsModal onClose={editItem.close} itemData={editItem.data} />
      )}
    </>
  );
};

export default CategoryPage;
