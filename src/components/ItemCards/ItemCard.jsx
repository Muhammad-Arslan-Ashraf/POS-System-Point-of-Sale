import React from "react";

const ItemCard = ({ item, onAdd }) => {
  return (
    <>
      <div
        onClick={() => onAdd(item)}
        className="bg-white rounded-2xl p-3 border border-slate-100 hover:shadow-lg hover:border-indigo-200 hover:-translate-y-0.5 transition-all cursor-pointer"
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
            <span>🍔</span> // default emoji — ya category ka icon pass karo
          )}
        </div>

        {/* Name + Price */}
        <p className="text-xs font-bold text-slate-700 truncate leading-snug mt-3.5">
          {item.name}
        </p>
        <p className="text-[11px] font-bold text-indigo-600 mt-6">
          Rs {item.price}
        </p>
      </div>
    </>
  );
};

export default ItemCard;
