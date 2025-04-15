import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VitalInfoForm } from "./vital-info-form";
import { NameDescriptionForm } from "./name-description-form";
import { notFound } from "next/navigation";

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
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Vital info</AccordionTrigger>
          <AccordionContent>
            <VitalInfoForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Name Description</AccordionTrigger>
          <AccordionContent>
            <NameDescriptionForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
