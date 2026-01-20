import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

export interface MetaConfig {
  styling?: {
    listExtraPadding?: boolean;
  };
}

export interface Post {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
  readingTime: string;
  image?: string;
  meta?: MetaConfig;
}

function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string): Omit<Post, "meta"> {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);
  const { text: readingTimeText } = readingTime(content);

  return {
    title: data.title,
    description: data.description,
    date: data.date,
    slug: path.basename(filePath, ".mdx"),
    content,
    readingTime: readingTimeText,
    image: data.image,
  };
}

function readMetaConfig(source: "blog" | "space"): MetaConfig | undefined {
  const metaFilePath = path.join(process.cwd(), "content", source, "meta.json");
  try {
    if (fs.existsSync(metaFilePath)) {
      const metaFileContent = fs.readFileSync(metaFilePath, "utf-8");
      return JSON.parse(metaFileContent) as MetaConfig;
    }
  } catch (error) {
    console.error(`Error reading or parsing meta.json for ${source}:`, error);
  }
  return undefined;
}

function getMDXData(source: "blog" | "space"): Post[] {
  const contentDir = path.join(process.cwd(), "content", source);
  const mdxFiles = getMDXFiles(contentDir);
  const metaConfig = readMetaConfig(source);

  const posts = mdxFiles.map((file) => {
    const postData = readMDXFile(path.join(contentDir, file));
    return { ...postData, meta: metaConfig };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPosts(): Post[] {
  return getMDXData("blog");
}

export function getSpaceEntries(): Post[] {
  return getMDXData("space");
}

export function getPost(source: "blog" | "space", slug: string): Post | null {
  const contentDir = path.join(process.cwd(), "content", source);
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const metaConfig = readMetaConfig(source);

  try {
    const postData = readMDXFile(filePath);
    return { ...postData, meta: metaConfig };
  } catch {
    return null;
  }
}
