import { useState, useEffect} from "react";
import { getParent } from "../utilities/utils";


interface ParentData {
   
    parent_name: string,
    national_id: number,
    number_of_children: number,
    is_eligible: number,
    phone_number: number,
 
}


const useGetParent = () => {
const [success, setSuccess] = useState<ParentData[]>([]);
const [fetchToggle, setFetchToggle] =  useState(false);

useEffect(()=>{
  (async()=>{
    const response = await getParent()
    setSuccess(response)
    
  })()
}, [fetchToggle])
return {success,
refetch : ()=> setFetchToggle(!fetchToggle)}
};
export default useGetParent;

