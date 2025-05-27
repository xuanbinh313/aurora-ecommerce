"use server";

import { apiFetch } from "@/app/lib/apiFetch";
import { Category, Media, PaginationResponse } from "@/app/lib/definitions";

export async function getMedias() {
    return apiFetch<PaginationResponse<Media>>("/uploads");
}
