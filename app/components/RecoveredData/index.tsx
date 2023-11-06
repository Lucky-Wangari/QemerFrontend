// import React, { useState, useEffect } from "react";
// import Chart from "@/app/components/client-libs";
// import useGetChildren from "@/app/hooks/useGetChildren";

// export default function RecoveredData() {
//   const { childrenChart } = useGetChildren();

//   const locationEligibilityMap = new Map();

//   childrenChart.forEach((child) => {
//     const { location, is_eligible } = child;

//     if (locationEligibilityMap.has(location)) {
//       locationEligibilityMap.set(location, locationEligibilityMap.get(location) + (is_eligible ? 1 : 0));
//     } else {
//       locationEligibilityMap.set(location, is_eligible ? 1 : 0);
//     }
//   });

//   const data = [["Location", "Eligible"]];

//   locationEligibilityMap.forEach((eligibleCount, location) => {
//     data.push([location, eligibleCount]);
//   });

//   const options = {
//     chart: {
//       title: "Number of Eligible Children by Location",
//     },
//     hAxis: {
//       title: "Location",
//     },
//     vAxis: {
//       title: "Number of Eligible Children",
//     },
//     colors: ["#FD620B"],
//     bars: "vertical",
//   };

//   return (
//     <Chart
//       chartType="Bar"
//       height="400px"
//       data={data}
//       options={options}
//     />
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
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location[0]}&lon=${location[1]}`);
      const data = await response.json();

      if (data && data.display_name) {
        return data.display_name;
      } else {
        return "Location not found";
      }
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
