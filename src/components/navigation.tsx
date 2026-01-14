"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Search from "@/components/search/index";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  const pathname = usePathname();

  const mainLinks = [
    { href: "/space", label: "space" },
    { href: "/blog", label: "blog" },
  ];

  return (
    <div className="py-6">
      <nav className="mx-auto w-full max-w-fit px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-accent px-4 py-2">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-foreground"
            )}
          >
            ann
          </Link>

          <div className="hidden h-4 w-px bg-border sm:block" />

          <div className="flex flex-wrap items-center gap-4">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  pathname === link.href
                    ? "font-medium text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Search />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
}
