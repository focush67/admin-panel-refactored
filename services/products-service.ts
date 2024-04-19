import { db } from "@/utilities/database";
import { getSelf } from "./user-service";

export const getProducts = async () => {
  const self = await getSelf();
  if (!self) {
    throw new Error("Service at Products not accessible, login required");
  }

  const products = await db.product.findMany({
    where: {
      ownerId: self.id,
    },
    include: {
      photos: true,
      productCategory: true,
    },
  });
  return products;
};
