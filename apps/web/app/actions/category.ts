"use server";

import { apiFetch } from "@/app/lib/apiFetch";
import { Category, CategoryFormSchema } from "@/app/lib/definitions";
type FormState = {
  success: boolean;
  data?: Category | null;
  errors?: Record<string, string[]>;
};
export async function createCategory(prevState: FormState, payload: FormData) {
  const formData = Object.fromEntries(payload);
  const validatedFields = CategoryFormSchema.safeParse(formData);
  console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const res = await apiFetch<Category>("/categories", {
      method: "POST",
      body: validatedFields.data,
    });
    return {
      success: true,
      data: res,
      errors: {},
    };
  } catch (error) {
    throw error;
  }
}
