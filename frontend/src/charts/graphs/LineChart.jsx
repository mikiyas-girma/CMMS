import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getSaleMaterialreport } from "../../utils/material";

const LineChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    const fetchData = async () => {
      const response = await getSaleMaterialreport();
      setIsLoading(false);
      if (response) {
        setData(response?.data?.data?.report);
      }
    };
    fetchData();
  }, []);
  console.log("ftechData", data);

  // Function to accumulate monthly quantities based on category
  const getMonthlyQuantities = (category) => {
    const quantities = Array(12).fill(null); // Initialize quantities array for all months with null

    data?.forEach((item) => {
      if (item.category === category) {
        const monthIndex = new Date(`${item.month} 1, ${item.year}`).getMonth();
        if (monthIndex !== -1) {
          quantities[monthIndex] =
            (quantities[monthIndex] || 0) + item.totalQuantity;
        }
      }
    });

    // Get the current month index (0-11)
    const currentMonth = new Date().getMonth();

    // Set future months to null
    for (let i = currentMonth + 1; i < 12; i++) {
      quantities[i] = null;
    }

    return quantities;
  };

  // Check if data is still loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Retrieve accumulated quantities for construction and finishing materials
  const constructionMaterialsSales = getMonthlyQuantities("Construction");
  const finishingMaterialsSales = getMonthlyQuantities("Cement");

  // Chart data configuration
  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Construction Materials",
        data: constructionMaterialsSales,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Finishing Materials",
        data: finishingMaterialsSales,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};

export default LineChart;
