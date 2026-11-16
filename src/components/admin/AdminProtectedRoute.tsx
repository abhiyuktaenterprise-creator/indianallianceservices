import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSiteConfig, ADMIN_AUTH_SESSION_VERSION } from "@/context/SiteConfigContext";

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useSiteConfig();
  const location = useLocation();

  const isSessionVersionValid = (() => {
    try {
      const ver =
        sessionStorage.getItem("acs_admin_session_version") ||
        localStorage.getItem("acs_admin_session_version");
      return ver === ADMIN_AUTH_SESSION_VERSION;
    } catch (e) {
      return false;
    }
  })();

  useEffect(() => {
    if (isAuthenticated && !isSessionVersionValid) {
      logout();
    }
  }, [isAuthenticated, isSessionVersionValid, logout]);

  if (!isAuthenticated || !isSessionVersionValid) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
