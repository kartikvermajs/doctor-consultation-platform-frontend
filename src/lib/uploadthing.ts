import { generateUploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// ✅ CORRECT HELPER FOR UPLOADTHING v6
export const UploadButton = generateUploadButton<OurFileRouter>();
