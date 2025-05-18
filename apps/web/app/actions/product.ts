"use server";
import { apiFetch } from "@/app/lib/apiFetch";
import { Product, ProductFormSchemaType } from "@/app/lib/definitions";

type FormState<T> = {
  success: boolean;
  data?: T | null;
  errors?: Record<string, string[]> | null;
};

export async function createProduct(payload: ProductFormSchemaType) {
  return apiFetch<Product>("/products", {
    method: "POST",
    body: payload,
  })
}

export async function getProducts(params?: any) {
  return apiFetch<Product[]>("/products", {
    method: "GET"
  })
}