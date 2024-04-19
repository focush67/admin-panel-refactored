import { db } from "@/utilities/database";
import { getSelf } from "./user-service";

export const getOrders = async () => {
  const self = await getSelf();
  if (!self) {
    throw new Error("Service for orders failed, login required");
  }

  const orders = await db.order.findMany({
    where: {
      creatorId: self.id,
    },
  });
};
