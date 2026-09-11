import { useState } from "react";
import { Outlet } from "react-router-dom";

import HeaderDashbord from "./Components/Header";
import Sidebar from "./Components/Sidebar";

import "./DashboardLayout.css";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboardPage" dir="ltr">
      <HeaderDashbord onMenuClick={() => setSidebarOpen(true)} />

      <div className="dashboard-body">
        <Sidebar show={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
