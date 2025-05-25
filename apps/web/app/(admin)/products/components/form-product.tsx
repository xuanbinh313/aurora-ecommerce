"use client";

import { createProduct, updateProduct } from "@/app/actions/product";
import { Product } from "@/app/lib/definitions";
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
import { ProductFormSchema, ProductFormSchemaType } from "@/app/lib/schemas";
import { redirect, useRouter } from "next/navigation";
import { uploadPresignedURL } from "@/app/lib/apiClient";
import { ImagesGallery, ImageThumbnail } from "./images-cards";

interface ProductFormProps {
  product?: Product;
  type?: "create" | "edit";
}

export function FormProduct({ product, type = "create" }: ProductFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
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
      thumbnail: undefined,
      images: [],
      thumbnail_files: undefined,
      gallery_files: undefined,
    },
    resolver: zodResolver(ProductFormSchema),
  });

  const { data, mutate: mutateCreateProduct } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast({
        description: (
          <div className="flex">
            <CircleCheck color="green" />
            Product created successfully
          </div>
        ),
      });
      router.push(`/products`);
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
  const { data: upload, mutate: mutateUpdateProduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      toast({
        description: (
          <div className="flex">
            <CircleCheck color="green" />
            Product created successfully
          </div>
        ),
      });
      router.push(`/products`);
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
  const handleSubmit = async (values: ProductFormSchemaType) => {
    const { thumbnail_files, gallery_files, ...rest } = values;
    if (values?.thumbnail_files && values?.thumbnail_files?.length > 0) {
      try {
        const uploadData = await uploadPresignedURL(values.thumbnail_files);
        rest.thumbnail = uploadData?.[0].url;
      } catch (error) {
        console.log("Error", error);
      }
    }
    if (values?.gallery_files && values?.gallery_files?.length > 0) {
      try {
        const uploadData = await uploadPresignedURL(values.gallery_files);
        rest.images = uploadData?.map((file) => file.url) || [];
      } catch (error) {
        console.log("Error", error);
      }
    }
    rest.id ? mutateUpdateProduct(rest) : mutateCreateProduct(rest);
  };
  useEffect(() => {
    if (product) {
      console.log("product", product);
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
        isSetSalePriceDates: !!product.sale_price_dates,
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
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-4 space-y-4">
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
            {type === "edit" && (
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
            )}
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
            <ImageThumbnail />
            <ImagesGallery />
            <TabsCategory />
          </div>
        </div>
      </form>
    </Form>
  );
}
