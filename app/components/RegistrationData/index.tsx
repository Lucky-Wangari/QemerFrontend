import React from "react";
import Chart from "@/app/components/client-libs";
import useGetChildren from "@/app/hooks/useGetChildren";

export default function RegistrationData() {
  const { childrenChart } = useGetChildren();


  const data = [["Location", "Number of Children"], ...childrenChart.map((child) => [child.location, child.number_of_children])];

  const options = {
    chart: {
      title: "Children Registered"
    },
    colors: ["#FD620B"]
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





















