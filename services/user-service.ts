import { db } from "@/utilities/database";
import { currentUser } from "@clerk/nextjs";

export const getSelf = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("No user is signed in to avail this service");
  }

  const signedInUser = await db.user.findUnique({
    where: {
      externalUserId: user.id,
    },
  });

  return signedInUser;
};
