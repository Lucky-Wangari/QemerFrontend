import { useState, useEffect} from "react";
import { getOverview } from "../utilities/utils";


interface overviewData {
  sex: string;
  delayed_milestone: any;
}

const useGetOverview = () => {
  const [childrenChart, setChart] = useState<overviewData[]>([]);
  

  useEffect(() => {
    (async () => {
      const response = await getOverview();
      setChart(response);
    })();
  }, []);

  return {
    childrenChart };
};

export default useGetOverview;