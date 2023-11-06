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

import React, { useEffect, useState } from "react";
import Chart from "@/app/components/client-libs";
import useGetChildren from "@/app/hooks/useGetChildren";

export default function RegistrationData() {
  const { childrenChart } = useGetChildren();

  const [geocodedData, setGeocodedData] = useState([]);

  useEffect(() => {
    const geocodeLocations = async () => {
      const geocodedLocations = [];

      for (const child of childrenChart) {
        const { location, number_of_children } = child;
        const geocodedLocation = await reverseGeocode(location);

        if (geocodedLocation) {
          geocodedLocations.push([geocodedLocation, number_of_children]);
        }
      }

      setGeocodedData(geocodedLocations);
    };

    geocodeLocations();
  }, [childrenChart]);

  const reverseGeocode = async (location) => {
    try {
      // Replace this with your reverse geocoding logic, e.g., calling a geocoding API
      const geocodedResult = await yourReverseGeocodingFunction(location);

      return geocodedResult;
    } catch (error) {
      console.error("Geocoding error:", error);
      return "Location not found";
    }
  };

  const options = {
    chart: {
      title: "Children Registered",
    },
    hAxis: {
      title: "Location",
    },
    vAxis: {
      title: "Number of Children",
    },
    colors: ["#FD620B"],
    bar: { groupWidth: "80%" },
  };

  return (
    <div>
      <Chart chartType="Bar" height="400px" data={[["Location", "Number of Children"], ...geocodedData]} options={options} />
    </div>
  );
}
