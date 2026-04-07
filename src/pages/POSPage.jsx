import OrderPanel from "../components/OrderPanel";
import ItemCard from "../components/ItemCards/ItemCard";
import ItemCardVarients from "../components/ItemCards/ItemCardVarients";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { addToCart } from "../redux/addToCart";

const POSPage = () => {
  const [searchName, setSearchName] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = useSelector((state) => state.categories.categories);

  const dispatch = useDispatch();

  const totalcat = categories.flatMap((cat) => cat.items).length;

  const filterName = useMemo(() => {
    return categories
      .filter((cat) => selectedCat === "All" || cat.name === selectedCat)
      .flatMap((f) => f.items)
      .filter((s) => s.name.toLowerCase().includes(searchName.toLowerCase()));
  }, [searchName, selectedCat, categories]);
  console.log(filterName);
  return (
    <div
      className="fixed
                  top-(--spacing-header)
                  bottom-(--spacing-footer)
                  left-(--spacing-sidebar)
                  right-0
                  flex"
    >
      {/* Left — Menu Catalog */}
      <div className="menu-wrapper">
        <div className="menu-container">
          {/* Section header */}
          <div className="menu-header">
            <div>
              <h2 className="menu-header-title">Menu Catalog</h2>
              <p className="menu-header-count">{totalcat} items</p>
            </div>
            {/* Search */}
            <div className="header-search bg-slate-700 p-2.5 w-60 ">
              <svg
                className="h-4 w-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
                type="text"
                placeholder="Search items..."
              />
            </div>
          </div>

          {/* Category Pills — header ky andar */}
          <div className="flex items-center gap-2 px-5 pb-3 flex-wrap shrink-0">
            <button
              onClick={() => setSelectedCat("All")}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all
    ${
      selectedCat === "All"
        ? "bg-indigo-500 text-white border-indigo-500"
        : "border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600"
    }`}
            >
              All
            </button>
            {categories
              .filter((i) => i.items.length > 0)
              .map((item) => (
                <button
                  onClick={() => setSelectedCat(item.name)}
                  key={item.id}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all
        ${
          selectedCat === item.name
            ? "bg-indigo-500 text-white border-indigo-500"
            : "border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600"
        }`}
                >
                  {item.icon} {item.name}
                </button>
              ))}
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-5 scrollbar-thin">
            <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(155px,1fr))]">
              {filterName.length > 0 ? (
                filterName.map((item) =>
                  item.variationType === "single" ? (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onAdd={(data) => dispatch(addToCart(data))}
                    />
                  ) : (
                    <ItemCardVarients
                      key={item.id}
                      item={item}
                      onAdd={(data) => dispatch(addToCart(data))}
                    />
                  ),
                )
              ) : (
                /* Yahan ':' ka hona zaroori hai jo 'else' ka kaam karta hai */
                <div className="col-span-full text-center py-10 text-slate-400">
                  {searchName.trim() !== "" ? (
                    <p>No items found matching "{searchName}"</p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-slate-500">
                        No items in this catalog yet.
                      </p>
                      <p className="text-sm">
                        Please go to{" "}
                        <span className="text-indigo-500 font-bold italic">
                          Categories
                        </span>
                        to add new items.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right — Order Panel */}
      <OrderPanel />
    </div>
  );
};

export default POSPage;
