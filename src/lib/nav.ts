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
 * La marca y los enlaces de navegación se mantienen en código para que la
 * estructura del sitio no dependa del CMS. El JSON administra únicamente los
 * datos de contacto y las redes sociales.
 */
const brand: NavData["brand"] = {
  name: "Regénesis",
};

const links: NavLink[] = [
  { label: "Inicio", href: "/", icon: "home" },
  { label: "Quiénes somos", href: "/quienes-somos", icon: "info" },
  { label: "Información", href: "/informacion", icon: "clipboard" },
  { label: "Actividades", href: "/actividades", icon: "calendar" },
];

const datos = navData as Omit<NavData, "brand" | "links">;

/**
 * Datos de navegación tipados.
 *
 * Este módulo valida en tiempo de compilación que los iconos existan y evita
 * casts `as any` en los componentes.
 */
export const nav: NavData = {
  brand,
  ...datos,
  links,
};
