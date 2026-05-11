import { useState } from "react";

type Order = {
  id: number;
  customer: string;
  date: string;
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
};

export default function Orders() {
  const [orders] = useState<Order[]>([
    {
      id: 1,
      customer: "John Doe",
      date: "2024-06-01",
      total: 99.99,
      status: "Pending",
    },
    {
      id: 2,
      customer: "Jane Smith",
      date: "2024-06-02",
      total: 149.99,
      status: "Shipped",
    },
    {
      id: 3,
      customer: "Alice Johnson",
      date: "2024-06-03",
      total: 79.99,
      status: "Delivered",
    },
    {
      id: 4,
      customer: "Michael Brown",
      date: "2024-06-04",
      total: 199.99,
      status: "Cancelled",
    },
  ]);

  return (
    <div className="p-4 md:p-6 text-black dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-500">Orders</h1>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <table className="w-full text-left border-collapse ">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4 whitespace-nowrap">Order ID</th>
              <th className="p-4 whitespace-nowrap">Customer</th>
              <th className="p-4 whitespace-nowrap">Date</th>
              <th className="p-4 whitespace-nowrap">Total</th>
              <th className="p-4 whitespace-nowrap">Status</th>
              <th className="p-4 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="
                  border-b
                  border-gray-200 dark:border-gray-700
                  bg-white dark:bg-gray-900
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  text-gray-800 dark:text-white
                  transition-colors
                "
              >
                <td className="p-4 whitespace-nowrap font-medium">
                  #{order.id}
                </td>

                <td className="p-4 whitespace-nowrap">{order.customer}</td>

                <td className="p-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                  {order.date}
                </td>

                <td className="p-4 whitespace-nowrap font-semibold text-yellow-600 dark:text-yellow-500">
                  ${order.total.toFixed(2)}
                </td>

                <td className="p-4 whitespace-nowrap">
                  <span
                    className={`
                      px-3 py-1
                      rounded-full
                      text-xs
                      font-semibold
                      text-white

                      ${
                        order.status === "Pending"
                          ? "bg-yellow-500"
                          : order.status === "Shipped"
                            ? "bg-blue-500"
                            : order.status === "Delivered"
                              ? "bg-green-500"
                              : "bg-red-500"
                      }
                    `}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <button
                    className="
                      bg-blue-500 hover:bg-blue-600
                      text-white
                      py-2 px-4
                      rounded-lg
                      font-semibold
                      transition
                      cursor-pointer
                    "
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        Total Orders: {orders.length}
      </div>
    </div>
  );
}
