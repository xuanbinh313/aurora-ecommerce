import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { FormProduct } from "../components/form-product";
import { apiFetch } from "@/app/lib/apiFetch";
import { Product } from "@/app/lib/definitions";

export default async function SettingsProfilePage({
  params,
}: {
  params: Promise<{ action: string[] }>;
}) {
  const { action } = await params;
  let type: "create" | "edit" = "create";
  let data: Product | undefined;
  if (action.length === 2 && action[1] === "edit") {
    data = await apiFetch<Product>(`/products/${action[0]}`);
    type = "edit";
  } else if (action.length === 1 && action[0] === "create") {
    console.log("create action");
    type = "create";
  }
  // else if (action.length === 1 && action[0] !== "view") {
  //   console.log("view action");
  // }
  else {
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
      <FormProduct product={data} type={type} />
    </div>
  );
}
