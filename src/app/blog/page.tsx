import { ContentCard } from "@/components/card/content-card";
import { instrument } from "@/lib/custom-font";
import { blogMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/mdx/utils/mdx";

export const metadata = blogMetadata;

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1
        className={`text-center text-3xl leading-tight tracking-tighter sm:text-5xl ${instrument.className}`}
      >
        blog
      </h1>
      <div className="space-y-4 pt-1">
        {posts.map((post) => (
          <div key={post.slug}>
            <ContentCard
              title={post.title}
              description={post.description}
              href={`/blog/${post.slug}`}
              date={post.date}
              readingTime={post.readingTime}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
