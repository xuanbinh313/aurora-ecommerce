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
    thumbnail: z.object({
        src: z.string(),
    }).optional(),
    regular_price: z.string().optional(),
    sale_price: z.string().optional(),
    sale_price_dates: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }).optional(),
    isSetSalePriceDates: z.boolean(),
    status: StatusEnum,
    visibility: VisibilityEnum,
    file: z
        .any()
        .refine((file) => file instanceof File, {
            message: "File không hợp lệ",
        })
        .refine((file) => file.size <= 2 * 1024 * 1024, {
            message: "File size must be less than 2MB",
        })
        .refine(
            (file) => {
                const validTypes = ["image/jpeg", "image/png", "image/gif"];
                return validTypes.includes(file.type);
            },
            {
                message: "Only JPEG, PNG and GIF files are allowed",
            }
        )
        .optional(),
});
export type ProductFormSchemaType = z.infer<typeof ProductFormSchema>;