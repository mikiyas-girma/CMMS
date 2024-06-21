import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getSaleMaterialreport } from "../../utils/material";
const LineChart = () => {
  const [Data, setData] = [];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart: Construction VS Finishing Materials",
      },
    },
  };

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getSaleMaterialreport();
      if (response && response.data && response.data.report) {
        setData(response.data.report);
      }
    };
    fetchdata();
  }, []);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const constructionMaterialsSales = [120, 135, 125, 125, 160, 150, 170];

  const finishingMaterialsSales = [80, 100, 95, 150, 145, 105, 120, 115];

  const data = {
    labels,
    datasets: [
      {
        label: "Construction Materials",
        data: constructionMaterialsSales,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132)",
      },
      {
        label: "Finishing Materials",
        data: finishingMaterialsSales,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
