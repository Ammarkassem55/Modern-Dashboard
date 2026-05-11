import axios from "axios";
import { useEffect, useState } from "react";
import DashboardChart from "../../DashboardChart/DashboardChart";
import PieChart from "../../PieChart/PieChart";

export default function Dashboard() {
  type User = {
    id: number;
    name: string;
    email: string;
  };
  type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
  };
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data.slice(0, 4)));

    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data.slice(0, 4)));
  }, []);
  return (
    <div className="space-y-8 text-black dark:text-white">
      <h1 className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl text-yellow-500 dark:text-yellow-400 shadow-md transition duration-300">
          <p className="text-gray-400">Users</p>
          <h2 className="text-2xl font-bold">{users.length}</h2>
        </div>
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl text-yellow-500 dark:text-yellow-400 shadow-md transition duration-300">
          <p className="text-gray-400">Products</p>
          <h2 className="text-2xl font-bold">{products.length}</h2>
        </div>
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl text-yellow-500 dark:text-yellow-400 shadow-md transition duration-300">
          <p className="text-gray-400">Revenue</p>
          <h2 className="text-2xl font-bold">$12,400</h2>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 p-5 rounded-xl">
        <h2 className="text-yellow-500 dark:text-yellow-400 font-semibold mb-4">
          Recent Users
        </h2>
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between text-yellow-500 dark:text-yellow-400 border-b border-gray-800  py-2"
            >
              <span>{user.name}</span>
              <span>{user.email}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 p-5 rounded-xl">
        <h2 className="text-yellow-500 dark:text-yellow-400 font-semibold mb-4">
          Recent Products
        </h2>
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl p-4 hover:scale-105 transition duration-200"
            >
              <div className="h-40 flex items-center justify-center bg-gray-200 dark:bg-white rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-28 object-contain"
                />
              </div>
              <p className="font-semibold text-sm line-clamp-2">
                {product.title}
              </p>
              <p className="text-yellow-400 font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl">
          <h2 className="text-yellow-500 dark:text-yellow-400 mb-4">
            Overview
          </h2>
          <DashboardChart
            usersCount={users.length}
            productsCount={products.length}
          />
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl">
          <h2 className="text-yellow-500 dark:text-yellow-400 mb-4">
            Distribution
          </h2>
          <PieChart usersCount={users.length} productsCount={products.length} />
        </div>
      </div>
    </div>
  );
}
