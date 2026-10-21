import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brandColors } from "@/lib/brand";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.headline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const fontData = await readFile(
    join(process.cwd(), "app/fonts/source-sans-3-600.woff2"),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: brandColors.paper,
        color: brandColors.ink,
        padding: "72px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          color: brandColors.burgundy,
        }}
      >
        <div
          style={{
            width: 28,
            height: 36,
            display: "flex",
            borderLeft: `6px solid ${brandColors.burgundy}`,
            borderBottom: `6px solid ${brandColors.burgundy}`,
            transform: "skewX(-18deg)",
            marginTop: 4,
          }}
        />
        <div
          style={{
            height: 10,
            flex: 1,
            backgroundColor: brandColors.burgundy,
            marginLeft: -2,
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: brandColors.stone,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.08,
            maxWidth: 960,
          }}
        >
          {site.headline}
        </div>
      </div>
      <div
        style={{
          fontSize: 24,
          color: brandColors.stone,
        }}
      >
        {site.tagline}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Source Sans 3",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
