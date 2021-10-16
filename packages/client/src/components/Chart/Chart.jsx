import React from "react";
import { Bar } from "react-chartjs-2";

const Chart = ({ chartData, title = "Chart title", horizontal = false }) => {
  // const cgf = {
  //   labels: ["first", "second"],
  //   datasets: [
  //     {
  //       label: "Price in USD",
  //       data: [200, 700],
  //       backgroundColor: ["#ffbb11", "#ecf0f1"],
  //     },
  //   ],
  // };

  console.log(chartData);

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: title,
              font: {
                size: 17,
              },
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
          indexAxis: horizontal && "y",
        }}
      />
    </div>
  );
};

export default Chart;
