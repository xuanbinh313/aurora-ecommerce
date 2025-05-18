// app/api/proxy/[...path]/route.ts (Proxy API Handler)
import { apiFetch } from "@/app/lib/apiFetch";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  const { path } = await params;
  const endpoint = `/${path.join("/")}`;

  // if (!token) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const data = await apiFetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  const { path } = await params;
  console.log(path);
  const endpoint = `/${path.join("/")}`;
  console.log("Proxying to:", endpoint);

  try {
    const body = await req.json();
    const data = await apiFetch(endpoint, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
      },
      body,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in Proxy API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
