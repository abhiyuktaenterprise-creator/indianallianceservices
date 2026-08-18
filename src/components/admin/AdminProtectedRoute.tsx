import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSiteConfig();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
