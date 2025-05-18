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
  parent_id: string;
  created_at: string;
  updated_at: string;
};
export type ProductValues = {
  id?: number;
  name: string;
  slug?: string;
  short_description?: string;
  regular_price?: string;
  sale_price?: string;
  categories: string[];
  sale_price_dates: {
    from: Date,
    to: Date,
  },
  isSetSalePriceDates: boolean
}
export const ProductFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().nonempty("This field is required."),
  slug: z.string().optional(),
  categories: z.array(z.string().transform(val => Number(val))),
  // .refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one item.",
  // }),
  short_description: z.string().optional(),
  // images: z
  //   .array(
  //     z.object({
  //       value: z.string().url({ message: "Please enter a valid URL." }),
  //     })
  //   )
  //   .optional(),
  regular_price: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  sale_price: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  sale_price_dates: z.object({
    from: z.date(),
    to: z.date()
  }),
  isSetSalePriceDates: z.boolean(),
  status: z.string().optional(),
  visibility: z.string().optional(),

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
    from: string,
    to: string,
  },
  isSetSalePriceDates: boolean
}
