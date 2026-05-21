import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  FaUpload,
  FaCheckCircle
} from "react-icons/fa";

const TaskDetails = () => {
  const { id } = useParams();

  const [task, setTask] = useState(null);

  const [submission, setSubmission] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const { data } = await API.get(
        `/tasks/${id}`
      );

      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitTask = async () => {
    try {
      setLoading(true);

      await API.put(`/tasks/${id}`, {
        submission,
        status: "Submitted"
      });

      setSuccess(
        "✅ Task Submitted Successfully"
      );

      fetchTask();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!task) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <div className="ml-72">
        <Navbar />

        <div className="p-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {task.title}
            </h1>

            <p className="text-gray-300 mb-6">
              {task.description}
            </p>

            <div className="grid md:grid-cols-2 gap-5 mb-8">
              <div className="bg-slate-900/50 p-5 rounded-2xl">
                <p className="text-gray-400">
                  Status
                </p>

                <h2 className="text-white text-xl font-bold">
                  {task.status}
                </h2>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-2xl">
                <p className="text-gray-400">
                  Priority
                </p>

                <h2 className="text-white text-xl font-bold">
                  {task.priority}
                </h2>
              </div>
            </div>

            {/* MEMBER SUBMISSION */}

            {user.role === "Member" && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-white mb-5">
                  Submit Your Work
                </h2>

                <textarea
                  placeholder="Paste github link or task submission..."
                  value={submission}
                  onChange={(e) =>
                    setSubmission(
                      e.target.value
                    )
                  }
                  rows="5"
                  className="w-full bg-slate-900/60 border border-white/10 text-white p-4 rounded-2xl"
                />

                <button
                  onClick={submitTask}
                  disabled={loading}
                  className="mt-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3"
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      <FaUpload />
                      Submit Task
                    </>
                  )}
                </button>

                {success && (
                  <div className="mt-5 bg-green-500/20 border border-green-500/30 text-green-300 px-5 py-4 rounded-2xl flex items-center gap-3">
                    <FaCheckCircle />

                    {success}
                  </div>
                )}
              </div>
            )}

            {/* SHOW SUBMISSION */}

            {task.submission && (
              <div className="mt-10 bg-slate-900/50 p-5 rounded-2xl">
                <h2 className="text-white text-2xl font-bold mb-4">
                  Submitted Work
                </h2>

                <p className="text-gray-300">
                  {task.submission}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;