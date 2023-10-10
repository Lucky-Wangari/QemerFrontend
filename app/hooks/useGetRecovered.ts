import { useState, useEffect} from "react";
import { getLocation } from "../utilities/utils";


interface locationData {
  is_eligible: any;
  location: string;
}

const useGeLocation = () => {
  const [childrenChart, setChart] = useState<locationData[]>([]);
  

  useEffect(() => {
    (async () => {
      const response = await getLocation();
      setChart(response);
    })();
  }, []);

  return {
    childrenChart };
};

export default useGeLocation;

