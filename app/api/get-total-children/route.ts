import { BASE_URL } from "@/app/config";

export async function GET() {
  try {
    if (!BASE_URL) {
      return new Response('BASE url not found', {
        status: 404,
        statusText: 'failed',
      });
    }

    const response = await fetch(`${BASE_URL}/children/`);
    const data = await response.json();

    const totalChildren = data.length; 

    const responseObj = {
      total: totalChildren,
      data: data,
    };

    return new Response(JSON.stringify(responseObj), {
      status: 200,
      statusText: 'success',
    });
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
      statusText: 'failed',
    });
  }
}
