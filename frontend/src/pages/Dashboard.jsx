import { useEffect, useState } from "react";
import API from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardStats from "../components/DashboardStats";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaChartLine,
  FaProjectDiagram
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    totalProjects: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/dashboard");

      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    {
      name: "Completed",
      value: stats.completedTasks
    },
    {
      name: "Pending",
      value: stats.pendingTasks
    },
    {
      name: "Overdue",
      value: stats.overdueTasks
    }
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444"
  ];

  const completionRate =
    stats.totalTasks > 0
      ? (
          (stats.completedTasks /
            stats.totalTasks) *
          100
        ).toFixed(0)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />

      <div className="ml-72">
        <Navbar />

        <div className="p-8">
          {/* HEADER */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <h1 className="text-5xl font-black text-white mb-3">
                Dashboard
              </h1>

              <p className="text-gray-400 text-lg">
                Welcome back 👋 Manage your
                projects and tasks efficiently.
              </p>
            </div>

            <div className="mt-5 md:mt-0 bg-white/5 border border-white/10 px-6 py-4 rounded-3xl backdrop-blur-xl">
              <p className="text-gray-400 text-sm">
                Productivity
              </p>

              <h2 className="text-3xl font-bold text-cyan-400">
                {completionRate}%
              </h2>
            </div>
          </div>

          {/* LOADING */}

          {loading ? (
            <div className="flex justify-center items-center py-40">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* STATS */}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-3xl hover:scale-105 transition duration-300 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">
                        Total Tasks
                      </p>

                      <h2 className="text-4xl font-black text-white mt-2">
                        {stats.totalTasks}
                      </h2>
                    </div>

                    <div className="p-4 rounded-2xl bg-cyan-500/20">
                      <FaTasks className="text-cyan-400 text-3xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-3xl hover:scale-105 transition duration-300 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">
                        Completed
                      </p>

                      <h2 className="text-4xl font-black text-green-400 mt-2">
                        {stats.completedTasks}
                      </h2>
                    </div>

                    <div className="p-4 rounded-2xl bg-green-500/20">
                      <FaCheckCircle className="text-green-400 text-3xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-3xl hover:scale-105 transition duration-300 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">
                        Pending
                      </p>

                      <h2 className="text-4xl font-black text-yellow-400 mt-2">
                        {stats.pendingTasks}
                      </h2>
                    </div>

                    <div className="p-4 rounded-2xl bg-yellow-500/20">
                      <FaClock className="text-yellow-400 text-3xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-3xl hover:scale-105 transition duration-300 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">
                        Overdue
                      </p>

                      <h2 className="text-4xl font-black text-red-400 mt-2">
                        {stats.overdueTasks}
                      </h2>
                    </div>

                    <div className="p-4 rounded-2xl bg-red-500/20">
                      <FaExclamationTriangle className="text-red-400 text-3xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* CHART + ANALYTICS */}

              <div className="grid lg:grid-cols-2 gap-8">
                {/* PIE CHART */}

                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-cyan-500/20 rounded-2xl">
                      <FaChartLine className="text-cyan-400 text-2xl" />
                    </div>

                    <div>
                      <h2 className="text-3xl font-bold text-white">
                        Task Analytics
                      </h2>

                      <p className="text-gray-400">
                        Performance overview
                      </p>
                    </div>
                  </div>

                  <ResponsiveContainer
                    width="100%"
                    height={350}
                  >
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        outerRadius={120}
                        label
                      >
                        {chartData.map(
                          (entry, index) => (
                            <Cell
                              key={index}
                              fill={
                                COLORS[index]
                              }
                            />
                          )
                        )}
                      </Pie>

                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* PROGRESS */}

                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-purple-500/20 rounded-2xl">
                      <FaProjectDiagram className="text-purple-400 text-2xl" />
                    </div>

                    <div>
                      <h2 className="text-3xl font-bold text-white">
                        Productivity
                      </h2>

                      <p className="text-gray-400">
                        Team progress report
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* COMPLETED */}

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">
                          Completed Tasks
                        </span>

                        <span className="text-green-400 font-bold">
                          {
                            stats.completedTasks
                          }
                        </span>
                      </div>

                      <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-700"
                          style={{
                            width: `${completionRate}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* PENDING */}

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">
                          Pending Tasks
                        </span>

                        <span className="text-yellow-400 font-bold">
                          {stats.pendingTasks}
                        </span>
                      </div>

                      <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-4 rounded-full"
                          style={{
                            width: `${
                              stats.totalTasks > 0
                                ? (
                                    (stats.pendingTasks /
                                      stats.totalTasks) *
                                    100
                                  ).toFixed(0)
                                : 0
                            }%`
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* OVERDUE */}

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">
                          Overdue Tasks
                        </span>

                        <span className="text-red-400 font-bold">
                          {stats.overdueTasks}
                        </span>
                      </div>

                      <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-red-400 to-red-600 h-4 rounded-full"
                          style={{
                            width: `${
                              stats.totalTasks > 0
                                ? (
                                    (stats.overdueTasks /
                                      stats.totalTasks) *
                                    100
                                  ).toFixed(0)
                                : 0
                            }%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER */}

              <div className="mt-10 text-center text-gray-500 text-sm">
                © 2026 TaskFlow Dashboard •
                Smart Team Collaboration System
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;