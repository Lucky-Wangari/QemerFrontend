import React, { useState, useEffect } from "react";
import Chart from "@/app/components/client-libs";
import useGetChildren from "@/app/hooks/useGetChildren";

interface LocationData {
  [location: string]: number;
}

export default function RegistrationData() {
  const { childrenChart } = useGetChildren();
  const [locationData, setLocationData] = useState<LocationData>({});

  useEffect(() => {
    const updateLocationData = async () => {
      const newLocationData: LocationData = {};

      for (const child of childrenChart) {
        const { location, number_of_children } = child;
        const locationName = await convertCoordinatesToLocation(location);

        if (locationName in newLocationData) {
          newLocationData[locationName] += number_of_children;
        } else {
          newLocationData[locationName] = number_of_children;
        }
      }

      setLocationData(newLocationData);
    };

    updateLocationData();
  }, [childrenChart]);

  const data: Array<[string, string]> = [["Location", "Number of Children"]];

  for (const [location, numberOfChildren] of Object.entries(locationData)) {
    data.push([location, numberOfChildren.toString()]);
  }

  const options = {
    chart: {
      title: "Children Registered",
    },
    colors: ["#FD620B"],
    bar: { groupWidth: "80%" },
  };

  return (
    <Chart chartType="Bar" height="400px" data={data} options={options}/>
  );
}

const convertCoordinatesToLocation = async (coordinates: string) => {
  try {
    const [latitude, longitude] = coordinates.split(",");
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18`
    );
    const data = await response.json();
    if (data.display_name) {
      const addressParts = data.display_name.split(",");
      if (addressParts.length >= 2) {
        return addressParts[0].trim(); 
      }
    }
    return "Location Not Found";
  } catch (error) {
    console.error("Error fetching location data", error);
    return "Location Not Found";
  }
};
