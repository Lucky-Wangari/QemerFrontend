
import { useState, useEffect} from "react";
import { postChv } from "../utilities/utils";
import { useRouter } from "next/navigation";
import useGetCHV from "./getChv";

interface ChvData{
  username: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  gender: string,
  password: string,}
  
const useCreateCHV = (chvData:ChvData) => {
  const router = useRouter();
const [success, setSuccess] = useState<object>();
const results = useGetCHV()

const handleCreateCHV = async()=>{
  const response = await postChv(chvData)
  results.refetch()
  response.message? router.push('/ChvTables'):null

  
  setSuccess(response)
}

return {success, handleCreateCHV}
};
export default useCreateCHV;







