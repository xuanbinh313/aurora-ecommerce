"use client";
import { ProductFormSchemaType } from "@/app/lib/schemas";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export const ImageThumbnail = () => {
  const form = useFormContext<ProductFormSchemaType>();
  const [previewUrl, setPreviewUrl] = useState<string>("/next.svg");
  useEffect(() => {
    const thumbnail = form.watch("thumbnail");
    if (thumbnail) {
      const path = `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}/${thumbnail.src}${thumbnail.name}_medium.${thumbnail.media_type.split("/")[1]}`;
      setPreviewUrl(path);
    }
  }, [form.watch("thumbnail")]);
  return (
    <Card>
      <CardContent className="space-y-2">
        <div className="flex flex-col items-center justify-center">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full rounded-md object-cover"
            onError={(e) => {
              e.currentTarget.src = "/next.svg";
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="thumbnail_files"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="justify-center">
                Click to upload a new image
              </FormLabel>
              <FormControl>
                <Input
                  className="hidden"
                  type="file"
                  placeholder="Select a file"
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(e.target.files);
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
      </CardContent>
    </Card>
  );
};

export const ImagesGallery = () => {
  const form = useFormContext<ProductFormSchemaType>();
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  useEffect(() => {
    const images = form.watch("images");
    if (images && images.length > 0) {
      const paths = images.map(
        (image) =>
          `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}/${image.src}${image.name}_medium.${image.media_type.split("/")[1]}`
      );
      setPreviewUrl(paths);
    }
  }, [form.watch("images")]);
  return (
    <Card>
      <CardContent className="space-y-2">
        <div className="flex flex-col items-center justify-center">
          {previewUrl && previewUrl.length === 0 && (
            <img
              src={"/next.svg"}
              alt={`Preview next.svg`}
              className="w-full rounded-md object-cover"
            />
          )}
        </div>
        {previewUrl && previewUrl.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {previewUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full rounded-md object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/next.svg";
                }}
              />
            ))}
          </div>
        )}
        <FormField
          control={form.control}
          name="gallery_files"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="justify-center">
                Click to upload a new image
              </FormLabel>
              <FormControl>
                <Input
                  className="hidden"
                  type="file"
                  placeholder="Select a file"
                  multiple
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      field.onChange(files);
                      const readers = Array.from(files).map((file) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPreviewUrl((prev) => [
                            ...prev,
                            reader.result as string,
                          ]);
                        };
                        reader.readAsDataURL(file);
                        return reader;
                      });
                      // e.target.value = "";
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
