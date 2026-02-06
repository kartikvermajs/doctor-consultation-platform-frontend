// "use client";

// import React, { useState } from "react";
// import { Appointment, useAppointmentStore } from "@/store/appointmentStore";
// import { UploadButton } from "@/lib/uploadthing";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Check, Copy, FileText, Trash2, X, Plus } from "lucide-react";
// import { Button } from "../ui/button";

// interface PrescriptionViewModalProps {
//   appointment: Appointment;
//   userType: "doctor" | "patient";
//   trigger: React.ReactNode;
// }

// const PrescriptionViewModal = ({
//   appointment,
//   userType,
//   trigger,
// }: PrescriptionViewModalProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [copied, setCopied] = useState(false);

//   const { uploadDocuments, deleteDocument } = useAppointmentStore();

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   const formatDate = (date: string) =>
//     new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   const copyToClipboard = async (text?: string) => {
//     if (!text) return;
//     await navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const otherUser =
//     userType === "doctor" ? appointment.patientId : appointment.doctorId;

//   const documents = appointment.documents ?? [];

//   return (
//     <>
//       <span onClick={openModal} className="cursor-pointer">
//         {trigger}
//       </span>

//       {isOpen && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             {/* ---------- HEADER ---------- */}
//             <CardHeader className="flex flex-row justify-between items-center">
//               <div className="flex items-center gap-2">
//                 <FileText className="w-5 h-5 text-green-600" />
//                 <CardTitle>Prescription & Reports</CardTitle>
//               </div>

//               <div className="flex gap-2">
//                 {appointment.prescriptionText && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() =>
//                       copyToClipboard(appointment.prescriptionText)
//                     }
//                   >
//                     {copied ? (
//                       <>
//                         <Check className="w-4 h-4 mr-1" />
//                         Copied
//                       </>
//                     ) : (
//                       <>
//                         <Copy className="w-4 h-4 mr-1" />
//                         Copy
//                       </>
//                     )}
//                   </Button>
//                 )}

//                 <Button variant="ghost" size="sm" onClick={closeModal}>
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//             </CardHeader>

//             {/* ---------- CONTENT ---------- */}
//             <CardContent className="space-y-6">
//               {/* Meta */}
//               <div className="flex justify-between">
//                 <div>
//                   <p className="font-semibold">{otherUser?.name}</p>
//                   <p className="text-sm text-gray-600">
//                     {userType === "patient"
//                       ? otherUser?.specialization
//                       : `Age: ${otherUser?.age}`}
//                   </p>
//                 </div>
//                 <div className="text-right text-sm text-gray-600">
//                   <p>{formatDate(appointment.slotStartIso)}</p>
//                   <p>{appointment.consultationType}</p>
//                 </div>
//               </div>

//               {/* Prescription text */}
//               {appointment.prescriptionText && (
//                 <div className="border border-green-200 bg-green-50 p-4 rounded">
//                   <h3 className="font-semibold mb-2">Prescription</h3>
//                   <pre className="bg-white p-3 rounded border text-sm whitespace-pre-wrap font-mono">
//                     {appointment.prescriptionText}
//                   </pre>
//                 </div>
//               )}

//               {/* Notes */}
//               {appointment.notes && (
//                 <div className="border bg-gray-50 p-4 rounded">
//                   <h3 className="font-semibold mb-2">Notes</h3>
//                   <p className="text-sm whitespace-pre-wrap">
//                     {appointment.notes}
//                   </p>
//                 </div>
//               )}

//               {/* Documents preview */}
//               {documents.length > 0 && (
//                 <div>
//                   <h3 className="font-semibold mb-2">Attached Documents</h3>

//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                     {documents.map((doc) => (
//                       <div
//                         key={doc.key}
//                         className="relative border rounded p-2 group"
//                       >
//                         <a
//                           href={doc.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           {doc.url.endsWith(".pdf") ? (
//                             <div className="flex flex-col items-center justify-center h-24">
//                               <FileText className="w-8 h-8 text-red-600" />
//                               <span className="text-xs mt-1">PDF</span>
//                             </div>
//                           ) : (
//                             <img
//                               src={doc.url}
//                               alt="document"
//                               className="w-full h-24 object-cover rounded"
//                             />
//                           )}
//                         </a>

//                         {/* Delete – doctor only */}
//                         {userType === "doctor" && (
//                           <Button
//                             size="icon"
//                             variant="destructive"
//                             className="absolute top-1 right-1 opacity-0 group-hover:opacity-100"
//                             onClick={() =>
//                               deleteDocument(appointment._id, doc.key)
//                             }
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Add documents later – doctor only */}
//               {userType === "doctor" && (
//                 <div className="border-t pt-4">
//                   <h3 className="font-semibold mb-2 flex items-center gap-2">
//                     <Plus className="w-4 h-4" />
//                     Add More Documents
//                   </h3>

//                   <UploadButton
//                     endpoint="medicalDocuments"
//                     headers={{
//                       Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     }}
//                     appearance={{
//                       button:
//                         "w-full flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50",
//                       allowedContent: "hidden",
//                     }}
//                     content={{
//                       button: (
//                         <>
//                           <Plus className="w-4 h-4 mr-2" />
//                           Upload documents
//                         </>
//                       ),
//                     }}
//                     onClientUploadComplete={(res) => {
//                       if (!res?.length) return;

//                       uploadDocuments(
//                         appointment._id,
//                         res.map((f) => ({
//                           url: f.url,
//                           key: f.key,
//                           type: "other",
//                         })),
//                       );
//                     }}
//                     onUploadError={(error) => {
//                       console.error("Upload failed", error);
//                       alert("Upload failed");
//                     }}
//                   />
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </>
//   );
// };

// export default PrescriptionViewModal;

"use client";

import React, { useState } from "react";
import { Appointment, useAppointmentStore } from "@/store/appointmentStore";
import { UploadDropzone } from "@/lib/uploadthing";
import type { UploadThingError } from "uploadthing/server";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Check, Copy, FileText, Trash2, X, Plus, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface PrescriptionViewModalProps {
  appointment: Appointment;
  userType: "doctor" | "patient";
  trigger: React.ReactNode;
}

const PrescriptionViewModal = ({
  appointment,
  userType,
  trigger,
}: PrescriptionViewModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  const { uploadDocuments, deleteDocument } = useAppointmentStore();

  const documents = appointment.documents ?? [];
  const otherUser =
    userType === "doctor" ? appointment.patientId : appointment.doctorId;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const copyToClipboard = async (text?: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confirmDelete = async (key: string) => {
    const ok = confirm(
      "Are you sure you want to permanently delete this document?",
    );
    if (!ok) return;

    setDeletingKey(key);
    try {
      await deleteDocument(appointment._id, key);
    } finally {
      setDeletingKey(null);
    }
  };

  return (
    <>
      <span onClick={() => setIsOpen(true)} className="cursor-pointer">
        {trigger}
      </span>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <CardHeader className="flex flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                <CardTitle>Prescription & Reports</CardTitle>
              </div>

              <div className="flex gap-2">
                {appointment.prescriptionText && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(appointment.prescriptionText)
                    }
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="space-y-6">
              {/* Meta */}
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{otherUser?.name}</p>
                  <p className="text-sm text-gray-600">
                    {userType === "patient"
                      ? otherUser?.specialization
                      : `Age: ${otherUser?.age}`}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{formatDate(appointment.slotStartIso)}</p>
                  <p>{appointment.consultationType}</p>
                </div>
              </div>

              {/* Prescription */}
              {appointment.prescriptionText && (
                <div className="border border-green-200 bg-green-50 p-4 rounded">
                  <h3 className="font-semibold mb-2">Prescription</h3>
                  <pre className="bg-white p-3 rounded border text-sm whitespace-pre-wrap font-mono">
                    {appointment.prescriptionText}
                  </pre>
                </div>
              )}

              {/* Notes */}
              {appointment.notes && (
                <div className="border bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <p className="text-sm whitespace-pre-wrap">
                    {appointment.notes}
                  </p>
                </div>
              )}

              {/* Documents */}
              {documents.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Attached Documents</h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.key}
                        className="relative border rounded p-2 group"
                      >
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {doc.url.endsWith(".pdf") ? (
                            <div className="flex flex-col items-center justify-center h-24">
                              <FileText className="w-8 h-8 text-red-600" />
                              <span className="text-xs mt-1">PDF</span>
                            </div>
                          ) : (
                            <img
                              src={doc.url}
                              alt="document"
                              className="w-full h-24 object-cover rounded"
                            />
                          )}
                        </a>

                        {userType === "doctor" && (
                          <Button
                            size="icon"
                            variant="destructive"
                            disabled={deletingKey === doc.key}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100"
                            onClick={() => confirmDelete(doc.key)}
                          >
                            {deletingKey === doc.key ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload */}
              {userType === "doctor" && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add more documents
                  </h3>

                  <UploadDropzone
                    endpoint="medicalDocuments"
                    headers={{
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }}
                    onUploadBegin={() => setUploading(true)}
                    onClientUploadComplete={(res) => {
                      setUploading(false);
                      if (!res || res.length === 0) return;

                      uploadDocuments(
                        appointment._id,
                        res.map((f) => ({
                          url: f.url,
                          key: f.key,
                          type: "other",
                        })),
                      );
                    }}
                    onUploadError={(error) => {
                      setUploading(false);
                      console.error(error);
                      alert("Upload failed");
                    }}
                    appearance={{
                      container:
                        "border-dashed border-2 border-gray-300 rounded-lg p-6 hover:border-green-500 transition",
                      label: "text-sm text-gray-600",
                      uploadIcon: "text-green-600",
                      allowedContent: "hidden",
                    }}
                  />

                  {uploading && (
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading…
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default PrescriptionViewModal;
