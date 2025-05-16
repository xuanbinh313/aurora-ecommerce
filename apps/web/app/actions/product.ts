"use server";
import { apiFetch } from "@/app/lib/apiFetch";
import { Product, ProductFormSchema } from "@/app/lib/definitions";

type FormState<T> = {
  success: boolean;
  data?: T | null;
  errors?: Record<string, string[]> | null;
};
export async function createProduct(
  prevState: FormState<Omit<Product, "id">>,
  payload: FormData
): Promise<FormState<Product>> {
  const formData = Object.fromEntries(payload);
  const validatedFields = ProductFormSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }
  const [data, errors] = await apiFetch<Product>("/products", {
    method: "POST",
    body: JSON.stringify(validatedFields.data),
  });

  if (errors) {
    return {
      success: false,
      errors,
      data: null,
    };
  }
  return {
    success: true,
    data,
    errors: {},
  };
}
