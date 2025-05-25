"use server";
import { apiFetch } from "@/app/lib/apiFetch";
import { Product } from "@/app/lib/definitions";
import { ProductFormSchemaType } from "../lib/schemas";

type FormState<T> = {
  success: boolean;
  data?: T | null;
  errors?: Record<string, string[]> | null;
};

export async function createProduct(payload: ProductFormSchemaType) {
  return apiFetch<Product>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}
export async function updateProduct(payload: ProductFormSchemaType) {
  return apiFetch<Product>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}
export async function getProducts(params?: any) {
  return apiFetch<Product[]>("/products", {
    method: "GET"
  })
}