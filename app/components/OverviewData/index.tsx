import React, { useState, useEffect } from "react";
import Chart from "@/app/components/client-libs";
import { getOverview } from "@/app/utilities/utils";

interface OverviewData {
  delayed_milestones: string;
  sex: string;
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

  const initialAggregatedData: { [key: string]: number } = {};
  const aggregatedData = chartData.reduce((agg, item) => {
    const { delayed_milestones, sex } = item;
    const key = `${delayed_milestones}_${sex}`;

    if (agg[key]) {
      agg[key]++;
    } else {
      agg[key] = 1;
    }

    return agg;
  }, initialAggregatedData);

  const data = [["Delayed Milestone", "Count"]];

  for (const key in aggregatedData) {
    if (aggregatedData.hasOwnProperty(key)) {
      const [milestone, sex] = key.split("_");
      data.push([`${milestone} - ${sex}`, aggregatedData[key].toString()]);    }
  }

  return (
    <div>
      {chartData.length > 0 ? (
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={data}
          options={{
            chart: {
              title: "Delayed Milestones by Sex",
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
