import { Link } from "react-router-dom";
const TaskCard = ({ task }) => {
  return (
    <Link to={`/tasks/${task._id}`}>
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">
      <div className="flex justify-between items-start">
      
        <h2 className="text-xl font-bold text-gray-800">
          {task.title}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm text-white ${
            task.priority === "High"
              ? "bg-red-500"
              : task.priority === "Medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-gray-600 mt-3">
        {task.description}
      </p>

      <div className="mt-5 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {task.status}
        </span>

        <span className="text-sm text-gray-500">
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>
    </div>
    </Link>
  );
};

export default TaskCard;