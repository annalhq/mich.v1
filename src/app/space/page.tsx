import { ContentCard } from "@/components/content-card";
import { instrument } from "@/lib/custom-font";
import { spaceMetadata } from "@/lib/metadata";
import { getSpaceEntries } from "@/mdx/utils/mdx";

export const metadata = spaceMetadata;

export default function SpacePage() {
  const entries = getSpaceEntries();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1
        className={`text-center text-3xl leading-tight tracking-tighter sm:text-5xl ${instrument.className}`}
      >
        space
      </h1>
      <div className="space-y-4 pt-1">
        {entries.map((entry) => (
          <div key={entry.slug}>
            <ContentCard
              title={entry.title}
              description={entry.description}
              href={`/space/${entry.slug}`}
              date={entry.date}
              readingTime={entry.readingTime}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
