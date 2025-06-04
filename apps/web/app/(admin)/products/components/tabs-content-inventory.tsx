import { ProductFormSchemaType } from "@/app/lib/schemas";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function TabsContentInventory() {
  const form = useFormContext<ProductFormSchemaType>();
  const date = form.getValues("sale_price_dates");
  const isSetSalePriceDates = form.watch("isSetSalePriceDates");
  return (
    <TabsContent value="inventory">
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
          <CardDescription>
            Manage your inventory and stock status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="regular_price"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="SKU" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sale_price"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Stock management</FormLabel>
                <FormControl>
                  <Input placeholder="Stock management" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sale_price"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Stock status</FormLabel>
                <FormControl>
                  <Input placeholder="Stock management" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sale_price"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Sold individually</FormLabel>
                <FormControl>
                  <Input placeholder="Stock management" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isSetSalePriceDates ? (
            <Button
              type="button"
              onClick={() => {
                form.setValue("isSetSalePriceDates", !isSetSalePriceDates);
              }}
              variant={"link"}
            >
              Schedule
            </Button>
          ) : (
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="sale_price_dates"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Sale Price Dates</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "LLL dd, y")} -{" "}
                                  {format(date.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(date.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={field.value}
                            onSelect={field.onChange}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => {
                  form.setValue("isSetSalePriceDates", !isSetSalePriceDates);
                }}
                variant={"link"}
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
