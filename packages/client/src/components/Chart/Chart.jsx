import React from "react";
import { Bar, Pie } from "react-chartjs-2";

const Chart = ({
  chartData,
  title = "Chart title",
  horizontal = false,
  type = "bar",
}) => {
  return (
    <div>
      {type === "bar" && (
        <Bar
          data={chartData}
          height={400}
          options={{
            plugins: {
              title: {
                display: true,
                text: title,
                font: {
                  size: 17,
                },
                padding: { bottom: 15, top: 20 },
              },
              legend: {
                display: true,
                position: "bottom",
                labels: { padding: 30 },
              },
            },

            // responsive: false,
            maintainAspectRatio: false,
            indexAxis: horizontal && "y",
          }}
        />
      )}

      {type === "pie" && (
        <Pie
          data={chartData}
          height={600}
          options={{
            plugins: {
              title: {
                display: true,
                text: title,
                font: {
                  size: 17,
                },
                padding: { bottom: 15, top: 20 },
              },
              legend: {
                display: true,
                position: "bottom",
                labels: { padding: 30 },
              },
            },
            layout: {
              padding: { top: 30 },
            },

            maintainAspectRatio: false,
            indexAxis: horizontal && "y",
          }}
        />
      )}
    </div>
  );
};

export default Chart;
