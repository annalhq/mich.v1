"use client";

import { ReactNode } from "react";

import { Navigation } from "@/components/nav";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4">
        <main className="mt-8">{children}</main>
      </div>
    </div>
  );
}
