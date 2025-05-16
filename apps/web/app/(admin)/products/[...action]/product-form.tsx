"use client";

import { createProduct } from "@/app/actions/product";
import {
  ProductFormSchema,
  ProductFormSchemaType,
} from "@/app/lib/definitions";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { PropertiesTab } from "../components/properties-tabs";
import StatusCard from "../components/status-card";
import TabsCategory from "../components/tabs-category";

export function ProductForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<ProductFormSchemaType>({
    defaultValues: {
      name: "",
      slug: "",
      short_description: "",
      regular_price: "",
      sale_price: "",
      sale_price_dates: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
      isSetSalePriceDates: false,
    },
    resolver: zodResolver(ProductFormSchema),
  });
  const [actionState, formAction, isPending] = useActionState(createProduct, {
    success: false,
    data: null,
    errors: {},
  });
  console.log(actionState);
  const handleSubmit = () => {
    if (formRef.current) {
      formAction(new FormData(formRef.current));
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2 ">
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input placeholder="name" name="name" />
              {actionState.errors?.name && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {actionState.errors.name}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>Slug</Label>
              <Input placeholder="Slug" name="slug" />
              {actionState.errors?.slug && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {actionState.errors.slug}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>Short Description</Label>
              <Textarea
                placeholder="short description"
                name="short_description"
              />
              {actionState.errors?.short_description && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {actionState.errors.short_description}
                </p>
              )}
            </div>
            <PropertiesTab />
          </form>
        </Form>
      </div>
      <div className="flex flex-col gap-3">
        <StatusCard />
        <TabsCategory />
      </div>
    </div>
  );
}
