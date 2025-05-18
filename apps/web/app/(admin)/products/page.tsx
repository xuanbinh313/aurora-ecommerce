import { apiFetch } from "@/app/lib/apiFetch";
import { Product } from "@/app/lib/definitions";
import { promises as fs } from "fs";
import { Metadata } from "next";
import path from "path";
import { z } from "zod";
import { columns } from "./components/columns";
import { DataTable } from "../components/data-table";
import { taskSchema } from "./data/schema";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/(admin)/products/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}
export default async function ProductsPage() {
  const data = await apiFetch<Product[]>("/products");
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your products!
          </p>
        </div>
      </div>
      <DataTable<Product, typeof columns> data={data} columns={columns} />
    </div>
  );
}
