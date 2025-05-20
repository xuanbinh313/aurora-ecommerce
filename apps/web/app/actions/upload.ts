import { apiFetch } from "../lib/apiFetch";
import { ProductFormSchemaType } from "../lib/schemas";

export async function uploadFiles(payload: FormData) {
    return apiFetch<ProductFormSchemaType["thumbnail"]>("/uploads", {
        method: "POST",
        body: payload,
    })
}