import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project._id}`}>
      <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition cursor-pointer">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {project.title}
          </h2>

          <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
            {project.status}
          </span>
        </div>

        <p className="text-gray-600 mt-4 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-6 text-sm text-gray-500">
          {project.members?.length || 0} Members
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;