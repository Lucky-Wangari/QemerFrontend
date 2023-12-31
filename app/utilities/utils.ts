import { BASE_URL } from "../config";

export const ngoLogin = async (username: string, password: string) => {
  try {
    const response = await fetch(`/api/post-login`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error logging in an ngo:", error);
    return [];
  }
};
  export const getChv = async()=>{
  const url = '/api/get-chv';
  try{
      const response = await fetch(url);
      const result = await response.json();
      console.log('ola', result);
      
      return result
  }
  catch(error:any){
      return error.message
  }
}



export const getGuardian = async()=>{
  const url = 'https://qemer-backend-764e0de661a5.herokuapp.com/api/guardians/';
  try{
      const response = await fetch(url);
      const result = await response.json();
      return result
  }
  catch(error:any){
      return error.message
  }
}


export const getTotalChildren = async()=>{
  const url = '/api/get-total-children';
  try{
      const response = await fetch(url);
      const result = await response.json();
      return result
  }
  catch(error:any){
      return error.message
  }
}


export const getTotalChvs = async()=>{
  const url = '/api/get-total-chv';
  try{
      const response = await fetch(url);
      const result = await response.json();
      return result
  }
  catch(error:any){
      return error.message
  }
}

export const getChildren = async()=>{
  const url = '/api/get-charts';

  try {
    const response = await fetch(url);
    console.log({response});
    
    if (!response.ok) {
      throw new Error('Page not found');
    }
    const result = await response.json();
    return result;
  } catch (error:any) {
    throw new Error(error.message || 'Failed to fetch guardian chart');
  }

}

export const getLocation = async()=>{
  const url = '/api/get-recovered';

  try {
    const response = await fetch(url);
    console.log({response});
    
    if (!response.ok) {
      throw new Error('Page not found');
    }
    const result = await response.json();
    return result;
  } catch (error:any) {
    throw new Error(error.message || 'Failed to fetch guardian chart');
  }

}

export const getOverview = async()=>{
  const url = '/api/get-overview';

  try {
    const response = await fetch(url);
    console.log({response});
    
    if (!response.ok) {
      throw new Error('Page not found');
    }
    const result = await response.json();
    return result;
  } catch (error:any) {
    throw new Error(error.message || 'Failed to fetch guardian chart');
  }

}



interface CreateCHVData{
  first_name: string
  last_name: string
  username: string
  password: string
  gender: string
  phone_number:string
}

export const postChv = async (chvData:CreateCHVData) => {
  try {
    const response = await fetch(`/api/post-chv`, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(chvData)
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error adding a chv:", error);
    return error;
  }
};
export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}get-user/`, {
      method: "POST",
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    return error;
  }
};



export const getParent = async()=>{
  const url = '/api/get-singlehouse';

  try {      
    const response = await fetch(url);
    console.log({response});
    
    if (!response.ok) {
      throw new Error('Page not found');
    }
    const result = await response.json();
    return result;
  } catch (error:any) {
    throw new Error(error.message || 'Failed to fetch guardian chart');
  }

}


// export async function getSingleHousehold(householdId:number) {
//   const url=`https://qemer-backend-764e0de661a5.herokuapp.com/api/guardians/${householdId}/`
//   try{
//       const response=await fetch(url)
//       if(!response.ok){
//           return `household with id ${householdId} not found`
//       }
//       const result=await response.json()
//       return result;
//   }
//   catch(error){
//       return error
//   }
// }


export async function getSelfCare() {
  const url=`https://qemer-backend-764e0de661a5.herokuapp.com/api/self_care/`
  try{
      const response=await fetch(url)
      if(!response.ok){
          return `self care with id not found`
      }
      const result=await response.json()
      return result;
  }
  catch(error){
      return error
  
  }
}


export async function getSingleHousehold(householdId: number) {
  const householdUrl = `https://qemer-backend-764e0de661a5.herokuapp.com/api/guardians/${householdId}/`;
  const selfCareUrl = `https://qemer-backend-764e0de661a5.herokuapp.com/api/self_care/`;

  try {
    const [householdResponse, selfCareResponse] = await Promise.all([
      fetch(householdUrl),
      fetch(selfCareUrl),
    ]);

    if (!householdResponse.ok || !selfCareResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const householdData = await householdResponse.json();
    const selfCareData = await selfCareResponse.json();

    // Calculate total for each child
    const childrenWithRecoveryStatus = householdData.children.map((child: any) => {
      const childSelfCareData = selfCareData.find((entry: any) => entry.child === child.id);
      const totalForChild = childSelfCareData ? childSelfCareData.total : 0;
      const isChildRecovered = totalForChild > 10;

      return {
        ...child,
        totalForChild,
        isChildRecovered,
      };
    });

    return {
      ...householdData,
      children: childrenWithRecoveryStatus,
    };
  } catch (error) {
    throw error;
  }
}


