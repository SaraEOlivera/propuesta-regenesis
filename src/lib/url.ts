/**
 * Agrega el `base` configurado en Astro a una ruta interna.
 *
 * Astro no reescribe automáticamente los `<a href>` ni las referencias a archivos en
 * `public/`, así que, cuando el sitio se publica en un subdirectorio
 * (por ejemplo, los sitios de proyectos de GitHub Pages en `/propuesta-regenesis/`),
 * hay que agregarles manualmente el prefijo `import.meta.env.BASE_URL`.
 *
 * Las rutas de página se normalizan con barra final para que coincidan con el
 * canonical y el sitemap (GitHub Pages sirve `index.html` desde `/ruta/`).
 * Los archivos con extensión (`/favicon.png`, `/materiales/guia.pdf`) no se tocan.
 *
 * Las URL externas, las URL relativas al protocolo, las anclas (`#id`) y los enlaces
 * `mailto:`/`tel:` se devuelven sin cambios.
 *
 * @example
 *   withBase('/quienes-somos') // -> '/propuesta-regenesis/quienes-somos/'
 *   withBase('/')             // -> '/propuesta-regenesis/'
 *   withBase('/favicon.png')  // -> '/propuesta-regenesis/favicon.png'
 *   withBase('https://x.com') // -> 'https://x.com' (sin cambios)
 */
/**
 * Indica si un enlace apunta a otro sitio (http/https).
 *
 * Se usa para agregar `target="_blank"` y `rel="noopener noreferrer"` de forma
 * automática en los componentes de enlace y botón.
 */
export function isExternalHref(path: string | null | undefined): boolean {
  return Boolean(path && /^https?:\/\//i.test(path));
}

export function withBase(path: string | null | undefined): string {
  if (!path) return "";

  // Deja los enlaces externos, las URL relativas al protocolo, las anclas y los esquemas (mailto:, tel:, ...) tal como están.
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path;

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.replace(/\/$/, "");

  const [, rawPath = "/", suffix = ""] = path.match(/^([^?#]*)(.*)$/) ?? [];
  const isFile = /\.[^/.]+$/.test(rawPath);
  const normalizedPath =
    rawPath === "/" ? "/" : `${rawPath.replace(/\/$/, "")}${isFile ? "" : "/"}`;

  return `${normalizedBase}${normalizedPath}${suffix}`;
}
