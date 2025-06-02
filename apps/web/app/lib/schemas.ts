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
    thumbnail: z.object({
        id: z.string(),
        src: z.string(),
        name: z.string(),
        media_type: z.string()
    }).optional().nullable(),
    regular_price: z.string().optional(),
    sale_price: z.string().optional(),
    sale_price_dates: z.object({
        from: z.date(),
        to: z.date(),
    }).optional(),
    isSetSalePriceDates: z.boolean(),
    status: StatusEnum,
    visibility: VisibilityEnum,
    images: z.array(z.object({
        id: z.string(),
        src: z.string(),
        name: z.string(),
        media_type: z.string()
    })),
});

export type ProductFormSchemaType = z.infer<typeof ProductFormSchema>;

export const UploadImageSchema = z.object({
    files: z.custom<FileList>((val) => {
        if (!(val instanceof FileList)) {
            throw new Error("Invalid input: must be a file upload.");
        }

        if (val.length === 0) {
            throw new Error("gallery_files, Please upload at least one image.");
        }

        if (val.length > 5) {
            throw new Error("You can upload a maximum of 5 images.");
        }

        for (const file of Array.from(val)) {
            if (!file.type.startsWith("image/")) {
                throw new Error(`File "${file.name}" is not an image.`);
            }
            if (file.size > 5 * 1024 * 1024) {
                throw new Error(`File "${file.name}" is larger than 5MB.`);
            }
        }
        return true;
    }).optional()
})

export type UploadImageSchemaType = z.infer<typeof UploadImageSchema>