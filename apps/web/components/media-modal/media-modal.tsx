"use client";
import { getMedias } from "@/app/actions/media";
import { Media } from "@/app/lib/definitions";
import {
  TabSelectMediaContent,
  TabUploadMediaContent,
} from "@/components/media-modal/tabs-media-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface ImagesGalleryModalProps {
  multiple?: boolean;
  value?: Media[] | Media | null;
  onChange?: (value: Media[] | Media | null) => void;
}

export function ImagesGalleryModal({
  multiple,
  value,
  onChange,
}: ImagesGalleryModalProps) {
  const { data } = useQuery({
    queryKey: ["galleries"],
    queryFn: getMedias,
  });
  const [open, setOpen] = useState(false);
  const handleChange = (newValue: Media[] | Media | null) => {
    onChange?.(newValue);
    setOpen(false);
  };
  return (
    <>
      <Card>
        <CardContent className="space-y-2">
          {multiple ? (
            <div className="grid grid-cols-3 gap-4">
              {Array.isArray(value) &&
                value !== null &&
                value.map((url, index) => {
                  const imageUrl = `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}/${url.src}${url.name}_medium.${url.media_type.split("/")[1]}`;
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
          ) : (
            <div className="flex items-center justify-center">
              {value ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}/${(value as Media).src}${(value as Media).name}_medium.${(value as Media).media_type.split("/")[1]}`}
                  alt="Selected Gallery"
                  className="w-full rounded-md object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/next.svg";
                  }}
                />
              ) : (
                <p>No gallery selected</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <Button type="button" onClick={() => setOpen((prev) => !prev)} variant="outline">
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
          <Tabs defaultValue="media">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="media">All media</TabsTrigger>
              <TabsTrigger value="upload">Add new</TabsTrigger>
            </TabsList>
            <TabsContent value="media">
              {multiple ? (
                <TabSelectMediaContent<true>
                  options={data?.data || []}
                  value={Array.isArray(value) ? value : []}
                  onChange={handleChange}
                  multiple={true}
                />
              ) : (
                <TabSelectMediaContent
                  options={data?.data || []}
                  value={value as Media | null}
                  onChange={handleChange}
                  multiple={false}
                />
              )}
            </TabsContent>
            <TabsContent value="upload">
              <TabUploadMediaContent />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
