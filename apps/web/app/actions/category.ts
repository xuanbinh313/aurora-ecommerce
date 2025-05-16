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
    parentId: formData.parentId,
  };
  const [res, err] = await apiFetch<Category>("/categories", {
    method: "POST",
    body,
  });
  if (err) {
    return {
      success: false,
      errors: {
        name: err,
        parentId: err,
      },
      data: null,
    };
  }
  return {
    success: true,
    data: res,
    errors: {},
  };
}
