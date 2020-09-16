import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(time, total, recovered, dead) {
  return { time, total, recovered, dead };
}
export default function Chart({stats}) {
  const statsAsArray = Object.keys(stats).map(key =>({name: key, amount: stats[key] }));

  return (
    <React.Fragment>
      <Title>Total Count</Title>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={statsAsArray}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
