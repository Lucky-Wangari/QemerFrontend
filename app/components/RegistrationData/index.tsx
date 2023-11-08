import React from "react";
import Chart from "@/app/components/client-libs";
import useGetChildren from "@/app/hooks/useGetChildren";

interface LocationData {
  [location: string]: number;
}

export default function RegistrationData() {
  const { childrenChart } = useGetChildren();

  const locationData: LocationData = {};

  childrenChart.forEach((child) => {
    const { location, number_of_children } = child;

    if (location in locationData) {
      locationData[location] += number_of_children;
    } else {
      locationData[location] = number_of_children;
    }
  });

  const data: Array<[string, string]> = [["Location", "Number of Children"]];

  for (const [location, numberOffChildren] of Object.entries(locationData)) {
    data.push([location, numberOffChildren.toString()]);
  }

  const options = {
    chart: {
      title: "Children Registered",
    },
    colors: ["#FD620B"],
    bar: { groupWidth: "80%" },
  };

  return (
    <Chart chartType="Bar" height="400px" data={data} options={options} />
  );
}

