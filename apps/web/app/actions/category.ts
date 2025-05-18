"use server";

import { apiFetch } from "@/app/lib/apiFetch";
import { Category } from "@/app/lib/definitions";
import { FieldErrors } from "react-hook-form";
type FormState = {
  success: boolean;
  data?: Category | null;
  errors?: Record<string, string[]>;
};
export async function createCategory(payload: FormData) {
  const formData = Object.fromEntries(payload.entries());
  const body = {
    name: formData.name,
    parent_id: formData.parent_id,
  };
  try {
    const res = await apiFetch<Category>("/categories", {
      method: "POST",
      body,
    });
    return {
      success: true,
      data: res,
      errors: {},
    };
  } catch (error) {
    return {
      success: false,
      errors: {
        name: error,
        parent_id: error,
      },
      data: null,
    };
  }


}
