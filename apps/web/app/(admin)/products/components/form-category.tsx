import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  parentId: z.string().optional(),
});

const FormCategory = () => {
  const form = useForm<z.infer<typeof FormSchema>>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="link">
          <PlusIcon />
          Add new category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>
        <div className="space-y-1">
          <Input id="name" defaultValue="Pedro Duarte" />
        </div>
        <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="-- Parent category --" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="living_room">Living Room</SelectItem>
                  <SelectItem value="bed_room">Bed Room</SelectItem>
                  <SelectItem value="kitchen">Kitchen</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Add New Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormCategory;
