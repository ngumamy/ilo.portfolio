"use client";

import Image from "next/image";

import ilorDark from "@/public/ilor-dark.png";
import ilorLight from "@/public/ilor-light.png";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
};

const BrandMark = ({ className }: BrandMarkProps) => {
  return (
    <span className={cn("ilor-mark", className)}>
      <Image
        src={ilorLight}
        alt="iLoR"
        priority
        sizes="96px"
        className="ilor-mark__img ilor-mark__img--light"
      />
      <Image
        src={ilorDark}
        alt=""
        priority
        sizes="96px"
        className="ilor-mark__img ilor-mark__img--dark"
        aria-hidden="true"
      />
    </span>
  );
};

export default BrandMark;
