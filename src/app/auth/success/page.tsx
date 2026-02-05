"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export default function AuthSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleAuthSuccess = useCallback(() => {
    const token = searchParams.get("token");
    const type = searchParams.get("type");
    const userStr = searchParams.get("user");

    if (token && type) {
      localStorage.setItem("token", token);
      localStorage.setItem("userType", type);

      if (userStr) {
        try {
          const user: UserData = JSON.parse(decodeURIComponent(userStr));
          localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      }

      const dashboard =
        type === "doctor" ? "/doctor/dashboard" : "/patient/dashboard";
      router.push(dashboard);
    }
  }, [searchParams, router]);

  useEffect(() => {
    handleAuthSuccess();
  }, [handleAuthSuccess]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-lg font-medium text-gray-700">
        Login successful! Redirecting...
      </div>
    </div>
  );
}
