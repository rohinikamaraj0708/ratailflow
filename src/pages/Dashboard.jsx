import { Link } from "react-router-dom";
import { Plus, PackagePlus } from "lucide-react";
import {
  TrendingUp,
  FileText,
  Package,
  Users,
} from "lucide-react";

import "./Dashboard.css";

export default function Dashboard() {

  const stats = [
    {
      title: "Today's Sales",
      value: "₹45,280",
      change: "+12.5%",
      icon: TrendingUp,
      iconClass: "sales-icon",
    },

    {
      title: "Total invoices",
      value: "127",
      change: "+8.5%",
      icon: FileText,
      iconClass: "invoice-icon",
    },

    {
      title: "Product",
      value: "1,248",
      change: "245",
      icon: Package,
      iconClass: "product-icon",
    },

    {
      title: "Customers",
      value: "892",
      change: "+15",
      icon: Users,
      iconClass: "customer-icon",
    },
  ];

  return (
    <div className="dashboard-wrapper">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your business overview.</p>
      </div>

      {/* CARDS */}
      <div className="stats-grid">

        {stats.map((item, index) => {

          const Icon = item.icon;

          return (
            <div className="stat-card" key={index}>

              <div className="card-top">

                <div className={`icon-wrapper ${item.iconClass}`}>
                  <Icon size={22} />
                </div>

                <span className="badge">
                  {item.change}
                </span>

              </div>

              <h2 className="card-value">
                {item.value}
              </h2>

              <p className="card-label">
                {item.title}
              </p>

            </div>
          );
        })}
      </div>

      {/* CHARTS */}
      <div className="charts-grid">

        {/* Weekly Revenue */}
        <div className="chart-card">

          <h2>Weekly Revenue</h2>

          <div className="area-chart-container">

            <div className="y-axis">
              <span>8000</span>
              <span>6000</span>
              <span>4000</span>
              <span>2000</span>
              <span>0</span>
            </div>

            <div className="chart-area-visual">
              <div className="area-wave-fill"></div>
              <div className="area-wave-line"></div>
            </div>

            <div className="x-axis">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

          </div>
        </div>

        {/* Top Selling */}
        <div className="chart-card">

          <h2>Top Selling Products</h2>

          <div className="bar-chart-container">

            <div className="bar-row">
              <span className="bar-label">Rice</span>

              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            <div className="bar-row">
              <span className="bar-label">Milk</span>

              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>

            <div className="bar-row">
              <span className="bar-label">Bread</span>

              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>

            <div className="bar-row">
              <span className="bar-label">Eggs</span>

              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: "58%" }}
                ></div>
              </div>
            </div>

            <div className="bar-row">
              <span className="bar-label">Sugar</span>

              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: "52%" }}
                ></div>
              </div>
            </div>

            <div className="bar-x-axis">
              <span>0</span>
              <span>65</span>
              <span>130</span>
              <span>195</span>
            </div>

          </div>
        </div>
    {/* QUICK ACTIONS */}
<div className="quick-actions">

  <h2>Quick Actions</h2>

  <div className="quick-grid">

    {/* CREATE INVOICE */}
    <Link to="/billing" className="quick-card">

      <div className="quick-icon green-bg">
        <Plus size={28} />
      </div>

      <div>
        <h3>Create invoice</h3>
        <p>Start new billing</p>
      </div>

    </Link>

    {/* ADD PRODUCT */}
    <Link to="/products" className="quick-card">

      <div className="quick-icon orange-bg">
        <PackagePlus size={28} />
      </div>

      <div>
        <h3>Add product</h3>
        <p>Manage Inventory</p>
      </div>

    </Link>

  </div>
</div>
      </div>
    </div>
  );
}