import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { format } from "date-fns";
import 'react-calendar-heatmap/dist/styles.css';
import './CalenderHeatMap.css';

const CalenderHeatMap = () => {

  const data = [
    { date: "2023-06-01", count: 1 },
    { date: "2023-06-05", count: 2 },
    { date: "2023-07-10", count: 3 },
    { date: "2023-08-15", count: 4 },
    // Add more data points as needed
  ];

  const startDate = new Date("2023-06-01");
  const endDate = new Date("2024-06-01");

  return (
    <div>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data}
        classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-scale-${value.count}`;
          }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) {
            return null;
          }
          return {
            "data-tip": `${value.date}: ${value.count} activities`,
          };
        }}
        showWeekdayLabels
      />
    </div>
  );
};

export default CalenderHeatMap;
