import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center px-6 py-16">
      <p>
        <Image
          src="/brand/logos/logo-primary.svg"
          alt="KodRoot"
          width={240}
          height={54}
          priority
        />
      </p>
      <h1>Software built on solid foundations.</h1>
      <p>
        KodRoot is a software development company founded in Kosovo, building
        digital solutions for businesses everywhere.
      </p>
      <p>Rooted in code. Built for growth.</p>
    </main>
  );
}
