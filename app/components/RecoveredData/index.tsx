import React from "react";
import Chart from "@/app/components/client-libs"; 
import useGetChildren from "@/app/hooks/useGetChildren";

export default function RecoveredData() {
  const { childrenChart } = useGetChildren();

  // Initialize a map to store location eligibility data
  const locationEligibilityMap = new Map();

  // Process the data and populate the locationEligibilityMap
  childrenChart.forEach((child) => {
    const { location, is_eligible } = child;

    if (locationEligibilityMap.has(location)) {
      locationEligibilityMap.set(
        location,
        locationEligibilityMap.get(location) + (is_eligible ? 1 : 0)
      );
    } else {
      locationEligibilityMap.set(location, is_eligible ? 1 : 0);
    }
  });

  // Prepare the data in the format expected by the Chart component
  const data = [["Location", "Eligible"]];
  locationEligibilityMap.forEach((eligibleCount, location) => {
    data.push([location, eligibleCount]);
  });

  // Chart options
  const options = {
    chart: {
      title: "Number of Eligible Children by Location",
    },
    hAxis: {
      title: "Location",
    },
    vAxis: {
      title: "Number of Eligible Children",
    },
    colors: ["#FD620B"],
    bars: "vertical",
  };

  // Render the chart component
  return (
    <Chart chartType="Bar" height="400px" data={data} options={options} />
  );
}

