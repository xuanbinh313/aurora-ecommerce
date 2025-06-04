import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormContext } from "react-hook-form";
import { TabsContentGeneral } from "./tabs-content-general";
import { TabsContentInventory } from "./tabs-content-inventory";
import { ProductFormSchemaType } from "@/app/lib/schemas";

export function PropertiesTab() {
  const form = useFormContext<ProductFormSchemaType>();
  return (
    <Tabs
      defaultValue="general"
      className="grid grid-cols-6"
      orientation="vertical"
    >
      <div>
        <TabsList className="flex flex-col space-y-2 text-left w-full h-auto">
          <TabsTrigger className="w-full flex justify-start" value="general">
            General
          </TabsTrigger>
          <TabsTrigger className="w-full flex justify-start" value="inventory">
            Inventory
          </TabsTrigger>
          <TabsTrigger className="w-full flex justify-start" value="Shipping">
            Shipping
          </TabsTrigger>
          <TabsTrigger className="w-full flex justify-start" value="Linked">
            Linked Products
          </TabsTrigger>
          <TabsTrigger className="w-full flex justify-start" value="Attributes">
            Attributes
          </TabsTrigger>
          <TabsTrigger className="w-full flex justify-start" value="Advanced">
            Advanced
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="w-full col-span-5">
        <TabsContentGeneral />
        <TabsContentInventory />
      </div>
    </Tabs>
  );
}
