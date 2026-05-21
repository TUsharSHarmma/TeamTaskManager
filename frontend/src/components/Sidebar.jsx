import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
  FaClipboardList,
  FaSignOutAlt
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const { logout, user } =
    useContext(AuthContext);

  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const [hoveredItem, setHoveredItem] =
    useState(null);

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
      description:
        "Overview & Analytics"
    },

    {
      name: "Projects",
      path: "/projects",
      icon: <FaProjectDiagram />,
      description:
        "Manage all projects"
    },

    {
      name: "Tasks",
      path: "/tasks",
      icon: <FaTasks />,
      description: "Track your tasks"
    },

    ...(user?.role === "Admin"
      ? [
          {
            name: "Team Members",
            path: "/team",
            icon: <FaUsers />,
            description:
              "Manage team members"
          }
        ]
      : [])
  ];

  const handleLogout = async () => {
    await logout();

    window.location.href = "/";
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 bg-gradient-to-b from-gray-900/95 to-slate-900/95 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      } h-screen flex flex-col overflow-y-auto`}
    >
      {/* TOGGLE BUTTON */}

      

      {/* LOGO */}

      <div
        className={`p-7 border-b border-white/10 ${
          isCollapsed ? "px-4" : ""
        }`}
      >
        <Link
          to="/dashboard"
          className="flex items-center gap-3 group"
        >
          <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl transform group-hover:scale-110 transition duration-300">
            <FaClipboardList className="text-white text-xl" />
          </div>

          {!isCollapsed && (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-gray-300 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          )}
        </Link>
      </div>

      {/* USER PROFILE */}

      <div className="px-4 py-6 border-b border-white/10">
        <div
          className={`flex items-center ${
            isCollapsed
              ? "justify-center"
              : "gap-4"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
            {user?.name?.charAt(0) || "U"}
          </div>

          {!isCollapsed && (
            <div>
              <h2 className="text-white font-semibold">
                {user?.name}
              </h2>

              <p className="text-xs text-cyan-400">
                {user?.role}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MENU */}

      <div className="flex-1 py-8">
        <div
          className={`${
            isCollapsed
              ? "px-2"
              : "px-4"
          } space-y-2`}
        >
          {!isCollapsed && (
            <div className="px-4 py-2 mb-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Main Menu
              </p>
            </div>
          )}

          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              onMouseEnter={() =>
                setHoveredItem(menu.name)
              }
              onMouseLeave={() =>
                setHoveredItem(null)
              }
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                location.pathname === menu.path
                  ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              } ${
                isCollapsed
                  ? "justify-center"
                  : ""
              }`}
            >
              <span
                className={`text-xl ${
                  location.pathname ===
                  menu.path
                    ? "text-blue-400"
                    : "group-hover:text-blue-400 transition"
                }`}
              >
                {menu.icon}
              </span>

              {!isCollapsed && (
                <>
                  <div className="flex-1">
                    <span className="font-medium">
                      {menu.name}
                    </span>

                    {location.pathname ===
                      menu.path && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {
                          menu.description
                        }
                      </p>
                    )}
                  </div>

                  {location.pathname ===
                    menu.path && (
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                  )}
                </>
              )}

              {/* TOOLTIP */}

              {isCollapsed &&
                hoveredItem ===
                  menu.name && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 border border-white/10 rounded-lg shadow-xl z-50 whitespace-nowrap">
                    <p className="text-white font-semibold text-sm">
                      {menu.name}
                    </p>

                    <p className="text-gray-400 text-xs">
                      {
                        menu.description
                      }
                    </p>
                  </div>
                )}
            </Link>
          ))}
        </div>
      </div>

      {/* LOGOUT */}


      {/* FOOTER */}

      {!isCollapsed && (
        <div className="p-6 border-t border-white/10">
          <p className="text-xs text-gray-500 text-center">
            Version 2.0.0
            <br />© 2026 TaskFlow Inc.
            All rights reserved.
          </p>
        </div>
      )}

      {isCollapsed && (
        <div className="p-4 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500">
            v2.0
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;