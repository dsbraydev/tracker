"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const chartData = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 12500 },
  { month: "Mar", value: 12300 },
  { month: "Apr", value: 12100 },
  { month: "May", value: 12200 },
  { month: "Jun", value: 12400 },
  { month: "Jul", value: 15231.89 },
];

export function Chart() {
  return (
    <div className="rounded-xl bg-[#0e0e0e] p-4 text-white w-full">
      <div className="mb-2">
        <p className="text-sm text-gray-400">Balance</p>
        <h2 className="text-2xl font-bold">$15,231.89</h2>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <Tooltip
            contentStyle={{ backgroundColor: "#1f1f1f", border: "none" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
            dot={{ r: 4, stroke: "#0e0e0e", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
