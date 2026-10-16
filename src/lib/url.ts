/**
 * Agrega el `base` configurado en Astro a una ruta interna.
 *
 * Astro no reescribe automáticamente los `<a href>` ni las referencias a archivos en
 * `public/`, así que, cuando el sitio se publica en un subdirectorio
 * (por ejemplo, los sitios de proyectos de GitHub Pages en `/propuesta-regenesis/`),
 * hay que agregarles manualmente el prefijo `import.meta.env.BASE_URL`.
 *
 * Las URL externas, las URL relativas al protocolo, las anclas (`#id`) y los enlaces
 * `mailto:`/`tel:` se devuelven sin cambios.
 *
 * @example
 *   withBase('/about')        // -> '/propuesta-regenesis/about'
 *   withBase('/')             // -> '/propuesta-regenesis/'
 *   withBase('https://x.com') // -> 'https://x.com' (sin cambios)
 */
export function withBase(path: string | null | undefined): string {
  if (!path) return "";

  // Deja los enlaces externos, las URL relativas al protocolo, las anclas y los esquemas (mailto:, tel:, ...) tal como están.
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path;

  const base = import.meta.env.BASE_URL || "/";

  // Si no hay un base configurado (o si es la raíz), no agrega ningún prefijo.
  if (base === "/") return path;

  const normalizedBase = base.replace(/\/$/, "");

  if (path === "/") return `${normalizedBase}/`;
  return `${normalizedBase}${path.startsWith("/") ? path : `/${path}`}`;
}
