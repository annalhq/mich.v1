import Image from "next/image";

import * as FadeIn from "@/components/motion/staggers/fade";
import { instrument } from "@/lib/custom-font";

export default function Odyssey() {
  return (
    <FadeIn.Container>
      <main>
        <div className="mx-auto max-w-2xl space-y-8">
          <FadeIn.Item>
            <h1
              className={`text-center text-3xl leading-tight tracking-tighter sm:text-5xl ${instrument.className}`}
            >
              odyssey
            </h1>
          </FadeIn.Item>

          <FadeIn.Item>
            <div className="flex flex-col items-center justify-center space-y-3">
              <Image
                src="/enso.png"
                alt="profile picture"
                width={400}
                height={600}
                draggable={false}
                className="select-none rounded-lg"
                priority
              />
              <h2
                className={`text-center text-sm leading-tight tracking-tighter sm:text-sm ${instrument.className}`}
              >
                welcome to my abode
              </h2>
            </div>
          </FadeIn.Item>
        </div>
      </main>
    </FadeIn.Container>
  );
}
