import React, { useEffect, useState } from "react";
import Chart from "@/app/components/client-libs";
import useGetChildren from "@/app/hooks/useGetChildren";

export default function RecoveredData() {
  const { childrenChart } = useGetChildren();
  const [locationData, setLocationData] = useState<[string, number][]>([]);
  const convertCoordinatesToLocation = async (latitude: string, longitude: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      if (data.address && data.address.road) {
        return data.address.road;
      } else {
        return "Location Not Found";
      }
    } catch (error) {
      console.error("Error fetching location data", error);
      return "Location Not Found";
    }
  };
  useEffect(() => {
    const updateLocationData = async () => {
      const locationEligibilityMap = new Map();
      for (const child of childrenChart) {
        const { location, is_eligible } = child;
        const [latitude, longitude] = location.split(", ");
        const streetName = await convertCoordinatesToLocation(latitude, longitude);
        if (locationEligibilityMap.has(streetName)) {
          locationEligibilityMap.set(
            streetName,
            locationEligibilityMap.get(streetName) + (is_eligible ? 1 : 0)
          );
        } else {
          locationEligibilityMap.set(streetName, is_eligible ? 1 : 0);
        }
      }
      const locationData: [string, number][] = [];
      locationEligibilityMap.forEach((eligibleCount, location) => {
        locationData.push([location, eligibleCount]);
      });
      setLocationData(locationData);
    };
    updateLocationData();
  }, [childrenChart]);
  const data = [["Location", "Eligible"], ...locationData];
  const options = {
    chart: {
      title: "Number of Eligible Children by Location",
    },
    hAxis: {
      title: "Location",
    },
    vAxis: {
      title: "Number of Eligible Children",
    },
    colors: ["#FD620B"],
    bars: "vertical",
  };
  return (
    <Chart chartType="Bar" height="400px" data={data} options={options} />
  );
}