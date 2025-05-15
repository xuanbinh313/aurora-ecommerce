import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .trim()
    .nonempty("This field is required"),
  password: z.string().trim(),
});
export const CategoryFormSchema = z.object({
  name: z.string().trim().nonempty("This field is required"),
  parentId: z.string().optional(),
});
export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type CategoryFormState =
  | {
      errors?: {
        name?: string[];
        parentId?: string[];
      };
      message?: string;
    }
  | undefined;

export type Category = {
  id: string;
  name: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
};
