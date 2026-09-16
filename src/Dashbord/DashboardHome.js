import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faClock,
  faSpinner,
  faCircleCheck,
  faDollarSign,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import "./DashbordHome.css";
import useAnalytics from "./hooks/useAnalytics";

export default function DashboardHome() {
  const { analytics, loading, error, getDashboardAnalytics } = useAnalytics();

  // =========================================================
  // GET DASHBOARD ANALYTICS
  // =========================================================
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getDashboardAnalytics();
      } catch (err) {
        console.error("Failed to fetch dashboard analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

  // =========================================================
  // API DATA
  // =========================================================

  const summary = analytics?.summary || {};

  const salesOverview = analytics?.sales_overview || {};

  const orderStatusDistribution = analytics?.order_status_distribution || {};

  // =========================================================
  // SUMMARY
  // =========================================================

  const totalOrders = Number(summary.total_orders || 0);

  const pendingOrders = Number(summary.pending_orders || 0);

  const preparingOrders = Number(summary.preparing_orders || 0);

  const completedOrders = Number(summary.completed_orders || 0);

  // =========================================================
  // SALES
  // =========================================================

  const currency = salesOverview.currency || "USD";

  const todayRevenue = Number(salesOverview.today_revenue || 0);

  const percentageChange = Number(salesOverview.percentage_change || 0);

  const comparisonText =
    salesOverview.comparison_text ||
    `${percentageChange >= 0 ? "+" : ""}${percentageChange}% compared to yesterday`;

  // =========================================================
  // ORDER STATUS DISTRIBUTION
  // =========================================================

  const distributionPending = Number(orderStatusDistribution.pending || 0);

  const distributionPreparing = Number(orderStatusDistribution.preparing || 0);

  const distributionCompleted = Number(orderStatusDistribution.completed || 0);

  const distributionTotal = Number(orderStatusDistribution.total_orders || 0);

  // =========================================================
  // DAILY SALES CHART
  // =========================================================

  const dailySalesChart = Array.isArray(salesOverview.daily_sales_chart)
    ? salesOverview.daily_sales_chart
    : [];

  const chartValues = dailySalesChart.map((item) => Number(item?.revenue || 0));

  const maxChartValue = Math.max(...chartValues, 1);

  // =========================================================
  // STATISTICS
  // =========================================================

  const statistics = [
    {
      title: "Total Orders",
      value: totalOrders,
      subtitle: "Orders today",
      icon: faClipboardList,
      className: "orders",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      subtitle: "Waiting for action",
      icon: faClock,
      className: "pending",
    },
    {
      title: "Preparing",
      value: preparingOrders,
      subtitle: "Currently preparing",
      icon: faSpinner,
      className: "preparing",
    },
    {
      title: "Completed",
      value: completedOrders,
      subtitle: "Completed today",
      icon: faCircleCheck,
      className: "completed",
    },
  ];

  // =========================================================
  // LOADING
  // =========================================================

  if (loading && !analytics) {
    return (
      <div className="dashboard-home">
        <div className="dashboard-home-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back to your IceCreamMixat dashboard.</p>
          </div>

          <div className="dashboard-home-date">Today</div>
        </div>

        <div
          style={{
            minHeight: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
          }}
        >
          Loading dashboard analytics...
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-home">
      {/* ================= HEADER ================= */}

      <div className="dashboard-home-header">
        <div>
          <h1>Dashboard</h1>

          <p>Welcome back to your IceCreamMixat dashboard.</p>
        </div>

        <div className="dashboard-home-date">Today</div>
      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div
          style={{
            marginBottom: "20px",
            padding: "14px 18px",
            borderRadius: "10px",
            background: "#fff1f0",
            color: "#e53935",
            fontWeight: 600,
          }}
        >
          Failed to load dashboard analytics.
        </div>
      )}

      {/* ================= STATISTICS ================= */}

      <section className="dashboard-stats-grid">
        {statistics.map((stat) => (
          <div
            key={stat.title}
            className={`dashboard-stat-card ${stat.className}`}
          >
            <div className="dashboard-stat-top">
              <div className="dashboard-stat-icon">
                <FontAwesomeIcon icon={stat.icon} />
              </div>

              <span className="dashboard-stat-label">{stat.title}</span>
            </div>

            <div className="dashboard-stat-value">{stat.value}</div>

            <div className="dashboard-stat-subtitle">{stat.subtitle}</div>
          </div>
        ))}
      </section>

      {/* ================= BOTTOM OVERVIEW ================= */}

      <section className="dashboard-overview-grid">
        {/* ================= SALES OVERVIEW ================= */}

        <div className="dashboard-overview-card">
          <div className="dashboard-overview-header">
            <div>
              <h3>Sales Overview</h3>

              <p>Today's performance</p>
            </div>

            <div className="dashboard-overview-icon">
              <FontAwesomeIcon icon={faDollarSign} />
            </div>
          </div>

          <div className="dashboard-sales-number">
            {currency} {todayRevenue.toFixed(2)}
          </div>

          <div className="dashboard-sales-growth">
            <span>
              {percentageChange >= 0 ? "+" : ""}
              {percentageChange.toFixed(1)}%
            </span>

            <p>{comparisonText}</p>
          </div>

          <div className="dashboard-mini-chart">
            {dailySalesChart.map((item, index) => {
              const revenue = Number(item?.revenue || 0);

              const height = Math.max(8, (revenue / maxChartValue) * 100);

              return (
                <div
                  key={item?.date || index}
                  style={{
                    height: `${height}%`,
                  }}
                  title={`${item?.day || ""}: ${currency} ${revenue.toFixed(2)}`}
                />
              );
            })}
          </div>
        </div>

        {/* ================= ORDER STATUS ================= */}

        <div className="dashboard-overview-card">
          <div className="dashboard-overview-header">
            <div>
              <h3>Order Status</h3>

              <p>Current orders distribution</p>
            </div>

            <div className="dashboard-overview-icon">
              <FontAwesomeIcon icon={faUtensils} />
            </div>
          </div>

          <div className="dashboard-status-list">
            <div className="dashboard-status-row">
              <div>
                <span className="status-dot pending-dot" />
                Pending
              </div>

              <strong>{distributionPending}</strong>
            </div>

            <div className="dashboard-status-row">
              <div>
                <span className="status-dot preparing-dot" />
                Preparing
              </div>

              <strong>{distributionPreparing}</strong>
            </div>

            <div className="dashboard-status-row">
              <div>
                <span className="status-dot completed-dot" />
                Completed
              </div>

              <strong>{distributionCompleted}</strong>
            </div>
          </div>

          <div className="dashboard-status-total">
            <span>Total orders</span>

            <strong>{distributionTotal}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
