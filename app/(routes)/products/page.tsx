import { ExistingProducts } from "@/components/others/products-table";
import { getProducts } from "@/services/products-service";
import Link from "next/link";
import React from "react";

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <Link
          href={"/products/new"}
          className="border text-sm text-white p-3 rounded-xl"
        >
          New Product
        </Link>
      </div>
      <div className="mt-2 rounded-xl p-2">
        <ExistingProducts products={products} />
      </div>
    </div>
  );
};

export default ProductsPage;
