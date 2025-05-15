"use client";
import { createCategory } from "@/app/actions/category";
import { Category } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useActionState } from "react";

export type FormCategoryProps = {
  options: Category[];
};

const FormCategory: React.FC<FormCategoryProps> = ({ options = [] }) => {
  const [pending, formAction] = useActionState(createCategory, {
    success: false,
    errors: {},
    data: null,
  });
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
        <form action={formAction}>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Name</Label>
              <Input placeholder="name" name="name" />
            </div>
            <div>
              <Label>Parent</Label>
              <Select name="parentId">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-- Parent category --" />
                </SelectTrigger>
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
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add New Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormCategory;
