import { getSelf } from "@/services/user-service";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const self = await getSelf();
      return {
        message: "Returning Response",
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload Completed: ", { metadata, file });
      return {
        fileUrl: file.url,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
