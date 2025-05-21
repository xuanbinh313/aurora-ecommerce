"use client";
import { ProductFormSchemaType } from "@/app/lib/schemas";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const ImageThumbnail = () => {
  const form = useFormContext<ProductFormSchemaType>();
  const [previewUrl, setPreviewUrl] = useState<string>("/next.svg");
  console.log("ImageThumbnail", form.getValues());
  return (
    <Card>
      <CardContent className="space-y-2">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="shadcn"
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewUrl(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center justify-center">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full rounded-md object-cover"
            onError={(e) => {
              e.currentTarget.src = "/next.svg";
            }}
          />
          <p className="text-sm text-muted-foreground">
            Click to upload a new image
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageThumbnail;
