"use client";
import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-stone-50">
      <Sidebar isMobile />
      <main className="flex-1">{children}</main>
    </div>
  );
};
