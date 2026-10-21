import Image from "next/image";
import { HomeLink } from "@/components/home-link";
import { brandAssets } from "@/lib/brand";
import { site } from "@/lib/site";

type LogoProps = {
  priority?: boolean;
  variant?: "primary" | "dark";
};

export function Logo({ priority = false, variant = "primary" }: LogoProps) {
  const src =
    variant === "dark" ? brandAssets.logoDark : brandAssets.logoPrimary;

  return (
    <HomeLink aria-label={`${site.name} home`} className="inline-flex">
      <Image
        src={src}
        alt=""
        width={148}
        height={33}
        priority={priority}
        className="h-8 w-auto"
      />
    </HomeLink>
  );
}
