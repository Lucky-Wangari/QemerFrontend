import React, { useState, useEffect } from "react";
import Chart from "@/app/components/client-libs";
import useGetChildren from "@/app/hooks/useGetChildren";

export default function RecoveredData() {
  const { childrenChart } = useGetChildren();

  const locationEligibilityMap = new Map();

  childrenChart.forEach((child) => {
    const { location, is_eligible } = child;

    if (locationEligibilityMap.has(location)) {
      locationEligibilityMap.set(location, locationEligibilityMap.get(location) + (is_eligible ? 1 : 0));
    } else {
      locationEligibilityMap.set(location, is_eligible ? 1 : 0);
    }
  });

  const data = [["Location", "Eligible"]];

  locationEligibilityMap.forEach((eligibleCount, location) => {
    data.push([location, eligibleCount]);
  });

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

  return (
    <Chart
      chartType="Bar"
      height="400px"
      data={data}
      options={options}
    />
  );
}

