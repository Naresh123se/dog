import { useState } from "react";
import {
  Calendar,
  Users,
  PawPrint,
  DollarSign,
  ArrowUp,
  ArrowDown,
  FileText,
  Settings,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  useGetAllBlogsQuery,
  useGetAllBreedsQuery,
  useGetAllDogsQuery,
  useGetAllUserQuery,
} from "@/app/slices/adminApiSlice";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { data: breedsData, isLoading: breedsLoading } = useGetAllBreedsQuery();
  const { data: blogsData, isLoading: blogsLoading } = useGetAllBlogsQuery();
  const { data: dogsData, isLoading: dogsLoading } = useGetAllDogsQuery();
  const { data: usersData, isLoading: usersLoading } = useGetAllUserQuery();

  const [timeFrame, setTimeFrame] = useState("6months");

  // Mock data for demonstration
  const monthlyData = [
    { name: "Jan", dogs: 10, revenue: 2000 },
    { name: "Feb", dogs: 15, revenue: 3500 },
    { name: "Mar", dogs: 25, revenue: 5000 },
    { name: "Apr", dogs: 30, revenue: 7500 },
    { name: "May", dogs: 40, revenue: 10000 },
    { name: "Jun", dogs: 50, revenue: 12500 },
  ];

  // Dog breed distribution data
  const breedDistribution = [
    { name: "German Shepherd", value: 40, color: "#4F46E5" },
    { name: "Bulldog", value: 30, color: "#06B6D4" },
    { name: "Retriever", value: 20, color: "#8B5CF6" },
    { name: "Others", value: 10, color: "#10B981" },
  ];

  // Recent dog entries
  const recentDogs = dogsData?.dogs?.slice(0, 4) || [];

  // Loading state
  if (breedsLoading || blogsLoading || dogsLoading || usersLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium">Loading dashboard data...</div>
      </div>
    );
  }

  // Calculate statistics
  const totalBreeds = breedsData?.count || 0;
  const totalDogs = dogsData?.count || 0;
  const totalUsers = usersData?.count || 0;
  const totalBlogs = blogsData?.count || 0;

  // Estimated revenue based on dog prices
  const totalRevenue =
    dogsData?.dogs?.reduce((acc, dog) => acc + dog.price, 0) || 0;

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pets Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Dogs"
          value={totalDogs}
          change="+15.7%"
          isPositive={true}
          icon={PawPrint}
          color="bg-blue-500"
        />
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue}`}
          change="+8.2%"
          isPositive={true}
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatsCard
          title="Active Users"
          value={totalUsers}
          change="+12.4%"
          isPositive={true}
          icon={Users}
          color="bg-purple-500"
        />
        <StatsCard
          title="Total Breeds"
          value={totalBreeds}
          change="+5.3%"
          isPositive={true}
          icon={Calendar}
          color="bg-yellow-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Revenue Overview
            </h2>
            <Select
              defaultValue={timeFrame}
              onValueChange={(value) => setTimeFrame(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366F1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dog Additions Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Dog Additions
            </h2>
            <Select
              defaultValue={timeFrame}
              onValueChange={(value) => setTimeFrame(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="dogs" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Breed Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Breed Distribution
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={breedDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {breedDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {breedDistribution.map((breed, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: breed.color }}
                  />
                  <span className="text-sm text-gray-600">{breed.name}</span>
                  <span className="ml-auto text-sm font-medium">
                    {breed.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Dogs */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Dogs</h2>
            <Link
              to="./dogs"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              View All
            </Link>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Breed
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentDogs.map((dog) => (
                  <tr key={dog._id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {dog.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {dog.breed}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {dog.gender}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${dog.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            User Management
          </h2>
          <Link
            to={"./users"}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            View All Users
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usersData?.user?.slice(0, 2).map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "breeder"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.isBanned
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.isBanned ? "Banned" : "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Blogs */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Blog Posts
          </h2>
          <Link
            to={"./blogs"}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            View All Posts
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogsData?.blogs?.slice(0, 2).map((blog) => (
            <div
              key={blog._id}
              className="flex border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="w-1/3">
                <img
                  src={blog.images[0]?.url || "/api/placeholder/150/150"}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-2/3 p-4">
                <h3 className="font-medium text-gray-900 mb-1">{blog.title}</h3>
                <p className="text-sm text-gray-500 mb-2">By {blog.author}</p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {new Date(blog.date).toLocaleDateString()}
                  </span>
                  <Link
                    to="./blogs"
                    className="text-xs text-indigo-600 hover:text-indigo-800"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, change, isPositive, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <div className="flex items-center mt-2">
          {isPositive ? (
            <ArrowUp className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`text-sm ml-1 ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last month</span>
        </div>
      </div>
      <div className={`${color} p-3 rounded-full`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

export default AdminDashboard;
