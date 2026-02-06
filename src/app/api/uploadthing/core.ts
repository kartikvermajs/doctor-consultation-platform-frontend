import { createUploadthing } from "uploadthing/next";
import { getUserFromRequest } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  medicalDocuments: f({
    image: { maxFileSize: "8MB" },
    pdf: { maxFileSize: "16MB" },
  })
    .middleware(async () => {
      const user = await getUserFromRequest();

      if (!user || user.type !== "doctor") {
        throw new Error("Unauthorized");
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.url,
        key: file.key,
      };
    }),
};

export type OurFileRouter = typeof ourFileRouter;
