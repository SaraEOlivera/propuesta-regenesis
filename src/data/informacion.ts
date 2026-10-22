export interface InformacionSection {
  id: string;
  label: string;
}

export interface TipoDeConsumo {
  title: string;
  description: string;
}

export interface PasoParaPedirAyuda {
  title: string;
  description: string;
}

export interface Material {
  title: string;
  description: string;
  href: string;
  format: string;
}

export const sections: InformacionSection[] = [
  { id: "informacion", label: "Qué son los consumos problemáticos" },
  { id: "ayuda", label: "Si necesitás ayuda" },
  { id: "familias", label: "Para familiares" },
  { id: "materiales", label: "Materiales de orientación" },
];

export const tiposDeConsumo: TipoDeConsumo[] = [
  {
    title: "Sustancias",
    description:
      "Alcohol, tabaco, cannabis, cocaína, psicofármacos usados sin indicación médica y otras drogas.",
  },
  {
    title: "Pantallas y juegos",
    description:
      "Uso de celulares, redes y videojuegos que desplaza el estudio, el trabajo, el sueño o los vínculos.",
  },
  {
    title: "Apuestas",
    description: "Juego de azar y apuestas online que generan deudas, ocultamiento o angustia.",
  },
];

export const senalesDeAlerta: string[] = [
  "Cuesta controlar cuánto o cuándo se consume",
  "El consumo ocupa cada vez más tiempo, dinero o pensamientos",
  "Se abandonan actividades, estudios o vínculos que antes importaban",
  "Aparecen malestar o ansiedad cuando no se puede consumir",
  "Se consume a pesar de sus consecuencias en la salud, la familia o el trabajo",
  "Se oculta o se minimiza lo que pasa",
];

export const pasosParaPedirAyuda: PasoParaPedirAyuda[] = [
  {
    title: "Hablar con alguien de confianza",
    description:
      "Contarle a una persona cercana lo que te pasa ayuda a dejar de cargarlo en soledad.",
  },
  {
    title: "Pedir orientación",
    description:
      "Podés llamar a la Línea 141 o acercarte a un centro de salud, sin compromiso y sin tener que decidir nada en ese momento.",
  },
  {
    title: "Hacer una primera consulta",
    description:
      "Un equipo profesional escucha tu situación y te propone opciones de acompañamiento acordes a lo que necesitás.",
  },
  {
    title: "Armar un plan de tratamiento",
    description:
      "No existe un único camino: puede incluir terapia, grupos de apoyo, tratamiento ambulatorio o internación, según cada caso.",
  },
];

export const paraFamilias = {
  hacer: [
    "Hablar en un momento tranquilo, sin reproches y desde la preocupación",
    "Escuchar sin interrumpir y sin juzgar",
    "Informarte sobre el tema y pedir orientación profesional",
    "Cuidarte: tu bienestar también importa",
    "Acompañar los pasos que la persona quiera dar",
  ],
  evitar: [
    "Gritar, amenazar o dar un ultimátum",
    "Etiquetar a la persona por su consumo",
    "Esperar que cambie de un día para el otro",
    "Cubrir las consecuencias o hacerte cargo de todo",
    "Sentirte culpable: el consumo problemático tiene múltiples causas",
  ],
};

export const materiales: Material[] = [
  {
    title: "Guía para entender los consumos problemáticos",
    description: "Conceptos básicos, señales de alerta y mitos frecuentes, en lenguaje simple.",
    href: "/materiales/guia-consumos-problematicos.pdf",
    format: "PDF",
  },
  {
    title: "Cómo acompañar a un familiar",
    description: "Pautas para conversar, poner límites y cuidarte durante el acompañamiento.",
    href: "/materiales/guia-para-familias.pdf",
    format: "PDF",
  },
  {
    title: "Primeros pasos para pedir ayuda",
    description: "Qué esperar de una primera consulta y qué opciones de tratamiento existen.",
    href: "/materiales/primeros-pasos.pdf",
    format: "PDF",
  },
  {
    title: "Consumo de menor riesgo y prevención",
    description: "Información para jóvenes, docentes y equipos que trabajan con adolescentes.",
    href: "/materiales/prevencion.pdf",
    format: "PDF",
  },
];
