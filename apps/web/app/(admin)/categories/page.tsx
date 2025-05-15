"use client";
import { createUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

export default function CategoriesPage() {
  const initialState = {
    message: "",
  };

  const [state, formAction, pending] = useActionState(createUser, initialState);
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
      </div>
      <form action={formAction}>
        <label htmlFor="name">Email</label>
        <input type="text" id="name" name="name" required />
        <p aria-live="polite">{state?.message}</p>
        <Button disabled={pending}>Create Category</Button>
      </form>
    </div>
  );
}
