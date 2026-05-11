import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardChart({
  usersCount,
  productsCount,
}: {
  usersCount: number;
  productsCount: number;
}) {
  const data = [
    { name: "Users", value: usersCount },
    { name: "Products", value: productsCount },
  ];

  return (
    <div className="bg-gray-900 p-5 rounded-xl mt-8">
      <h2 className="text-white mb-4 font-semibold">Overview Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#facc15" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
