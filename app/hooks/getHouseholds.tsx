import { useState, useEffect} from "react";
import { getGuardian } from "../utilities/utils";

interface GuardianData {
  eligibility: any;
  name: any;
  parent_name: string;
  is_eligible: string;
  created_at: string;
 
}

const useGetGuardian = () => {
  const [success, setSuccess] = useState<GuardianData[]>([]);
  const [fetchToggle, setFetchToggle] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    (async () => {
      try {
        const response = await getGuardian();
        setSuccess(response);
        setError(null); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again."); 
      }
    })();
  }, [fetchToggle]);

  return { success, error, refetch: () => setFetchToggle(!fetchToggle) };
};

export default useGetGuardian;

