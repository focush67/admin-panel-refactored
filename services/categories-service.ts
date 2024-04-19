import { db } from "@/utilities/database";
import { getSelf } from "./user-service";

export const getCategories = async () => {
  const self = await getSelf();
  if (!self) {
    throw new Error("Categories service access denied, login required");
  }

  const categories = await db.category.findMany({
    where: {
      creatorId: self.id,
    },
  });

  return categories;
};
