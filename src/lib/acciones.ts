import type { ButtonVariant } from "../types/design-system";
import type { IconName } from "../types/icons";
import { rutas } from "./rutas";

/**
 * Acción reutilizable para botones y llamados a la acción.
 *
 * Agrupa etiqueta, destino y estilo en un solo lugar para que cada intención
 * (pedir ayuda, donar, conocer las actividades) tenga un destino coherente.
 */
export interface Accion {
  label: string;
  /** Etiqueta compacta para espacios reducidos, como la navegación. */
  shortLabel?: string;
  href: string;
  variant?: ButtonVariant;
  icon?: IconName;
}

export const acciones = {
  ayuda: {
    label: "Necesito ayuda",
    href: rutas.contacto,
    variant: "primary",
  },
  contacto: {
    label: "Contactanos",
    href: rutas.contacto,
    variant: "primary",
  },
  donar: {
    label: "Quiero donar",
    shortLabel: "Donar",
    href: rutas.donar,
    variant: "primary",
    icon: "heart",
  },
  actividades: {
    label: "Conocé nuestras actividades",
    href: rutas.actividades,
    variant: "outline",
  },
  todasActividades: {
    label: "Ver todas las actividades",
    href: rutas.actividades,
    variant: "outline",
  },
  informacion: {
    label: "Conocé nuestros recursos",
    href: rutas.informacion,
    variant: "outline",
  },
  quienesSomos: {
    label: "Conocé Regénesis",
    href: rutas.quienesSomos,
    variant: "outline",
  },
} satisfies Record<string, Accion>;
