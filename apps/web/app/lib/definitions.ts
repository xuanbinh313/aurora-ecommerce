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
  parent_id: z.string().optional(),
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
        parent_id?: string[];
      };
      message?: string;
    }
  | undefined;

export type Category = {
  id: number;
  name: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
};

export const StatusEnum = z.enum(["DRAFT", "PUBLISHED"]);
export const VisibilityEnum = z.enum(["PRIVATE", "PUBLIC"]);
export const ProductFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().nonempty("This field is required."),
  slug: z.string().optional(),
  short_description: z.string().optional(),
  categories: z.array(z.string()),
  // .refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one item.",
  // }),
  // images: z
  //   .array(
  //     z.object({
  //       value: z.string().url({ message: "Please enter a valid URL." }),
  //     })
  //   )
  //   .optional(),
  regular_price: z.string().optional(),
  sale_price: z.string().optional(),
  sale_price_dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  isSetSalePriceDates: z.boolean(),
  status: StatusEnum,
  visibility: VisibilityEnum,
});
export type ProductFormSchemaType = z.infer<typeof ProductFormSchema>;

export interface Product {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  regular_price: string;
  sale_price: string;
  brand: string;
  categories: Category[];
  created_at: string;
  updated_at: string;
  sale_price_dates: {
    from: string;
    to: string;
  };
  isSetSalePriceDates: boolean;
  status: z.infer<typeof StatusEnum>;
  visibility: z.infer<typeof VisibilityEnum>;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
