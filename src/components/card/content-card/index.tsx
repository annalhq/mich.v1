"use client";

import Link from "next/link";

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
}: ContentCardProps) {
  return (
    <Link
      href={href}
      className="bg-card/95 group relative block rounded-lg border-2 border-accent p-5"
    >
      <article className="flex flex-col gap-3">
        {category && (
          <span className="bg-primary/10 inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium text-primary">
            {category}a
          </span>
        )}

        <h2 className="text-xl font-semibold leading-tight tracking-tight">
          {title}
        </h2>

        <p className="line-clamp-3 text-sm text-muted-foreground">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
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

        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
          {date && <time dateTime={date}>{date}</time>}
          {readingTime && <span className="italic">{readingTime}</span>}
        </div>
      </article>
    </Link>
  );
}
