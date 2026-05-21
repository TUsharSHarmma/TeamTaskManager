import { useEffect, useState } from "react";
import API from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCard";

import {
  FaFolderOpen,
  FaPlus,
  FaCheckCircle,
  FaTrash,
  FaSpinner
} from "react-icons/fa";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchProjects();
  }, []);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createProject = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post(
        "/projects",
        formData
      );

      console.log(data);

      setFormData({
        title: "",
        description: ""
      });

      setSuccessMessage(
        "🚀 Project Created Successfully!"
      );

      fetchProjects();

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Project creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);

      fetchProjects();
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
          {/* HEADER */}

          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                Projects Workspace
              </h1>

              <p className="text-gray-400">
                Create and manage all your
                projects efficiently
              </p>
            </div>

            <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
              <FaFolderOpen className="text-cyan-400 text-2xl" />

              <div>
                <h3 className="text-white font-bold">
                  {projects.length}
                </h3>

                <p className="text-gray-400 text-sm">
                  Total Projects
                </p>
              </div>
            </div>
          </div>

          {/* SUCCESS MESSAGE */}

          {successMessage && (
            <div className="mb-6 animate-bounce">
              <div className="bg-green-500/20 border border-green-500/30 text-green-300 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-lg">
                <FaCheckCircle className="text-2xl" />

                <span className="font-semibold">
                  {successMessage}
                </span>
              </div>
            </div>
          )}

          {/* CREATE PROJECT */}

          {user.role === "Admin" && (
            <form
              onSubmit={createProject}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl mb-10"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl">
                  <FaPlus className="text-white text-xl" />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Create New Project
                  </h2>

                  <p className="text-gray-400">
                    Organize and manage your
                    workflow
                  </p>
                </div>
              </div>

              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/60 border border-white/10 text-white p-4 rounded-2xl outline-none focus:border-cyan-500 mb-6"
              />

              <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
                className="w-full bg-slate-900/60 border border-white/10 text-white p-4 rounded-2xl outline-none focus:border-cyan-500"
              />

              <button
                type="submit"
                disabled={loading}
                className={`mt-8 px-8 py-4 rounded-2xl font-bold shadow-xl flex items-center gap-3 transition duration-300 ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 text-white"
                }`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Create Project
                  </>
                )}
              </button>
            </form>
          )}

          {/* PROJECTS GRID */}

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:scale-[1.02] transition duration-300 shadow-2xl"
              >
                <ProjectCard project={project} />

                {user.role === "Admin" && (
                  <button
                    onClick={() =>
                      deleteProject(project._id)
                    }
                    className="mt-5 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-semibold transition flex items-center gap-2"
                  >
                    <FaTrash />
                    Delete Project
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}

          {projects.length === 0 && (
            <div className="text-center py-20">
              <FaFolderOpen className="text-7xl text-gray-700 mx-auto mb-6" />

              <h2 className="text-3xl font-bold text-white mb-3">
                No Projects Found
              </h2>

              <p className="text-gray-400">
                Create your first project to
                get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;