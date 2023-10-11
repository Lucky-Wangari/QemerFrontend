import React from "react";
import Chart from "@/app/components/client-libs";
import useGetChildren from "@/app/hooks/useGetChildren";

export default function RecoveredData() {
  const { childrenChart } = useGetChildren();


  const data = [["Location", "Eligibility"], ...childrenChart.map((child) => [child.location, child.is_eligible.toString()])];

  const options = {
    chart: {
      title: "Children Eligible for Aid"
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

