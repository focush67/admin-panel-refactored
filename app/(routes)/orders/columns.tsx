"use client";

import { OrdersWithProductType } from "@/types/globals";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<OrdersWithProductType>[] = [
  {
    accessorKey: "name",
    header: "Product",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "phone",
    header: "Header",
  },
];
