const EmptyState = ({ message }) => {
  return (
    <div className="bg-white rounded shadow p-10 text-center">
      <h2 className="text-2xl font-bold text-gray-500">
        {message}
      </h2>
    </div>
  );
};

export default EmptyState;