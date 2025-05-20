import { ProductFormSchemaType, StatusEnum, VisibilityEnum } from "@/app/lib/schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const StatusCard = () => {
  const form = useFormContext<ProductFormSchemaType>();
  return (
    <Card>
      <CardContent className="space-y-2">
        <div className="flex justify-end">
          <Button variant="outline">Preview changes</Button>
        </div>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 gap-3">
                <FormLabel>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Status
                    </p>
                  </div>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="col-span-2 w-full">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {StatusEnum.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-3 gap-3">
                <FormLabel>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Visibility
                    </p>
                  </div>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="col-span-2 w-full">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {VisibilityEnum.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm font-medium text-muted-foreground">
          Published on
        </p>
        <p className="text-sm font-medium text-muted-foreground">
          Catalog visibility
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex flex-col">
          <Button className="flex justify-start" variant="link">
            Copy to a new draft
          </Button>
          <Button className="flex justify-start" variant="link">
            Move to trash
          </Button>
        </div>
        <Button>Update</Button>
      </CardFooter>
    </Card>
  );
};

export default StatusCard;
