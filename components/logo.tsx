import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/lib/brand";
import { site } from "@/lib/site";

type LogoProps = {
  priority?: boolean;
};

export function Logo({ priority = false }: LogoProps) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className="inline-flex">
      <Image
        src={brandAssets.logoPrimary}
        alt=""
        width={148}
        height={33}
        priority={priority}
        className="h-8 w-auto"
      />
    </Link>
  );
}
