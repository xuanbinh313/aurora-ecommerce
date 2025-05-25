"use client";

import { ColumnDef } from "@tanstack/react-table";

import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "../../components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/app/lib/definitions";
import Image from "next/image";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const thumbnail = row.original.thumbnail as Product["thumbnail"];
      console.log(thumbnail, thumbnail?.media_type.split("/")[1]);
      const path = thumbnail
        ? `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}/${thumbnail.src}${thumbnail.name}_thumbnail.${thumbnail.media_type.split("/")[1]}`
        : null;
      return (
        <>
          <div className="w-[80px] flex items-center">
            {path && (
              <img
                className="rounded-md w-11 h-11 object-cover"
                src={path}
                alt="Product Image"
              />
            )}
            <strong>{row.getValue("name")}</strong>
          </div>
        </>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const categories = row.getValue("categories") as Product["categories"];
      return (
        <>
          {categories.slice(0, 2).map((cat) => (
            <Badge
              key={cat.id}
              variant="outline"
              className="mr-2 mb-2 rounded-md"
            >
              {cat.name}
            </Badge>
          ))}
        </>
      );
    },

    // cell: ({ row }) => {
    //   const label = labels.find((label) => label.value === row.original.label);

    //   return (
    //     <div className="flex space-x-2">
    //       {label && <Badge variant="outline">{label.label}</Badge>}
    //       <span className="max-w-[500px] truncate font-medium">
    //         {row.getValue("title")}
    //       </span>
    //     </div>
    //   );
    // },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    // cell: ({ row }) => {
    //   const status = statuses.find(
    //     (status) => status.value === row.getValue("status")
    //   );

    //   if (!status) {
    //     return null;
    //   }

    //   return (
    //     <div className="flex w-[100px] items-center">
    //       {status.icon && (
    //         <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
    //       )}
    //       <span>{status.label}</span>
    //     </div>
    //   );
    // },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "visibility",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visibility" />
    ),
    // cell: ({ row }) => {
    //   const priority = priorities.find(
    //     (priority) => priority.value === row.getValue("priority")
    //   );

    //   if (!priority) {
    //     return null;
    //   }

    //   return (
    //     <div className="flex items-center">
    //       {priority.icon && (
    //         <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
    //       )}
    //       <span>{priority.label}</span>
    //     </div>
    //   );
    // },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
