import { createUploadthing } from "uploadthing/next";
import { getUserFromAuthHeader } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  medicalDocuments: f({
    image: { maxFileSize: "8MB" },
    pdf: { maxFileSize: "16MB" },
  })
    .middleware(async ({ req }) => {
      const user = getUserFromAuthHeader(req);

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

// ✅ EXPORT THE TYPE (THIS FIXES THE ERROR)
export type OurFileRouter = typeof ourFileRouter;
