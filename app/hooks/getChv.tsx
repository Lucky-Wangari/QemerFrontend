import { useState, useEffect} from "react";
import { getChv } from "../utilities/utils";

interface ChvData{
  username: string,
  first_name: string
  last_name: string,
  phone_number: string,

  gender: string,
  password: string,}

const useGetCHV = () => {
const [success, setSuccess] = useState<ChvData[]>([]);
const [fetchToggle, setFetchToggle] =  useState(false);

useEffect(()=>{
  (async()=>{
    const response = await getChv()
    setSuccess(response)
  })()

}, [fetchToggle])
return {success,
refetch : ()=> setFetchToggle(!fetchToggle)}
};
export default useGetCHV;







