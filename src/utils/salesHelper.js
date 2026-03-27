// date key
export const getTodayKey = () => new Date().toLocaleDateString("en-PK");

export const getTodayOrders = () => {
  const allOrders = JSON.parse(localStorage.getItem("all_orders")) || [];
  const todayKey = getTodayKey();
  return allOrders.filter((order) => order.date === todayKey);
};

export const calcStats = (orders) => {
  const totalRevenu = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalOrders = orders.length;
  const avgOrders = totalOrders > 0 ? Math.round(totalRevenu / totalOrders) : 0;
  return { totalRevenu, totalOrders, avgOrders };
};
export const calcBreakDown = (orders) => {
  return ["Dine In", "Takeaway", "Delivery"].map((type) => {
    const filtered = orders.filter((o) => o.deliveryType === type);
    return {
      type,
      count: filtered.length,
      revenue: filtered.reduce((acc, o) => acc + o.totalAmount, 0),
    };
  });
};
export const formatItems = (items) =>
  items
    .map(
      (i) =>
        `${i.name}${i.selectedVar ? ` (${i.selectedVar})` : ""} x${i.quantity}`,
    )
    .join(", ");

export const BREAKDOWN_CONFIG = {
  "Dine In": {
    icon: "🍽️",
    cardClass: "sales-breakdown-card-indigo",
    labelClass: "sales-breakdown-card-label-indigo",
    color: "#818cf8",
    from: "#6366f1",
    to: "#818cf8",
  },
  Takeaway: {
    icon: "🥡",
    cardClass: "sales-breakdown-card-green",
    labelClass: "sales-breakdown-card-label-green",
    color: "#34d399",
    from: "#10b981",
    to: "#34d399",
  },
  Delivery: {
    icon: "🛵",
    cardClass: "sales-breakdown-card-yellow",
    labelClass: "sales-breakdown-card-label-yellow",
    color: "#fbbf24",
    from: "#f59e0b",
    to: "#fbbf24",
  },
};

// camparison
export const getYesterdayKey = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toLocaleDateString("en-PK");
};

export const getYesterdayOrders = () => {
  const allOrders = JSON.parse(localStorage.getItem("all_orders")) || [];
  return allOrders.filter((o) => o.date === getYesterdayKey());
};

export const calcPercentChange = (today, yesterday) => {
  if (yesterday === 0) return null;
  const change = ((today - yesterday) / yesterday) * 100;
  const rounded = Math.round(change * 10) / 10;
  return Math.max(-100, Math.min(100, rounded)); // ✅ -100 to +100 ke beech
};
