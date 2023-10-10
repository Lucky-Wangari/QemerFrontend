import { BASE_URL } from "@/config";
export async function POST(request: Request) {
  ({BASE_URL});
  
  try {
    if (!BASE_URL) {
      return new Response("Base URL not found", {
        status: 404,
        statusText: "Failed",
      });
    }
    const requestData = await request.json().then(response=>response);
    const result = await fetch(`${BASE_URL}/healthworker/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    const responseData = await result.json();
    (responseData);
    return new Response(JSON.stringify(responseData), {
      status: 201,
      statusText: "Success",
    });

  } catch (error: any) {
    console.error(error);
    return new Response(error.message, {
      status: 500,
      statusText: "Failed",
    });
  }
}


















































// type PostData = {
//   title: string;
//   content: string;
// };

// const useCreatePost = () => {
//   const [createdPost, setCreatedPost] = useState<PostData | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const chvData = useGetCHV();

//   const createNewPost = async (postData: PostData) => {
//     setIsLoading(true);
//     try {
//       const result = await postChv(postData);
    

//       setCreatedPost(result);
//       chvData.refetch()
//       setError(null);
//     } catch (error: any) {
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     createNewPost,
//     createdPost,
//     error,
//     isLoading,
//   };
// };

// export default useCreatePost;
