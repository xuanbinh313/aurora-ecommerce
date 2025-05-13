"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useFormContext } from "react-hook-form";
import { z } from "zod";

// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cx } from "class-variance-authority";
import { ProductFormSchema } from "../[...action]/product-form";
import FormCategory from "./form-category";
const items = [
  {
    id: "recents",
    label: "Recents",
    parent: null,
  },
  {
    id: "home",
    label: "Home",
    parent: "recents",
  },
  {
    id: "applications",
    label: "Applications",
    parent: "recents",
  },
  {
    id: "desktop",
    label: "Desktop",
    parent: "recents",
  },
  {
    id: "downloads",
    label: "Downloads",
    parent: null,
  },
  {
    id: "documents",
    label: "Documents",
    parent: "recents",
  },
] as const;

const FormSchema = z.object({
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  parentId: z.string().optional(),
});

const CategoryContent = () => {
  const formProduct = useFormContext<z.infer<typeof ProductFormSchema>>();

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
  return (
    <>
      <Card>
        <CardContent className="space-y-2">
          <FormField
            control={formProduct.control}
            name="categories"
            render={() => (
              <FormItem>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={formProduct.control}
                    name="categories"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className={cx(
                            item.parent && "ml-5",
                            "flex flex-row items-start space-x-3 space-y-0"
                          )}
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormCategory />
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
