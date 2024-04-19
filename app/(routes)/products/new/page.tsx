import ProductForm from "@/components/others/new-product-modal";
import { getCategories } from "@/services/categories-service";
import React from "react";

const NewProductForm = async () => {
  const categories = await getCategories();

  return (
    <>
      <h1 className="text-white text-xl text-center font-bold">
        Fill Product Details
      </h1>
      <ProductForm categories={categories} />
    </>
  );
};

export default NewProductForm;
