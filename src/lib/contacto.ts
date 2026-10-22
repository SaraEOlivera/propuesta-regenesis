import { nav } from "./nav";

/**
 * Datos de contacto derivados de `navegacion.json`.
 *
 * Antes cada componente armaba `tel:`, `wa.me` y `mailto:` por su cuenta.
 * Centralizar esos enlaces evita inconsistencias cuando cambia el teléfono
 * o el correo de la organización.
 */
export const contacto = {
  direccionLinea1: nav.contact.addressLine1,
  direccionLinea2: nav.contact.addressLine2,
  telefono: nav.contact.phone,
  telefonoUrl: `tel:${nav.contact.phone.replace(/[^\d+]/g, "")}`,
  whatsappPhone: nav.contact.phone.replace(/\D/g, ""),
  email: nav.contact.email,
  emailUrl: `mailto:${nav.contact.email}`,
  mapaUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${nav.contact.addressLine1}, ${nav.contact.addressLine2}`,
  )}`,
};

/**
 * Devuelve un enlace de WhatsApp. Si se pasa un mensaje, se envía precargado.
 *
 * @example
 *   whatsappUrl() // -> 'https://wa.me/5493412005190'
 *   whatsappUrl('Hola, quiero consultar') // -> 'https://wa.me/...?text=Hola%2C...'
 */
export function whatsappUrl(mensaje?: string): string {
  const url = `https://wa.me/${contacto.whatsappPhone}`;
  return mensaje ? `${url}?text=${encodeURIComponent(mensaje)}` : url;
}

/** Busca una red social por su icono (sin URLs de respaldo duplicadas). */
export function redSocial(icon: "instagram" | "facebook") {
  return nav.social.find((social) => social.icon === icon);
}
