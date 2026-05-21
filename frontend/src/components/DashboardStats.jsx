const DashboardStats = ({ title, value }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-gray-500 text-lg">
        {title}
      </h2>

      <p className="text-4xl font-bold mt-4 text-gray-800">
        {value}
      </p>
    </div>
  );
};

export default DashboardStats;