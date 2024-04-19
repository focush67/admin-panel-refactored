"use server";

import { getSelf } from "@/services/user-service";
import { db } from "@/utilities/database";
import { revalidatePath } from "next/cache";

export const createCategory = async ({
  name,
  cover,
}: {
  name: string;
  cover: string;
}) => {
  const self = await getSelf();
  if (!self) {
    throw new Error("Server action failed for category");
  }
  const newCategory = await db.category.create({
    data: {
      creatorId: self.id,
      name: name,
      cover: cover,
    },
  });

  console.log("New category created ", newCategory);
  revalidatePath("/categories");
  return newCategory;
};
