"use client";

import { createProduct } from "@/app/actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useRef } from "react";
import { PropertiesTab } from "../components/properties-tabs";
import StatusCard from "../components/status-card";
import TabsCategory from "../components/tabs-category";

export function ProductForm() {
  const formRef = useRef<HTMLFormElement>(null);
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
        <form ref={formRef} action={formAction} className="space-y-4">
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
            <Textarea placeholder="short description" name="shortDescription" />
            {actionState.errors?.shortDescription && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {actionState.errors.shortDescription}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <Label>Regular price</Label>
              <Input
                type="number"
                placeholder="Regular Price"
                name="regularPrice"
              />
              {actionState.errors?.regularPrice && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {actionState.errors.regularPrice}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>Sale price</Label>
              <Input type="number" placeholder="Sale Price" name="salePrice" />
              {actionState.errors?.salePrice && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {actionState.errors.salePrice}
                </p>
              )}
            </div>
          </div>
          <PropertiesTab />
        </form>
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <StatusCard />
        <TabsCategory />
      </div>
    </div>
  );
}
