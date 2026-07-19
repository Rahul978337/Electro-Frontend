import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get("https://electro-backend-m418.onrender.com/api/dashboard-stats");
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Customers",
      value: stats?.totalCustomers ?? 0,
      icon: "fas fa-users",
      bg: "bg-info",
    },
    {
      label: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: "fas fa-box",
      bg: "bg-success",
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders ?? 0,
      icon: "fas fa-shopping-cart",
      bg: "bg-warning",
    },
    {
      label: "Total Revenue",
      value: stats
        ? `₹${Number(stats.totalRevenue).toLocaleString("en-IN")}`
        : "₹0",
      icon: "fas fa-rupee-sign",
      bg: "bg-danger",
    },
    {
      label: "Total Categories",
      value: stats?.totalCategories ?? 0,
      icon: "fas fa-list",
      bg: "bg-purple",
      style: { backgroundColor: "#6f42c1" },
    },
  ];

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        {/* Page Header */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active">Home</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="content">
          <div className="container-fluid">

            {/* ── Stats Cards ── */}
            <div className="row">
              {cards.map((card, i) => (
                <div key={i} className="col-lg-3 col-6">
                  <div className="small-box" style={card.style || {}}>
                    <div
                      className={`small-box ${card.bg}`}
                      style={card.style || {}}
                    >
                      <div className="inner">
                        {loading ? (
                          <h3>—</h3>
                        ) : (
                          <h3>{card.value}</h3>
                        )}
                        <p>{card.label}</p>
                      </div>
                      <div className="icon">
                        <i className={card.icon} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* /.row stats cards */}

          </div>
        </div>
        {/* /.content */}
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;