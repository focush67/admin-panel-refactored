"use server";

import { getSelf } from "@/services/user-service";
import { ProductType, PropertyType } from "@/types/globals";
import { db } from "@/utilities/database";
import { revalidatePath } from "next/cache";

export const createProduct = async ({
  name,
  description,
  photo,
  price,
  categoryId,
  properties,
}: {
  name: string;
  description: string;
  photo: string;
  price: number;
  categoryId: string;
  properties: PropertyType[];
}) => {
  try {
    const self = await getSelf();
    if (!self) {
      throw new Error("Server Action failed, login required");
    }

    const newProduct = await db.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
        ownerId: self.id,
      },
    });

    const propertyPromises = properties.map(async (property) => {
      const newProperty = await db.property.create({
        data: {
          name: property.name,
          value: property.value,
          productId: newProduct.id,
        },
      });
      return newProperty;
    });

    const newPhoto = await db.photo.create({
      data: {
        productId: newProduct.id,
        url: photo,
      },
    });

    const createdProperties = await Promise.all(propertyPromises);
    revalidatePath("/products");
    revalidatePath("/products/new");
    return newProduct as ProductType;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Error in Server Action at createProduct ");
  }
};

export const deleteProduct = async (productId: string) => {
  const self = await getSelf();
  if (!self) {
    throw new Error("Server action failed for product deletion");
  }
  const deletedProduct = await db.product.delete({
    where: {
      id: productId,
    },
  });

  revalidatePath("/products");

  return deletedProduct;
};
