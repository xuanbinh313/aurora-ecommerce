"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const productFormSchema = z.object({
  id: z.string({
    required_error: "Please select a id to display.",
  }),
  idType: z.string({
    required_error: "Please select an email to display.",
  }),
  categoryId: z.string(),
  title: z.string({ required_error: "Title is required." }),
  brand: z.string(),
  manufacturer: z.string(),
  mfrPartNumber: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  images: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  width: z.number(),
  height: z.number(),
  length: z.number(),
  productAttributes: z.number(),
  variants: z.number(),
  tags: z.array(
    z.object({
      value: z.string().url({ message: "Please enter a valid URL." }),
    })
  ),
  price: z.number(),
  salePrice: z.number(),
  hasTax: z.boolean(),
  tax: z.number(),
  stock: z.number(),
  trackQuantity: z.boolean(),
  continueSellingWhenOutOfStock: z.boolean(),
  shippingType: z.string(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProductFormValues> = {
  id: "",
  name: "I own a computer.",
  tags: [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
};

export function NameDescriptionForm() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "tags",
    control: form.control,
  });

  function onSubmit(data: ProductFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
