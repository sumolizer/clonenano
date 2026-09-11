"use client";

import { createContext, useContext } from "react";

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const DashboardUserContext = createContext<DashboardUser | null>(null);

export function useDashboardUser(): DashboardUser {
  const user = useContext(DashboardUserContext);
  if (!user) {
    throw new Error("useDashboardUser must be used within DashboardShell");
  }
  return user;
}
