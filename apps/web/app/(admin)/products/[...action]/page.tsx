import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { ProductForm } from "./product-form";

export default async function SettingsProfilePage({
  params,
}: {
  params: Promise<{ action: string[] }>;
}) {
  const { action } = await params;
  if (action.length === 2 && action[1] === "edit") {
    console.log("edit action");
  } else if (action.length === 1 && action[0] === "new") {
    console.log("create action");
  } else if (action.length === 1 && action[0] !== "new") {
    console.log("view action");
  } else {
    return notFound();
  }
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Product Details</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
      </div>
      <Separator />
      <ProductForm />
    </div>
  );
}
