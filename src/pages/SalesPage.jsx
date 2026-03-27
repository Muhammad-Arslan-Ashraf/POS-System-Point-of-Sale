import React, { useEffect, useState } from "react";
import {
  BREAKDOWN_CONFIG,
  calcBreakDown,
  calcPercentChange,
  calcStats,
  formatItems,
  getTodayKey,
  getTodayOrders,
  getYesterdayOrders,
} from "../utils/salesHelper";
import ChangeBadge from "../ui/ChangeBadge";

const SalesPage = () => {
  const [orders, setOrders] = useState([]);
  const [today, setToday] = useState(getTodayKey());
  const { totalRevenu, totalOrders, avgOrders } = calcStats(orders);
  const breakdown = calcBreakDown(orders);

  useEffect(() => {
    const updateOrders = () => {
      const newDate = getTodayKey();
      if (newDate !== today) setToday(newDate);
      setOrders(getTodayOrders());
    };
    updateOrders();
    const interval = setInterval(updateOrders, 60000);
    return () => clearInterval(interval);
  }, [today]);

  const yesterdayOrders = getYesterdayOrders();
  const {
    totalRevenu: yesterdayRevenue,
    totalOrders: yesterdayOrders2,
    avgOrders: yesterdayAvg,
  } = calcStats(yesterdayOrders);

  const revenueChange = calcPercentChange(totalRevenu, yesterdayRevenue);
  const ordersChange = calcPercentChange(totalOrders, yesterdayOrders2);
  const avgChange = calcPercentChange(avgOrders, yesterdayAvg);

  return (
    <>
      <div className="sales-page">
        {/* Header */}
        <div className="sales-page-header">
          <div>
            <h1 className="sales-page-title">Sales Overview</h1>
            <p className="sales-page-subtitle">{today}</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="sales-stat-grid">
          <div className="sales-stat-card">
            <div className="sales-stat-card-top">
              <div className="sales-stat-icon-green">💰</div>
              <span className="sales-stat-badge-green">Live</span>
            </div>
            <p className="sales-stat-label">Today's Revenue</p>
            <p className="sales-stat-value">Rs {totalRevenu}</p>
            <ChangeBadge pct={revenueChange} />
          </div>
          <div className="sales-stat-card">
            <div className="sales-stat-card-top">
              <div className="sales-stat-icon-indigo">📦</div>
              <span className="sales-stat-badge-indigo">Today</span>
            </div>
            <p className="sales-stat-label">Total Orders</p>
            <p className="sales-stat-value">{totalOrders}</p>
            <ChangeBadge pct={ordersChange} />
          </div>
          <div className="sales-stat-card">
            <div className="sales-stat-card-top">
              <div className="sales-stat-icon-purple">📈</div>
              <span className="sales-stat-badge-purple">Avg</span>
            </div>
            <p className="sales-stat-label">Avg. Order Value</p>
            <p className="sales-stat-value">Rs {avgOrders}</p>
            <ChangeBadge pct={avgChange} />
          </div>
        </div>

        {/* Orders Table */}
        <div className="sales-table-card">
          <div className="sales-table-header">
            <h3 className="sales-table-title">Recent Orders</h3>
            <span className="sales-table-count">{totalOrders}</span>
          </div>

          <div className="overflow-x-auto max-h-[500px] scrollbar-thin">
            {orders.length === 0 ? (
              <p className="text-center text-slate-400 py-8 text-sm">
                No orders yet.
              </p>
            ) : (
              <table className="sales-table min-w-[900px]">
                <thead>
                  <tr>
                    {[
                      "Order #",
                      "Customer",
                      "Cashier",
                      "Type",
                      "Items",
                      "Total",
                      "Payment",
                      "Time",
                    ].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="sales-table-row">
                      <td className="sales-table-order-num">
                        #{o.orderNumber}
                      </td>
                      <td className="sales-table-customer">{o.customerName}</td>
                      <td className="sales-table-customer">{o.cashier}</td>
                      <td className="sales-table-type">
                        <span className="sales-table-type-badge">
                          {o.deliveryType}
                        </span>
                      </td>
                      <td className="sales-table-items">
                        {formatItems(o.items)}
                      </td>
                      <td className="sales-table-total">Rs {o.totalAmount}</td>
                      <td className="sales-table-pay">{o.paymentMethod}</td>
                      <td className="sales-table-time">{o.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {/* Report Button */}
        <button className="sales-report-btn mt-8">
          <div className="sales-report-btn-left">
            <div className="sales-report-btn-icon">📊</div>
            <div className="text-left">
              <p className="sales-report-btn-title">Order Type Report</p>
              <p className="sales-report-btn-sub">
                Dine In · Takeaway · Delivery breakdown
              </p>
            </div>
          </div>
        </button>

        {/* Breakdown Panel */}
        <div className="sales-breakdown-panel">
          <div className="sales-breakdown-header">
            <h3 className="sales-breakdown-title">Order Type Breakdown</h3>
            <span className="sales-breakdown-badge">{today}</span>
          </div>
          <div className="sales-breakdown-grid">
            {breakdown.map((b) => {
              const cfg = BREAKDOWN_CONFIG[b.type];
              return (
                <div key={b.type} className={cfg.cardClass}>
                  <div className="text-2xl mb-2">{cfg.icon}</div>
                  <p className={cfg.labelClass}>{b.type}</p>
                  <p className="sales-breakdown-card-num">{b.count}</p>
                  <p className="sales-breakdown-card-orders">orders</p>
                  <p className="sales-breakdown-card-revenue">
                    Rs {b.revenue.toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Progress Bars */}
          <div className="sales-progress-wrap">
            {breakdown.map((b) => {
              const cfg = BREAKDOWN_CONFIG[b.type];
              const pct =
                totalOrders > 0 ? Math.round((b.count / totalOrders) * 100) : 0;
              return (
                <div key={b.type}>
                  <div
                    className="flex justify-between text-[11px] font-semibold mb-1"
                    style={{ color: cfg.color }}
                  >
                    <span>
                      {cfg.icon} {b.type}
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <div className="sales-progress-track">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg,${cfg.from},${cfg.to})`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesPage;
