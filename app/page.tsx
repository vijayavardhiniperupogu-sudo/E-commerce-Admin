export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Products
          </h2>
          <p className="text-3xl font-bold mt-2 text-blue-600">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Orders
          </h2>
          <p className="text-3xl font-bold mt-2 text-green-600">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Users
          </h2>
          <p className="text-3xl font-bold mt-2 text-purple-600">0</p>
        </div>

      </div>
    </div>
  );
}