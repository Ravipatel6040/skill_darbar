import Sidebar from "../components/admin/Sidebar";
import LogoutButton from "../components/admin/LogoutButton";
import { Outlet, useLocation } from "react-router-dom";
import DashboardCard from "../components/admin/DashboardCard";

const Dashboard = () => {
  const location = useLocation();
  const isDashboardHome = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="p-6 overflow-y-auto md:ml-64">
        
        {/* Top Bar (Logout only) */}
        <div className="flex justify-end mb-4">
          <LogoutButton />
        </div>

        {isDashboardHome ? (
          <>
          
            <DashboardCard />
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
