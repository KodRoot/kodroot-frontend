import Image from "next/image";
import { brandAssets } from "@/lib/brand";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center px-6 py-16">
      <p>
        <Image
          src={brandAssets.logoPrimary}
          alt={site.name}
          width={240}
          height={54}
          priority
        />
      </p>
      <h1>{site.headline}</h1>
      <p className="max-w-xl text-muted">{site.description}</p>
      <p>{site.tagline}</p>
    </main>
  );
}
