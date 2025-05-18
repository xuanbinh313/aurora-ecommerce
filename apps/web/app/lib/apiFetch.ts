"use server"
import { cookies } from "next/headers";

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
  revalidate?: number; // For ISR if needed
}

export async function apiFetch<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<T> {
  const { method = "GET", headers = {}, body, revalidate } = options || {};

  // Get the token from HTTP-only cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
      {
        ...fetchOptions,
        next: revalidate ? { revalidate } : undefined,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
