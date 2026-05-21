import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const { data } = await API.get("/projects");

      const foundProject = data.find(
        (p) => p._id === id
      );

      setProject(foundProject);
    } catch (error) {
      console.log(error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h1 className="text-3xl font-bold">
            {project.title}
          </h1>

          <p className="mt-4 text-gray-700">
            {project.description}
          </p>

          <div className="mt-5">
            <span className="bg-blue-500 text-white px-4 py-2 rounded">
              {project.status}
            </span>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              Members
            </h2>

            <div className="space-y-3">
              {project.members?.map((member) => (
                <div
                  key={member._id}
                  className="bg-white p-4 rounded shadow"
                >
                  <h3 className="font-bold">
                    {member.name}
                  </h3>

                  <p>{member.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;