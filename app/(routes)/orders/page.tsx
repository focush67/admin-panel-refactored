import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const OrdersPage = async () => {
  const data = [];
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default OrdersPage;
