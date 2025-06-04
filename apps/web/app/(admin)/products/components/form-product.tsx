"use client";

import { createProduct, updateProduct } from "@/app/actions/product";
import { Media, Product } from "@/app/lib/definitions";
import { ProductFormSchema, ProductFormSchemaType } from "@/app/lib/schemas";
import { ImagesGalleryModal } from "@/components/media-modal/media-modal";
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
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { PropertiesTab } from "./properties-tabs";
import StatusCard from "./status-card";
import TabsCategory from "./tabs-category";

interface ProductFormProps {
  product?: Product;
  type?: "create" | "edit";
}

export function FormProduct({ product, type = "create" }: ProductFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState<Media | null>(null);
  const [images, setImages] = useState<Media[]>([]);
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
      thumbnail_id: undefined,
      image_ids: [],
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
    console.log("Form values:", values);
    values.id ? mutateUpdateProduct(values) : mutateCreateProduct(values);
  };

  useEffect(() => {
    if (product) {
      form.reset({
        ...product,
        categories: product.categories.map((category) =>
          category.id.toString()
        ),
        sale_price_dates: {
          from: product.sale_price_dates?.from
            ? new Date(product.sale_price_dates.from)
            : new Date(),
          to: product.sale_price_dates?.to
            ? new Date(product.sale_price_dates.to)
            : addDays(new Date(), 7),
        },
        isSetSalePriceDates: !!product.sale_price_dates,
        image_ids: product.images?.map((img) => img.id.toString()) || [],
        regular_price: product.regular_price
          ? product.regular_price.toString()
          : "",
        sale_price: product.sale_price ? product.sale_price.toString() : "",
        thumbnail_id: product.thumbnail_id?.toString() || null,
      });
    }
    product?.thumbnail && setThumbnail(product.thumbnail);
    product?.images.length && setImages(product.images);
  }, [product, form]);
  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(handleSubmit, (error) =>
          console.log(error)
        )}
      >
        <div className="grid md:grid-cols-6 2xl:grid-cols-5 gap-3">
          <div className="md:col-span-4 2xl:col-span-4 space-y-4">
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
          <div className="md:col-span-2 2xl:col-span-1 flex flex-col gap-3">
            <StatusCard />
            <FormField
              control={form.control}
              name="thumbnail_id"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <ImagesGalleryModal
                      {...field}
                      value={thumbnail}
                      onChange={(value) => {
                        setThumbnail(value as Media | null);
                        field.onChange((value as Media | null)?.id?.toString());
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_ids"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Image Gallery</FormLabel>
                  <FormControl>
                    <ImagesGalleryModal
                      {...field}
                      multiple
                      value={images || []}
                      onChange={(value) => {
                        field.onChange((value as Media[]).map(img=>img.id.toString()));
                        setImages(value as Media[]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TabsCategory />
          </div>
        </div>
      </form>
    </Form>
  );
}
