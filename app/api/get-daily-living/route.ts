import { BASE_URL } from "@/config";

export async function GET(request: Request) {
    try {
        if (!BASE_URL) {
            return new Response('BASE url not found', {
                status: 404,
                statusText: 'failed'
            });
        }

        const response = await fetch(`${BASE_URL}/daily_living/`, request);
        const result = await response.json();

        const totalsPerChild = result.map((entry: { total: any; }) => entry.total);

        return new Response(JSON.stringify({ totals: totalsPerChild }), {
            status: 200,
            statusText: "success"
        });
    } catch (error: any) {
        return new Response(error.message, {
            status: 500,
            statusText: "failed"
        });
    }
}
