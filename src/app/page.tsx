import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { instrument } from "@/lib/custom-font";
import { rootMetadata } from "@/lib/metadata";

export const metadata = rootMetadata;

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
      <div className="w-full flex-col px-0 md:px-0 lg:px-0">
        <div className="flex items-center gap-4">
          <Image
            src="/enso.png"
            alt="profile picture"
            width={64}
            height={64}
            className="h-12 w-12 rounded-full border border-gray-800 md:h-12 md:w-12"
          />
          <h1
            className={`text-left text-xl md:text-2xl ${instrument.className}`}
          >
            annalhq
          </h1>
        </div>

        <p className="mt-8 text-[16px] md:text-[18px]">
          hey there! i am currently exploring rl, low level optimizations, and
          gpu based llm inference.
        </p>
        <p className="mt-4 text-[16px] md:text-[18px]">
          my interests include inference time systems such as vllm and sglang,
          cuda, kernel level optimizations. more broadly, where tools from
          mathematics and optimizations help explain representation learning and
          generalization in models.
        </p>
        <p className="mt-4 text-[16px] md:text-[18px]">
          interests: low level systems, hpc, cuda, oi, pacific++ & cppcon confs
        </p>

        <div className="mt-4 flex gap-4 md:gap-8">
          <Link
            href="https://github.com/annalhq"
            className="flex items-center text-[16px] underline transition-colors hover:text-neutral-400 md:text-[18px]"
          >
            <ArrowUpRight className="mr-1 h-4 w-4" /> github
          </Link>
          <Link
            href="https://zhihu.com/people/przybylski"
            className="flex items-center text-[16px] underline transition-colors hover:text-neutral-400 md:text-[18px]"
          >
            <ArrowUpRight className="mr-1 h-4 w-4" /> 知乎
          </Link>
        </div>

        <div className="my-8 inline-block h-[2px] bg-gray-800 px-16"></div>
      </div>
    </div>
  );
}
