import React from "react";
import Chart from "@/app/components/client-libs";
import useGetChildren from "@/app/hooks/useGetChildren";

export default function RegistrationData() {
  const { childrenChart } = useGetChildren();

  // Create a Map to aggregate children data by location
  const locationDataMap = new Map();

  childrenChart.forEach((child) => {
    const { location, number_of_children } = child;
    if (locationDataMap.has(location)) {
      locationDataMap.set(location, locationDataMap.get(location) + number_of_children);
    } else {
      locationDataMap.set(location, number_of_children);
    }
  });

  const data = [["Location", "Number of Children"]];

  locationDataMap.forEach((children, location) => {
    data.push([location, children]);
  });

  const options = {
    chart: {
      title: "Children Registered",
    },
    colors: ["#FD620B"],
  };

  return (
    <Chart chartType="Bar" height="400px" data={data} options={options} />
  );
}
