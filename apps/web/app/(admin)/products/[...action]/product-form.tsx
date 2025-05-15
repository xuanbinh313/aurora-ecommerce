"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import TabsCategory from "../components/tabs-category";
import StatusCard from "../components/status-card";
import { PropertiesTab } from "../components/properties-tabs";
import { Label } from "@/components/ui/label";

export const ProductFormSchema = z.object({
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  name: z.string({ required_error: "Name is required." }),
  brand: z.string(),
  shortDescription: z.string(),
  images: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
  productAttributes: z.number(),
  variants: z.number(),
  // tags: z.array(
  //   z.object({
  //     value: z.string().url({ message: "Please enter a valid URL." }),
  //   })
  // ),
  price: z.number(),
  salePrice: z.number(),
  hasTax: z.boolean(),
  tax: z.number(),
  stock: z.number(),
  trackQuantity: z.boolean(),
  continueSellingWhenOutOfStock: z.boolean(),
  shippingType: z.string(),
});

export function ProductForm() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2 ">
        <form className="space-y-8">
          <div className="flex flex-col gap-3">
            <div>
              <Label>Name</Label>
              <Input placeholder="name" name="name" />
            </div>
            <div>
              <Label>Stock</Label>
              <Input placeholder="shadcn" name="shadcn" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Label>Regular price</Label>
              <Input type="number" placeholder="shadcn" name="shadcn" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Label>Sale price</Label>
              <Input type="number" placeholder="shadcn" name="shadcn" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Label>Short Description</Label>
              <Input
                type="number"
                placeholder="shadcn"
                name="shortDescription"
              />
            </div>
            <PropertiesTab />
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-3">
        <StatusCard />
        <TabsCategory />
      </div>
    </div>
  );
}
