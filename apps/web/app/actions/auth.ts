"use server";
import { LoginFormSchema } from "@/app/lib/definitions";
import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  await createSession(validatedFields.data.email);
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
export async function createUser(prevState: any, formData: FormData) {
  const res = await fetch("http://localhost:8080/api/categories", {
    method: "POST",
    body: JSON.stringify({
      name: formData.get("name"),
      parent_id: formData.get("parent_id"),
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const json = await res.json();

  if (!res.ok) {
    return { message: "Please enter a valid email" };
  }
}
