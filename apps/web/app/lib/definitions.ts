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
  shortDescription: z.string(),
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
  regularPrice: z.string().optional(),
  salePrice: z.string().optional(),
  // hasTax: z.boolean(),
  // tax: z.number(),
  // stock: z.number(),
  // trackQuantity: z.boolean(),
  // continueSellingWhenOutOfStock: z.boolean(),
  // shippingType: z.string(),
});

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  regularPrice: number;
  salePrice: number;
  brand: string;
  images: string[];
  categories: Category[];
  createdAt: string;
  updatedAt: string;
}
