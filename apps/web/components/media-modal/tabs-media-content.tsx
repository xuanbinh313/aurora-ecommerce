import { uploadPresignedURL } from "@/app/lib/apiClient";
import { Media } from "@/app/lib/definitions";
import { UploadImageSchemaType } from "@/app/lib/schemas";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ImageCardCheckbox, ImageCardRadio } from "./cards-image";

export type ImagesGalleryProps<M extends boolean> = {
  options: Media[];
  multiple: M;
  value?: M extends true ? Media[] : Media | null;
  onChange?: (value: M extends true ? Media[] : Media | null) => void;
};

export function TabSelectMediaContent<M extends boolean = false>({
  options,
  multiple,
  value,
  onChange,
}: ImagesGalleryProps<M>) {
  const [selectedImages, setSelectedImages] = useState<Media[]>([]);
  const [selectedSingleImage, setSelectedSingleImage] = useState<Media | null>(
    null
  );
  const handleMediaChange = () => {
    if (multiple) {
      onChange?.(selectedImages as M extends true ? Media[] : Media | null);
    } else {
      onChange?.(
        selectedSingleImage as M extends true ? Media[] : Media | null
      );
    }
  };
  useEffect(() => {
    if (multiple) {
      setSelectedImages(value as Media[]);
    } else {
      setSelectedSingleImage(value as Media | null);
    }
  }, [value]);
  return (
    <>
      <Card>
        <CardContent className="space-y-2 h-[60vh] overflow-y-auto">
          {multiple ? (
            <ImageCardCheckbox
              data={options || []}
              value={selectedImages}
              onChange={setSelectedImages}
            />
          ) : (
            <ImageCardRadio
              data={options || []}
              value={selectedSingleImage}
              onChange={setSelectedSingleImage}
            />
          )}
        </CardContent>
      </Card>
      <div className="flex justify-end mt-4">
        <Button
          onClick={handleMediaChange}
          disabled={
            multiple ? selectedImages.length === 0 : !selectedSingleImage
          }
          type="button"
        >
          Save changes
        </Button>
      </div>
    </>
  );
}

export const TabUploadMediaContent = () => {
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  const form = useForm<UploadImageSchemaType>();

  const handleSubmit = async (values: UploadImageSchemaType) => {
    if (values?.files && values?.files?.length > 0) {
      try {
        await uploadPresignedURL(values.files);
        toast({
          description: (
            <div className="flex">
              <span className="text-green-500">
                Images uploaded successfully
              </span>
            </div>
          ),
        });
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const handleChangeInput = (files: FileList | null) => {
    if (files && files.length > 0) {
      const newUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewUrl((prev) => [...prev, ...newUrls]);
    }
  };
  return (
    <>
      <Card>
        <CardContent className="space-y-2 h-[60vh] overflow-y-auto">
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
            name="files"
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
                        handleChangeInput(files);
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
      <div className="flex justify-end mt-4">
        <Button onClick={form.handleSubmit(handleSubmit)} type="button">
          Uploads
        </Button>
      </div>
    </>
  );
};
