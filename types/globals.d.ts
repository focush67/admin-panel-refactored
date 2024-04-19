import { Category, Photo, Product, Order } from "@prisma/client";
import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export type ProductType = Omit<Product, "createdAt" | "updatedAt">;

export type PropertyType = {
  name: string;
  value: string;
};

export type ProductTypeWithImages = Product & {
  productCategory: Category;
  photos: Photo[];
};

export type OrdersWithProductType = Order & Product;
