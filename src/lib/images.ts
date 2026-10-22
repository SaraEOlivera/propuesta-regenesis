import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";

/**
 * Caché de placeholders por imagen y ancho. Una misma foto puede pedirse en el
 * listado, el detalle y la galería; así generamos la variante LQIP una sola vez.
 */
const placeholderCache = new Map<string, Promise<string>>();

async function createPlaceholder(src: ImageMetadata, width: number): Promise<string> {
  const placeholder = await getImage({
    src,
    width,
    quality: 40,
    format: "webp",
  });

  return [
    `background-image:url("${placeholder.src}")`,
    "background-size:cover",
    "background-position:center",
    "background-repeat:no-repeat",
  ].join(";");
}

/**
 * Genera un placeholder difuminado (LQIP) para usar como `background-image`
 * del propio `<img>`, mientras se descarga la versión definitiva.
 *
 * El navegador pinta ese fondo borroso en lugar del hueco blanco y del texto
 * alternativo, así la imagen aparece sin parpadeo en la primera carga.
 *
 * Devuelve una cadena de estilos CSS lista para pasar en `style`.
 *
 * @example
 *   const style = await placeholderStyle(imagen);
 *   <Image src={imagen} alt="..." style={style} />
 */
export function placeholderStyle(src: ImageMetadata, width = 24): Promise<string> {
  const key = `${src.src}::${width}`;
  const cached = placeholderCache.get(key);

  if (cached) return cached;

  const placeholder = createPlaceholder(src, width);
  placeholderCache.set(key, placeholder);
  return placeholder;
}
