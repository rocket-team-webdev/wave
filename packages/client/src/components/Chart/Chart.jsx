import React from "react";
import { Bar } from "react-chartjs-2";

const Chart = ({ chartData }) => {
  const cgf = {
    labels: ["first", "second"],
    datasets: [
      {
        label: "Price in USD",
        data: [200, 700],
        backgroundColor: ["#ffbb11", "#ecf0f1"],
      },
    ],
  };

  console.log(chartData);

  return (
    <div>
      <Bar
        data={cgf}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Cryptocurrency prices",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
