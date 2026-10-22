import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const DIST = path.resolve("dist");
const config = await readFile("astro.config.mjs", "utf8");
const base = config.match(/const base = "([^"]*)"/)?.[1] ?? "";

try {
  await readdir(DIST);
} catch {
  console.error("No existe dist/. Ejecutá `npm run build` antes de verificar los enlaces.");
  process.exit(1);
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(fullPath) : fullPath;
    }),
  );

  return files.flat();
}

const htmlCache = new Map();

async function readHtml(file) {
  if (!htmlCache.has(file)) {
    htmlCache.set(file, await readFile(file, "utf8"));
  }

  return htmlCache.get(file);
}

const files = (await walk(DIST)).filter((file) => file.endsWith(".html"));
const missing = [];
let checked = 0;

function resolveTarget(hrefPath) {
  let relative = decodeURIComponent(hrefPath);

  if (base && (relative === base || relative.startsWith(`${base}/`))) {
    relative = relative.slice(base.length) || "/";
  }

  if (relative === "/" || relative === "") {
    return path.join(DIST, "index.html");
  }

  if (relative.endsWith("/")) {
    return path.join(DIST, relative, "index.html");
  }

  if (path.extname(relative)) {
    return path.join(DIST, relative);
  }

  return path.join(DIST, relative, "index.html");
}

async function checkAnchor(target, hash, source) {
  const anchor = decodeURIComponent(hash);
  if (!anchor) return;

  let content;
  try {
    content = await readHtml(target);
  } catch {
    return;
  }

  const escaped = anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(?:id|name)=["']${escaped}["']`);

  if (!pattern.test(content)) {
    missing.push({
      type: "ancla",
      source: path.relative(DIST, source),
      href: `#${hash}`,
      target: path.relative(DIST, target),
    });
  }
}

for (const file of files) {
  const content = await readHtml(file);
  const hrefs = [...content.matchAll(/href\s*=\s*["']([^"']+)["']/g)].map((match) => match[1]);

  for (const href of hrefs) {
    if (!href) continue;

    if (href.startsWith("#")) {
      if (href.length > 1) await checkAnchor(file, href.slice(1), file);
      continue;
    }

    // Enlaces externos, protocolo-relativos y esquemas especiales (mailto:, tel:, ...).
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) continue;

    const [rawPath, rawHash] = href.split("#");
    const hrefPath = rawPath.split("?")[0];

    if (!hrefPath) {
      if (rawHash) await checkAnchor(file, rawHash, file);
      continue;
    }

    const target = resolveTarget(hrefPath);
    checked++;

    try {
      await readFile(target);
    } catch {
      missing.push({
        type: "archivo",
        source: path.relative(DIST, file),
        href,
        target: path.relative(DIST, target),
      });
      continue;
    }

    if (rawHash) await checkAnchor(target, rawHash, file);
  }
}

if (missing.length > 0) {
  console.error(`✗ ${missing.length} enlace(s) o ancla(s) roto(s):`);
  for (const item of missing) {
    console.error(`  [${item.type}] ${item.href} en ${item.source} → ${item.target}`);
  }
  process.exit(1);
}

console.log(`✓ ${checked} enlaces internos verificados en ${files.length} páginas.`);
