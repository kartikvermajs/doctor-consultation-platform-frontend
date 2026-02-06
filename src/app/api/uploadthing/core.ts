// frontend/src/app/api/uploadthing/core.ts
import { createUploadthing } from "uploadthing/next";
import { verifyJwt } from "@/lib/verifyUploadthingAuth";

const f = createUploadthing();

export const ourFileRouter = {
  medicalDocuments: f({
    image: { maxFileSize: "8MB" },
    pdf: { maxFileSize: "16MB" },
  })
    .middleware(async ({ req }) => {
      const authHeader = req.headers.get("authorization");

      if (!authHeader) {
        throw new Error("Unauthorized");
      }

      const token = authHeader.replace("Bearer ", "");
      const user = verifyJwt(token);

      if (!user || user.type !== "doctor") {
        throw new Error("Unauthorized");
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      // metadata.userId is available here
      return {
        url: file.url,
        key: file.key,
      };
    }),
};

export type OurFileRouter = typeof ourFileRouter;
