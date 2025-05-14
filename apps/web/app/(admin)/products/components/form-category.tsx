import { createCategory } from "@/app/actions/category";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormSchema } from "@/app/lib/definitions";
import { apiFetch } from "@/app/lib/apiFetch";

type Schema = z.infer<typeof CategoryFormSchema>;

const FormCategory = () => {
  const form = useForm<Schema>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
      parentId: "",
    },
  });
  const onSubmit = async (values: Schema) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log(values);
    const res = await fetch("/api/proxy/categories", {
      method: "POST",
      body: JSON.stringify(values),
    });
  };
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
        <Form {...form}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
          </div>
        </Form>

        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)} type="submit">
            Add New Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormCategory;
