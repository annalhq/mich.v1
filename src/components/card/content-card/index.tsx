"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
  category?: string;
  image?: string;
}

export function ContentCard({
  title,
  description,
  href,
  date,
  readingTime,
  tags = [],
  category,
  image,
}: ContentCardProps) {
  return (
    <Link
      href={href}
      className="bg-card/95 group relative block overflow-hidden rounded-lg border-2 border-accent transition-colors hover:border-[--slate-8]"
    >
      <article
        className={cn("flex gap-4", image ? "flex-row" : "flex-col p-5")}
      >
        {image && (
          <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden sm:h-32 sm:w-32">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 112px, 128px"
            />
          </div>
        )}

        <div className={cn("flex flex-1 flex-col gap-2", image && "py-3 pr-4")}>
          {category && (
            <span className="bg-primary/10 inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium text-primary">
              {category}
            </span>
          )}

          <h2 className="text-lg font-semibold leading-tight tracking-tight sm:text-xl">
            {title}
          </h2>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary/40 text-secondary-foreground rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center gap-2 pt-1 text-xs text-muted-foreground">
            {date && <time dateTime={date}>{date}</time>}
            {date && readingTime && <span>•</span>}
            {readingTime && <span>{readingTime}</span>}
          </div>
        </div>
      </article>
    </Link>
  );
}
