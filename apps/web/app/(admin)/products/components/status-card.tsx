import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

const StatusCard = () => {
  return (
    <Card>
      <CardContent className="space-y-2">
        <div className="flex justify-end">

        <Button variant="outline">Preview changes</Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <p className="text-sm font-medium text-muted-foreground">Status</p>
          </div>
          <p className="text-sm font-medium text-muted-foreground">1200</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <p className="text-sm font-medium text-muted-foreground">
              Visibility
            </p>
          </div>
          <p className="text-sm font-medium text-muted-foreground">300</p>
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          Published on
        </p>
        <p className="text-sm font-medium text-muted-foreground">
          Catalog visibility
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex flex-col">
          <Button className="flex justify-start" variant="link">Copy to a new draft</Button>
          <Button className="flex justify-start" variant="link">Move to trash</Button>
        </div>
        <Button>Update</Button>
      </CardFooter>
    </Card>
  );
};

export default StatusCard;
