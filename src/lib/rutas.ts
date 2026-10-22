/**
 * Rutas internas del sitio, sin el `base` de Astro.
 *
 * Centralizarlas evita repetir strings en páginas y componentes. El prefijo
 * `import.meta.env.BASE_URL` se sigue agregando con `withBase()` al renderizar.
 */
export const rutas = {
  inicio: "/",
  contacto: "/contacto",
  donar: "/donar",
  informacion: "/informacion",
  actividades: "/actividades",
  quienesSomos: "/quienes-somos",
  privacidad: "/privacidad",
} as const;
