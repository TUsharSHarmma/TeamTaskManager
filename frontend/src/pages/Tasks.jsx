import { useEffect, useState } from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";

import {
  FaTasks,
  FaPlus,
  FaCheckCircle,
  FaTrash,
  FaSpinner,
  FaUserCheck
} from "react-icons/fa";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] =
    useState([]);

  const [members, setMembers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      project: "",
      assignedTo: "",
      priority: "Medium",
      dueDate: ""
    });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchTasks();
    fetchProjects();

    if (user.role === "Admin") {
      fetchMembers();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(
        "/tasks"
      );

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await API.get(
        "/projects"
      );

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMembers = async () => {
    try {
      const { data } = await API.get(
        "/auth/users"
      );

      setMembers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post(
        "/tasks",
        formData
      );

      setFormData({
        title: "",
        description: "",
        project: "",
        assignedTo: "",
        priority: "Medium",
        dueDate: ""
      });

      setSuccessMessage(
        "✅ Task Assigned Successfully!"
      );

      fetchTasks();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          "Task creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await API.put(`/tasks/${id}`, {
        status
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />

      <div className="ml-72">
        <Navbar />

        <div className="p-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-black text-white">
                Task Management
              </h1>

              <p className="text-gray-400 mt-2">
                Assign, manage and
                monitor tasks
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
              <h2 className="text-white text-2xl font-bold">
                {tasks.length}
              </h2>

              <p className="text-gray-400">
                Total Tasks
              </p>
            </div>
          </div>

          {successMessage && (
            <div className="bg-green-500/20 border border-green-500/30 text-green-300 p-4 rounded-2xl mb-6 animate-bounce">
              {successMessage}
            </div>
          )}

          {user.role === "Admin" && (
            <form
              onSubmit={createTask}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10"
            >
              <h2 className="text-3xl font-bold text-white mb-8">
                Create Task
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  value={formData.title}
                  onChange={
                    handleChange
                  }
                  required
                  className="bg-slate-900/60 border border-white/10 text-white p-4 rounded-2xl"
                />

                <select
                  name="project"
                  value={
                    formData.project
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="bg-slate-900/60 border border-white/10 text-white p-4 rounded-2xl"
                >
                  <option value="">
                    Select Project
                  </option>

                  {projects.map(
                    (project) => (
                      <option
                        key={
                          project._id
                        }
                        value={
                          project._id
                        }
                      >
                        {
                          project.title
                        }
                      </option>
                    )
                  )}
                </select>

                <select
                  name="assignedTo"
                  value={
                    formData.assignedTo
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="bg-slate-900/60 border border-white/10 text-white p-4 rounded-2xl"
                >
                  <option value="">
                    Assign Member
                  </option>

                  {members.map(
                    (member) => (
                      <option
                        key={
                          member._id
                        }
                        value={
                          member._id
                        }
                      >
                        {
                          member.name
                        }
                      </option>
                    )
                  )}
                </select>

                <select
                  name="priority"
                  value={
                    formData.priority
                  }
                  onChange={
                    handleChange
                  }
                  className="bg-slate-900/60 border border-white/10 text-white p-4 rounded-2xl"
                >
                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>
                </select>
              </div>

              <textarea
                name="description"
                placeholder="Task Description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                required
                rows="5"
                className="w-full mt-6 bg-slate-900/60 border border-white/10 text-white p-4 rounded-2xl"
              />

              <input
                type="date"
                name="dueDate"
                value={
                  formData.dueDate
                }
                onChange={
                  handleChange
                }
                required
                className="w-full mt-6 bg-slate-900/60 border border-white/10 text-white p-4 rounded-2xl"
              />

              <button
                disabled={loading}
                className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Create Task
                  </>
                )}
              </button>
            </form>
          )}

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white/5 border border-white/10 rounded-3xl p-5"
              >
                <TaskCard task={task} />

                <div className="mt-4 text-gray-300">
                  Assigned To:
                  <span className="text-cyan-400 ml-2">
                    {
                      task.assignedTo
                        ?.name
                    }
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  {task.status ===
                    "Todo" && (
                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "In Progress"
                        )
                      }
                      className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
                    >
                      Start
                    </button>
                  )}

                  {task.status ===
                    "In Progress" && (
                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "Submitted"
                        )
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                    >
                      Submit
                    </button>
                  )}

                  {user.role ===
                    "Admin" &&
                    task.status ===
                      "Submitted" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            task._id,
                            "Completed"
                          )
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                      >
                        <FaUserCheck />
                        Approve
                      </button>
                    )}

                  {user.role ===
                    "Admin" && (
                    <button
                      onClick={() =>
                        deleteTask(
                          task._id
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;