import React from "react";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../services/apiService.types";

interface RequireRoleProps {
  minRole: UserRole;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const roleOrder: UserRole[] = ["viewer", "analyst", "admin"];

export const RequireRole: React.FC<RequireRoleProps> = ({
  minRole,
  children,
  fallback = null,
}) => {
  const { user } = useAuth();
  if (!user) return fallback;

  const userIndex = roleOrder.indexOf(user.role);
  const minIndex = roleOrder.indexOf(minRole);

  if (userIndex === -1 || userIndex < minIndex) {
    return fallback;
  }

  return <>{children}</>;
};

