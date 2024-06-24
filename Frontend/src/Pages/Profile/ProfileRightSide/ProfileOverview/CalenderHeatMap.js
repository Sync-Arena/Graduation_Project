import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { format } from "date-fns";
import 'react-calendar-heatmap/dist/styles.css';
import './CalenderHeatMap.css';

const CalenderHeatMap = () => {

  const data = [
    { date: "2024-04-24", count: 3 },  // Corrected to April 15
    { date: "2024-04-28", count: 4 },
    { date: "2024-05-06", count: 1 },  // Corrected to May 6
    { date: "2024-05-15", count: 2 },
    { date: "2024-05-28", count: 3 },
    { date: "2024-06-06", count: 4 },
    { date: "2024-06-09", count: 1 },
    { date: "2024-06-10", count: 3 },
    { date: "2024-06-12", count: 2 },
    { date: "2024-06-14", count: 3 },
    { date: "2024-06-23", count: 4 },
    { date: "2024-06-24", count: 4 },
  ];

  const startDate = new Date("2024-01-01");
  const endDate = new Date("2024-12-31");

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
