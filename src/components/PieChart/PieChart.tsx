import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPieChart({
  usersCount,
  productsCount,
}: {
  usersCount: number;
  productsCount: number;
}) {
  const data = [
    { name: "Users", value: usersCount },
    { name: "Products", value: productsCount },
    { name: "Orders", value: 5 }, // static مؤقتًا
  ];

  const COLORS = ["#facc15", "#60a5fa", "#34d399"];

  return (
    <div className="bg-gray-900 p-5 rounded-xl mt-8">
      <h2 className="text-white mb-4 font-semibold">Distribution</h2>

      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
