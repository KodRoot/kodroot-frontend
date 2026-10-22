import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { launch } from "chrome-launcher";
import lighthouse, { desktopConfig } from "lighthouse";

const routes = ["/", "/discuss-your-project", "/privacy", "/terms"];
const port = Number(process.env.LIGHTHOUSE_PORT ?? 4174);
const origin = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${port}`;

async function waitForServer(url) {
  const started = Date.now();
  while (Date.now() - started < 90_000) {
    try {
      await fetch(url, { redirect: "manual" });
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function startServer() {
  if (process.env.PLAYWRIGHT_BASE_URL) {
    return null;
  }
  const child = spawn(
    "npx",
    ["next", "start", "--hostname", "127.0.0.1", "--port", String(port)],
    { stdio: "inherit", env: { ...process.env, PORT: String(port) } },
  );
  await waitForServer(origin);
  return child;
}

async function audit(url, formFactor, chrome) {
  const options = {
    port: chrome.port,
    output: ["json", "html"],
    logLevel: "error",
    formFactor,
    screenEmulation:
      formFactor === "desktop"
        ? {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
          }
        : {
            mobile: true,
            width: 390,
            height: 844,
            deviceScaleFactor: 2,
            disabled: false,
          },
  };

  let result;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    result = await lighthouse(
      url,
      options,
      formFactor === "desktop" ? desktopConfig : undefined,
    );
    if (!result) {
      throw new Error(`No Lighthouse result for ${url} (${formFactor})`);
    }
    if (!result.lhr.runtimeError) {
      return result;
    }
    console.error(
      JSON.stringify({
        url,
        formFactor,
        attempt,
        runtimeError: result.lhr.runtimeError.code,
      }),
    );
  }
  return result;
}

function scoreOf(result, category) {
  const value = result.lhr.categories[category]?.score;
  return value == null ? null : Math.round(value * 100);
}

const child = await startServer();
await mkdir("reports/lighthouse", { recursive: true });

const chrome = await launch({
  chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
});

const rows = [];
try {
  for (const route of routes) {
    for (const formFactor of ["mobile", "desktop"]) {
      const url = new URL(route, origin).toString();
      const result = await audit(url, formFactor, chrome);
      const slug = `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${formFactor}`;
      const html = Array.isArray(result.report)
        ? result.report[1]
        : result.report;
      await writeFile(`reports/lighthouse/${slug}.html`, html);
      const row = {
        route,
        formFactor,
        performance: scoreOf(result, "performance"),
        accessibility: scoreOf(result, "accessibility"),
        bestPractices: scoreOf(result, "best-practices"),
        seo: scoreOf(result, "seo"),
        lcp: result.lhr.audits["largest-contentful-paint"]?.displayValue ?? "",
        cls: result.lhr.audits["cumulative-layout-shift"]?.displayValue ?? "",
        tbt: result.lhr.audits["total-blocking-time"]?.displayValue ?? "",
        runtimeError: result.lhr.runtimeError?.code ?? null,
      };
      rows.push(row);
      console.log(JSON.stringify(row));
    }
  }
} finally {
  await chrome.kill();
  child?.kill();
}

await writeFile(
  "reports/lighthouse/summary.json",
  `${JSON.stringify(rows, null, 2)}\n`,
);
