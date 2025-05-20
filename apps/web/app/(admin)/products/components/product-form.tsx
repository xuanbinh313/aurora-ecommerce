"use client";

import { createProduct } from "@/app/actions/product";
import {
  Product,
  ProductFormSchema,
  ProductFormSchemaType,
  StatusEnum,
} from "@/app/lib/definitions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { CircleCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { PropertiesTab } from "./properties-tabs";
import StatusCard from "./status-card";
import TabsCategory from "./tabs-category";

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<ProductFormSchemaType>({
    defaultValues: {
      id: undefined,
      name: "",
      slug: "",
      short_description: "",
      categories: [],
      regular_price: "",
      sale_price: "",
      sale_price_dates: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
      isSetSalePriceDates: false,
      status: "DRAFT",
      visibility: "PRIVATE",
    },
    resolver: zodResolver(ProductFormSchema),
  });

  const { data, mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast({
        description: (
          <span>
            <CircleCheck color="green" />
            Product created successfully
          </span>
        ),
      });
    },
    onError: (error) => {
      try {
        const parsedError = JSON.parse(error.message);
        if (parsedError.errors) {
          Object.entries(parsedError.errors).forEach(([field, message]) => {
            form.setError(field as keyof ProductFormSchemaType, {
              type: "server",
              message: message as string,
            });
          });
        } else {
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : String(error),
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : String(error),
        });
      }
    },
  });
  const handleSubmit = (values: ProductFormSchemaType) => {
    mutate(values);
  };
  useEffect(() => {
    if (product) {
      form.reset({
        ...product,
        categories: product.categories.map((category) =>
          category.id.toString()
        ),
        sale_price_dates: {
          ...(product?.sale_price_dates?.from
            ? { from: new Date(product.sale_price_dates.from) }
            : {}),

          ...(product?.sale_price_dates?.to
            ? { to: new Date(product.sale_price_dates.to) }
            : {}),
        },
        // images: product.images?.map((img) => ({ value: img })) || [],
        regular_price: product.regular_price
          ? product.regular_price.toString()
          : "",
        sale_price: product.sale_price ? product.sale_price.toString() : "",
      });
    }
  }, [product, form]);
  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(handleSubmit, (error) =>
          console.log(error)
        )}
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="short_description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Short Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PropertiesTab />
          </div>
          <div className="flex flex-col gap-3">
            <StatusCard />
            <TabsCategory />
          </div>
        </div>
      </form>
    </Form>
  );
}
