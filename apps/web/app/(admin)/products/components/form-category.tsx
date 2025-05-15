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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import { PlusIcon } from "lucide-react";
import { useActionState } from "react";

const FormCategory = () => {
  // const onSubmit = async (values: Schema) => {
  //   const formData = new FormData();
  //   Object.entries(values).forEach(([key, value]) => {
  //     formData.append(key, value);
  //   });
  //   console.log(values);
  //   const res = await fetch("/api/proxy/categories", {
  //     method: "POST",
  //     body: JSON.stringify(values),
  //   });
  // };
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
                <SelectTrigger>
                  <SelectValue placeholder="-- Parent category --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="living_room">Living Room</SelectItem>
                  <SelectItem value="bed_room">Bed Room</SelectItem>
                  <SelectItem value="kitchen">Kitchen</SelectItem>
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
