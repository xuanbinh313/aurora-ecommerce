"use client";
import { createCategory } from "@/app/actions/category";
import { Category, CategoryFormSchema } from "@/app/lib/definitions";
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
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, PlusIcon } from "lucide-react";
import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type FormCategoryProps = {
  options: Category[];
};
const FormCategory: React.FC<FormCategoryProps> = ({ options = [] }) => {
  const [] = useTransition();
  const [state, formAction, pending] = useActionState(createCategory, {
    success: false,
    errors: {},
    data: null,
  });
  // 1. Define your form.
  const form = useForm<{ name: string; parentId?: string }>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
      parentId: "",
    },
  });
  const { isPending, mutate, error } = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      // handle success case with data returned from the server action
      toast({
        title: "Success",
        description: "Category created successfully",
        variant: "default",
      });
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CategoryFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // Call your server action with the form values
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.parentId) {
      formData.append("parentId", values.parentId);
    }
    mutate(formData);
  }
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols gap-4">
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
                <FormItem className="grid grid-cols gap-4">
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
                      {options?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      )) ?? <SelectItem value="none">None</SelectItem>}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Add New Category"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormCategory;
