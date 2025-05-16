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
  id: string;
  name: string;
  parent_id: string;
  created_at: string;
  updated_at: string;
};

export const ProductFormSchema = z.object({
  name: z.string().nonempty("This field is required."),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      "Slug must be lowercase and contain only letters, numbers, and dashes.",
  }),
  categories: z
    .array(z.string()),
  // .refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one item.",
  // }),
  // brand: z.string({ required_error: "This field is required." }),
  short_description: z.string(),
  images: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  // productAttributes: z.number(),
  // variants: z.number(),
  // tags: z.array(
  //   z.object({
  //     value: z.string().url({ message: "Please enter a valid URL." }),
  //   })
  // ),
  regular_price: z.string().optional(),
  sale_price: z.string().optional(),
  sale_price_dates: z.object({
    from: z.date(),
    to: z.date()
  }),
  isSetSalePriceDates: z.boolean()
  // hasTax: z.boolean(),
  // tax: z.number(),
  // stock: z.number(),
  // trackQuantity: z.boolean(),
  // continueSellingWhenOutOfStock: z.boolean(),
  // shippingType: z.string(),
});
export type ProductFormSchemaType = z.infer<typeof ProductFormSchema>;

export interface Product {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  regular_price: number;
  sale_price: number;
  brand: string;
  images: string[];
  categories: Category[];
  created_at: string;
  updated_at: string;
}
