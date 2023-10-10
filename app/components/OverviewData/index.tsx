'use client'
import React, { useState, useEffect } from "react";
import Chart from "@/app/components/client-libs";
import { getOverview } from "@/app/utilities/utils";

interface OverviewData {
  delayed_milestones: any;
  sex: any;
 
}

export default function OverviewData() {
  const [chartData, setChartData] = useState<OverviewData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOverview();
        setChartData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartData.length > 0 ? (
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={[
            ["Delayed Milestone", "Registered Children"],
            ...chartData.map((item) => [item.delayed_milestones, item.sex]),
          ]}
          options={{
            chart: {
              title: "Children Registration",
            },
            colors: ["#F48547"],
          }}
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}

