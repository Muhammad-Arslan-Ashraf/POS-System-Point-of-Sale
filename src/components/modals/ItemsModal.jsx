import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useImageUpload from "../../hooks/useImageUpload";
import { useForm } from "react-hook-form";
import { addItem, editItem } from "../../redux/categorySlice";

const SIZE_OPTIONS = ["Small", "Medium", "Large", "ExtraLarge"];
const ItemsModal = ({ onClose, category, itemData }) => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const [variation, setVariation] = useState(
    itemData?.variationType || "single",
  );

  const {
    base64,
    fileInputRef,
    handleFileChange,
    handleRemove,
    openFilePicker,
  } = useImageUpload();

  // react Hook Form
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemName: itemData?.name || "",
      category:
        itemData?.category || category?.name || categories[0]?.name || "",
      price: itemData?.price || "",
      small: itemData?.sizes?.find((s) => s.name === "Small")?.price || "",
      medium: itemData?.sizes?.find((s) => s.name === "Medium")?.price || "",
      large: itemData?.sizes?.find((s) => s.name === "Large")?.price || "",
      extralarge:
        itemData?.sizes?.find((s) => s.name === "Extra Large")?.price || "",
      variantName: itemData?.variants?.[0]?.name || "",
      variantPrice: itemData?.variants?.[0]?.price || "",
    },
  });

  const onSubmit = (data) => {
    const newItem = {
      id: itemData?.id || Date.now(),
      name: data.itemName,
      image: base64 || itemData?.image || "",
      category: data.category,
      variationType: variation,
    };

    if (variation === "single") {
      newItem.price = Number(data.price);
    }

    if (variation === "size") {
      newItem.sizes = [
        { name: "Small", price: Number(data.small) },
        { name: "Medium", price: Number(data.medium) },
        { name: "Large", price: Number(data.large) },
        { name: "Extra Large", price: Number(data.extralarge) },
      ].filter((size) => size.price);
    }

    if (variation === "custom") {
      newItem.variants = [
        {
          name: data.variantName,
          price: Number(data.variantPrice),
        },
      ];
    }

    if (itemData) {
      dispatch(
        editItem({
          category: data.category,
          itemId: itemData.id,
          updateItem: newItem,
        }),
      );
    } else {
      dispatch(
        addItem({
          category: data.category,
          item: newItem,
        }),
      );
    }
    console.log("Clean Item Object:", newItem);
    reset();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-sticky">
          <h3 className="modal-title">Add Item</h3>
          <button type="button" onClick={onClose} className="modal-close-btn">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
          <div>
            <label className="modal-label">Item Image</label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {base64 ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200">
                <img
                  src={base64}
                  alt="base64"
                  className="w-full h-36 object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center hover:opacity-90"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openFilePicker}
                className="modal-upload w-full text-left"
              >
                <span className="modal-upload-text">
                  📷 Click to upload image
                </span>
              </button>
            )}
          </div>

          <div className="modal-grid-2">
            <div>
              <label className="modal-label">Item Name</label>
              <input
                {...register("itemName", { required: "Item name is required" })}
                placeholder="e.g. Zinger Burger"
                className={`modal-input flex-1 ${errors.itemName ? "border-red-500" : ""}`}
              />
              {errors.itemName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.itemName.message}
                </p>
              )}
            </div>

            <div>
              <label className="modal-label">Category</label>
              <select
                {...register("category", { required: "category is required" })}
                className="modal-input"
              >
                {categories.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.icon} {item.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="modal-label">Has Variations?</label>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setVariation("single")}
                className={
                  variation === "single"
                    ? "modal-variation-btn-active"
                    : "modal-variation-btn"
                }
              >
                Single Price
              </button>

              <button
                type="button"
                onClick={() => setVariation("size")}
                className={
                  variation === "size"
                    ? "modal-variation-btn-active"
                    : "modal-variation-btn"
                }
              >
                Size (S/M/L/XL)
              </button>

              <button
                type="button"
                onClick={() => setVariation("custom")}
                className={
                  variation === "custom"
                    ? "modal-variation-btn-active"
                    : "modal-variation-btn"
                }
              >
                Custom
              </button>
            </div>
          </div>

          {variation === "single" && (
            <div>
              <label className="modal-label">Price (Rs)</label>
              <input
                {...register("price", { required: "Please enter a price" })}
                type="number"
                placeholder="e.g. 280"
                className={`modal-input flex-1 ${errors.price ? "border-red-500" : ""}`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          )}

          {variation === "size" && (
            <div className="space-y-2">
              <label className="modal-label">Size Prices</label>
              {SIZE_OPTIONS.map((size) => (
                <div key={size} className="modal-size-row">
                  <span className="modal-size-label">{size}</span>
                  <input
                    {...register(size.toLowerCase(), {
                      validate: () =>
                        getValues(
                          SIZE_OPTIONS.map((s) => s.toLowerCase()),
                        ).some((v) => v && v > 0) ||
                        "At least one price is required",
                    })}
                    type="number"
                    placeholder="Price (Rs)"
                    className={`modal-input ${
                      errors[size.toLowerCase()]
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                </div>
              ))}
              {SIZE_OPTIONS.some((s) => errors[s.toLowerCase()]) && (
                <p className="text-red-500 text-sm mt-1">
                  At least one price is required.
                </p>
              )}
            </div>
          )}

          {variation === "custom" && (
            <div>
              <label className="modal-label">Custom Variant</label>
              <div className="modal-custom-row">
                <input
                  {...register("variantName", {
                    required:
                      variation === "custom"
                        ? "Variant name cannot be empty"
                        : false,
                  })}
                  placeholder="Variant name"
                  className={`modal-input flex-1 ${errors.variantName ? "border-red-500" : ""}`}
                />
                <input
                  {...register("variantPrice", {
                    required:
                      variation === "custom" ? "Price is mandatory" : false,
                  })}
                  type="number"
                  placeholder="Price"
                  className={`modal-input flex-1 ${errors.variantPrice ? "border-red-500" : ""}`}
                />
              </div>
              <div className="flex justify-between items-center">
                {errors.variantName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.variantName.message}
                  </p>
                )}

                {errors.variantPrice && (
                  <p className="text-red-500 text-sm mt-1  ">
                    {errors.variantPrice.message}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="modal-cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="modal-save-btn">
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemsModal;
