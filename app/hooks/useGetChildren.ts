import { useState, useEffect} from "react";
import { getChildren } from "../utilities/utils";


interface ChildrenData {
  sex: any;
  is_eligible: any;
  number_of_children: number;
  location: string;
}

const useGetChildren = () => {
  const [childrenChart, setChart] = useState<ChildrenData[]>([]);
  

  useEffect(() => {
    (async () => {
      const response = await getChildren();
      setChart(response);
    })();
  }, []);

  return {
    childrenChart };
};

export default useGetChildren;

