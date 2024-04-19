import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    const address = req.nextUrl.searchParams.get('address');
    console.log("address",address)
    // Build the URL with the dynamically passed address
    const url = `https://api.footprint.network/api/v2/token/transfers?chain=Optimism&from_address=${address}`;
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'api-key': process.env.FOOTPRINT_API
        }
    };

    try {
        console.log("i m here");
        // @ts-expect-error
        const apiResponse = await fetch(url, options);
        console.log(apiResponse,"apires")
        const data = await apiResponse.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API call error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}
