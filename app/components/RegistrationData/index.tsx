// import React from "react";
// import Chart from "@/app/components/client-libs";
// import useGetChildren from "@/app/hooks/useGetChildren";

// export default function RegistrationData() {
//   const { childrenChart } = useGetChildren();

//   const locationDataMap = new Map();

//   childrenChart.forEach((child) => {
//     const { location, number_of_children } = child;
//     if (locationDataMap.has(location)) {
//       locationDataMap.set(location, locationDataMap.get(location) + number_of_children);
//     } else {
//       locationDataMap.set(location, number_of_children);
//     }
//   });

//   const data = [["Location", "Number of Children"]];

//   locationDataMap.forEach((children, location) => {
//     data.push([location, children]);
//   });

//   const options = {
//     chart: {
//       title: "Children Registered",
//     },

//     colors: ["#FD620B"],
//     bar: { groupWidth: "80%" },
//   };

//   return (
//     <Chart chartType="Bar" height="400px" data={data} options={options}/>
//   );
// }

import React from "react";
import Chart from "@/app/components/client-libs";
import useGetChildren from "@/app/hooks/useGetChildren";

export default function RegistrationData() {
  const { childrenChart } = useGetChildren();

  // Create an object to store the aggregated data
  const locationData = {};

  childrenChart.forEach((child) => {
    const { location, number_of_children } = child;
    
    // Check if the location exists in the aggregated data
    if (location in locationData) {
      locationData[location] += number_of_children;
    } else {
      locationData[location] = number_of_children;
    }
  });

  // Convert the aggregated data into an array
  const data = [["Location", "Number of Children"]];

  for (const location in locationData) {
    data.push([location, locationData[location]]);
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
