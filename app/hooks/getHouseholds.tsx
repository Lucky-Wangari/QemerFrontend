import { useState, useEffect} from "react";
import { getGuardian } from "../utilities/utils";

interface GuardianData {
  eligibility: any;
  name: any;
  parent_name: string;
  location: string;
  is_eligible: string;
  created_at: string;
 
}

const useGetGuardian = () => {
const [success, setSuccess] = useState<GuardianData[]>([]);
const [fetchToggle, setFetchToggle] =  useState(false);
useEffect(()=>{
  (async()=>{
    const response = await getGuardian()
    setSuccess(response)
    
  })()
}, [fetchToggle])
return {success,
refetch : ()=> setFetchToggle(!fetchToggle)}
};
export default useGetGuardian;

