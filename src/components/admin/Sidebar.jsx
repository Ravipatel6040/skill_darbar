import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoLogoPaypal } from "react-icons/io5";
import {
  MdOutlinePostAdd,
  MdOutlineMail,
  MdDashboard,
  MdChevronLeft,
  MdChevronRight,
  MdPayments ,
} from "react-icons/md";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard className="h-6 w-6" />,
  },
  {
    name: "Add Course",
    path: "/dashboard/add-course",
    icon: <MdOutlinePostAdd className="h-6 w-6" />,
  },
  {
    name: "Course-Enquiry",
    path: "/dashboard/enquiry",
    icon: <MdOutlineMail className="h-6 w-6" />,
  },
  {
    name: "Payment",
    path: "/dashboard/payment",
    icon: <MdPayments className="h-6 w-6" />,
  },
];

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // 🔥 DESKTOP toggle

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-[#F0B100] text-black
        transition-all duration-300 z-40
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${isCollapsed ? "md:w-20" : "md:w-64"}`}
      >
        {/* Desktop Toggle Button */}
        <button
          className="hidden md:flex absolute -right-3 top-6 bg-black text-[#F0B100]
          rounded-full p-1 shadow-lg"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <MdChevronRight size={20} />
          ) : (
            <MdChevronLeft size={20} />
          )}
        </button>

        <nav className="mt-16 px-3 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 font-semibold
                transition-all duration-200
                ${
                  isActive
                    ? "bg-black text-[#F0B100]"
                    : "text-black/80 hover:bg-black hover:text-[#F0B100]"
                }`
              }
            >
              {item.icon}

              {/* Text hide when collapsed */}
              {!isCollapsed && (
                <span className="whitespace-nowrap">{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;