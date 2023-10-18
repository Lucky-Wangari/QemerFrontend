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
//     <Chart chartType="Bar" height="400px" data={data} options={options} />
//   );
// }


import React from "react";
import Chart from "@/app/components/client-libs";
import useGetChildren from "@/app/hooks/useGetChildren";

// Define a type for the locationNameMap
type LocationNameMap = {
  [location: string]: string;
};

export default function RegistrationData() {
  const { childrenChart } = useGetChildren();

  // Create the location name mapping
  const locationNameMap: LocationNameMap = {
    "latitude1": "Location 1",
    "latitude2": "Location 2",
    // Add more mappings as needed
  };

  const locationDataMap = new Map();

  childrenChart.forEach((child) => {
    const { location, number_of_children } = child;

    // Get the location name from the mapping
    const locationName = locationNameMap[location] || location;

    if (locationDataMap.has(locationName)) {
      locationDataMap.set(locationName, locationDataMap.get(locationName) + number_of_children);
    } else {
      locationDataMap.set(locationName, number_of_children);
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
    bar: { groupWidth: "80%" },
  };

  return (
    <Chart chartType="Bar" height="400px" data={data} options={options} />
  );
}
