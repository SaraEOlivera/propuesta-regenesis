import type { IconName } from "../types/icons";
import navData from "../data/navegacion.json";

export interface NavLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface NavSocial {
  label: string;
  href: string;
  icon: IconName;
}

export interface NavData {
  brand: {
    name: string;
  };
  contact: {
    addressLine1: string;
    addressLine2: string;
    phone: string;
    email: string;
  };
  social: NavSocial[];
  links: NavLink[];
}

/**
 * Datos de navegación tipados.
 *
 * El JSON sigue siendo la fuente editable, pero este módulo valida en tiempo de
 * compilación que los iconos existan y evita casts `as any` en los componentes.
 */
export const nav = navData as NavData;
