"use client";
import { getMedias } from "@/app/actions/media";
import { uploadPresignedURL } from "@/app/lib/apiClient";
import { Media } from "@/app/lib/definitions";
import { ProductFormSchemaType } from "@/app/lib/schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export const ImageThumbnail = () => {
  const form = useFormContext<ProductFormSchemaType>();
  const [previewUrl, setPreviewUrl] = useState<string>("/next.svg");
  // useEffect(() => {
  //   const thumbnail = form.watch("thumbnail");
  //   if (thumbnail) {
  //     const path = `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}/${thumbnail.src}${thumbnail.name}_medium.${thumbnail.media_type.split("/")[1]}`;
  //     setPreviewUrl(path);
  //   }
  // }, [form.watch("thumbnail")]);

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

export interface ImagesGalleryProps {
  value?: Media[];
  onChange?: (value: Media[]) => void;
}

export const ImagesGallery: React.FC<ImagesGalleryProps> = ({
  value,
  onChange,
}) => {
  const { data } = useQuery({
    queryKey: ["galleries"],
    queryFn: getMedias,
  });
  const [open, setOpen] = useState(false);
  const form = useFormContext<ProductFormSchemaType>();
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<Media[]>([]);
  // useEffect(() => {
  //   const images = form.watch("images");
  //   if (images && images.length > 0) {
  //     const paths = images.map(
  //       (image) =>
  //         `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}/${image.src}${image.name}_medium.${image.media_type.split("/")[1]}`
  //     );
  //     setPreviewUrl(paths);
  //   }
  // }, [form.watch("images")]);
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
  };

  const handleChangeInput = (files: FileList | null) => {
    if (files && files.length > 0) {
      const newUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewUrl((prev) => [...prev, ...newUrls]);
    }
  };
  const handleMediaChange = () => {
    onChange?.(selectedImages);
    setOpen(false);
  };
  return (
    <>
      <Card>
        <CardContent className="space-y-2">
          {data && data.data.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {form.getValues("images").map((url, index) => {
                const imageUrl = `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}/${url.src}${url.name}_medium.${url.media_type.split("/")[1]}`;
                const isSelected = selectedImages.some(
                  (item) => item.id === url.id
                );
                return (
                  <img
                    key={url.id}
                    src={imageUrl}
                    alt={`Gallery ${index + 1}`}
                    className="w-full rounded-md object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/next.svg";
                    }}
                  />
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
      <Button onClick={() => setOpen((prev) => !prev)} variant="outline">
        Add Gallery
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[90vh]">
          <DialogHeader>
            <DialogTitle>Media</DialogTitle>
            <DialogDescription>
              Make changes your media here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">All medias</TabsTrigger>
              <TabsTrigger value="password">Add news</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardContent className="space-y-2 h-[60vh] overflow-y-auto">
                  {data && data.data.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {data.data.map((url, index) => {
                        const imageUrl = `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}/${url.src}${url.name}_medium.${url.media_type.split("/")[1]}`;
                        const isSelected = selectedImages.some(
                          (item) => item.id === url.id
                        );
                        return (
                          <div key={url.id}>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(value) => {
                                if (!!value) {
                                  setSelectedImages((prev) => [...prev, url]);
                                } else {
                                  setSelectedImages((prev) =>
                                    prev.filter((item) => item.id !== url.id)
                                  );
                                }
                              }}
                              id={url.name}
                            />
                            <label
                              htmlFor={url.name}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              <img
                                key={index}
                                src={imageUrl}
                                alt={`Gallery ${index + 1}`}
                                className="w-full rounded-md object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "/next.svg";
                                }}
                              />
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleMediaChange}
                  disabled={!(selectedImages.length > 0)}
                  type="button"
                >
                  Save changes
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="password">
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
                <Button onClick={handleSubmit} type="button">
                  Uploads
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};
