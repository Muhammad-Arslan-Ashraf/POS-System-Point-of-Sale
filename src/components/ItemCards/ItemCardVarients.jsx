import React, { useState } from "react";

const ItemCardVarients = ({ item, onAdd }) => {
  const [selected, setSelected] = useState(null);
  const priceLabel = () => {
    const prices =
      item.variationType === "size"
        ? item.sizes?.map((s) => s.price)
        : item.variants?.map((v) => v.price);

    if (!prices?.length) return "";

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `Rs ${min}` : `Rs ${min} – ${max}`;
  };
  return (
    <>
      <div
        className="bg-white rounded-2xl p-3 border border-slate-100 hover:shadow-lg hover:border-indigo-200 transition-all"
        style={{ cursor: "default" }}
      >
        {/* Image placeholder */}
        <div
          className="w-full rounded-xl flex items-center justify-center text-3xl"
          style={{
            height: 100,
            background: "linear-gradient(135deg,#f1f5f9,#e2e8f0)",
          }}
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <span>{item.icon || "🍕"}</span>
          )}
        </div>

        {/* Name + Price range */}
        <p className="text-xs font-bold text-slate-700 truncate leading-snug mt-2">
          {item.name}
        </p>
        <p className="text-[11px] font-bold text-indigo-600 mt-0.5">
          {priceLabel()}
        </p>

        {/* Size buttons */}
        {item.variationType === "size" && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.sizes?.map((size) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(size.name);
                  const itemVar = {
                    id: item.id,
                    name: item.name,
                    selectedVar: size.name,
                    price: size.price,
                  };
                  onAdd(itemVar);
                }}
                key={size.name}
                className="flex-1 text-[10px] font-bold rounded-lg py-1.5 border border-slate-200 bg-slate-50 text-slate-600 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all leading-none"
                style={{ minWidth: 0 }}
              >
                {size?.name || ""}
              </button>
            ))}
          </div>
        )}
        {item.variationType === "custom" && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.variants?.map((v) => (
              <button
                key={v.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(v.name);
                  const itemVar = {
                    id: item.id,
                    name: item.name,
                    price: v.price,
                    selectedVar: v.name,
                    category: item.category,
                    variationType: item.variationType,
                  };
                  onAdd(itemVar);
                }}
                className="flex-1 text-[10px] font-bold rounded-lg py-1.5 border border-slate-200 bg-slate-50 text-slate-600 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all leading-none"
                style={{ minWidth: 0 }}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ItemCardVarients;
