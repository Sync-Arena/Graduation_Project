import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  Legend,
} from "recharts";

const RatingProgress = () => {
  const data = [
    { date: "2024-04-24", rating: 0 },
    { date: "2024-05-28", rating: 800 },
    { date: "2024-06-23", rating: 1700 },
  ];

  const ratingLevels = [
    { min: 0, max: 1199, color: "#CCCCCC", label: "Newbie" },
    { min: 1200, max: 1399, color: "#77FF77", label: "Pupil" },
    { min: 1400, max: 1599, color: "#77DDBB", label: "Specialist" },
    { min: 1600, max: 1899, color: "#AAAAFF", label: "Expert" },
    { min: 1900, max: 2099, color: "#FF88FF", label: "Candidate Master" },
    { min: 2100, max: 2299, color: "#FFCC88", label: "Master" },
    { min: 2300, max: 2399, color: "#FFBB55", label: "International Master" },
    { min: 2400, max: 2599, color: "#FF7777", label: "Grandmaster" },
    {
      min: 2600,
      max: 2999,
      color: "#FF3333",
      label: "International Grandmaster",
    },
    { min: 3000, max: 4000, color: "#AA0000", label: "Legendary Grandmaster" },
  ];

  // Custom tick values for Y-axis
  const customTicks = [0, 1200, 1400, 1600, 1900, 2100, 2300, 2400, 2600, 3000];

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fontFamily: "Arial, sans-serif" }}
        />
        <YAxis
          domain={[0, 4000]}
          tick={{ fontSize: 12, fontFamily: "Arial, sans-serif" }}
          ticks={customTicks} // Set custom tick values
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#333",
            border: "none",
            borderRadius: "5px",
            color: "#fff",
          }}
        />
        <Legend verticalAlign="top" height={20} iconType="circle" />
        <Line
          type="monotone"
          dataKey="rating"
          stroke="#FF5722"
          strokeWidth={3}
          dot={{ fill: "#FF5722", r: 4 }}
          activeDot={{
            r: 8,
            fill: "#FF5722",
            stroke: "#fff",
            strokeWidth: 2,
          }}
        />
        {ratingLevels.map((level, index) => (
          <ReferenceArea
            key={index}
            y1={level.min}
            y2={level.max}
            fill={level.color}
            fillOpacity={0.6}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RatingProgress;
