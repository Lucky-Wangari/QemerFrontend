import React, { useState, useEffect } from "react";
import Chart from "@/app/components/client-libs";
import useGetChildren from "@/app/hooks/useGetChildren";

export default function RecoveredData() {
  const { childrenChart } = useGetChildren();

  const locationEligibilityMap = new Map();

  childrenChart.forEach((child) => {
    const { location, is_eligible } = child;
    const eligibility = is_eligible ? "Eligible" : "Not Eligible";

    if (locationEligibilityMap.has(location)) {
      locationEligibilityMap.set(location, locationEligibilityMap.get(location) + is_eligible);
    } else {
      locationEligibilityMap.set(location, is_eligible);
    }
  });

  const data = [["Location", "Eligibility"]];

  locationEligibilityMap.forEach((eligibility, location) => {
    data.push([location, eligibility]);
  });

  const options = {
    chart: {
      title: "Children Eligible for Aid",
    },
    colors: ["#FD620B"],
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
