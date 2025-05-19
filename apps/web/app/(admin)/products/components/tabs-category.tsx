"use client";
import { apiFetch } from "@/app/lib/apiFetch";
import { Category, ProductFormSchemaType } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { cx } from "class-variance-authority";
import { Fragment, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import FormCategory from "./form-category";

const FormSchema = z.object({
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  parent_id: z.string().optional(),
});

const CategoryContent = () => {
  const formProduct = useFormContext<ProductFormSchemaType>();
  const { data, isFetching } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => apiFetch<Category[]>("/categories"),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }
  const [selected, setSelected] = useState<string[]>([]);
  const handleToggle = (option: string) => {
    const updatedSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    setSelected(updatedSelected);
  };
  const renderCategories = (
    categories: Category[],
    parentId: number | null = null,
    level = 0
  ) => {
    return categories
      .filter((category) => category.parent_id === parentId)
      .map((category) => (
        <Fragment key={category.id}>
          <FormField
            control={formProduct.control}
            name="categories"
            render={({ field }) => (
              <FormItem
                className={cx(
                  `ml-${level * 5}`,
                  "flex flex-row items-start space-x-3 space-y-0"
                )}
              >
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(category.id.toString())}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([
                            ...field.value,
                            category.id.toString(),
                          ])
                        : field.onChange(
                            field.value?.filter(
                              (value) => value !== category.id.toString()
                            )
                          );
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  {category.name}
                </FormLabel>
              </FormItem>
            )}
          />
          {renderCategories(categories, category.id, level + 1)}
        </Fragment>
      ));
  };

  return (
    <>
      <Card>
        <CardContent className="space-y-2">
          <FormField
            control={formProduct.control}
            name="categories"
            render={() => (
              <FormItem>
                {renderCategories(data || [])}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormCategory options={data || []} />
        </CardContent>
      </Card>
    </>
  );
};

const TabsCategory = () => {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">All Categories</TabsTrigger>
        <TabsTrigger value="password">Most Used</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <CategoryContent />
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabsCategory;
