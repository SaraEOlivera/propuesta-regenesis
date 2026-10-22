import type { ImageMetadata } from "astro";
import type { IconName } from "../types/icons";
import { withBase } from "./url";

export const ACTIVITY_TYPES = ["taller", "charla", "evento"] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export const ACTIVITY_MODALITIES = ["presencial", "virtual", "mixta"] as const;
export type ActivityModality = (typeof ACTIVITY_MODALITIES)[number];

interface ActivityTypeMeta {
  label: string;
  plural: string;
  icon: IconName;
  badgeClass: string;
  coverClass: string;
}

export const ACTIVITY_TYPE_META: Record<ActivityType, ActivityTypeMeta> = {
  taller: {
    label: "Taller",
    plural: "Talleres",
    icon: "book",
    badgeClass:
      "border-sky-200 bg-sky-100 text-sky-800 dark:border-sky-700 dark:bg-sky-900/40 dark:text-sky-200",
    coverClass:
      "from-sky-100 via-sky-50 to-white text-sky-700 dark:from-sky-950 dark:via-slate-900 dark:to-slate-900 dark:text-sky-300",
  },
  charla: {
    label: "Charla",
    plural: "Charlas",
    icon: "info",
    badgeClass:
      "border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-700 dark:bg-amber-900/40 dark:text-amber-200",
    coverClass:
      "from-amber-100 via-amber-50 to-white text-amber-700 dark:from-amber-950 dark:via-slate-900 dark:to-slate-900 dark:text-amber-300",
  },
  evento: {
    label: "Evento",
    plural: "Eventos",
    icon: "star",
    badgeClass:
      "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
    coverClass:
      "from-emerald-100 via-emerald-50 to-white text-emerald-700 dark:from-emerald-950 dark:via-slate-900 dark:to-slate-900 dark:text-emerald-300",
  },
};

export const MODALITY_LABELS: Record<ActivityModality, string> = {
  presencial: "Presencial",
  virtual: "Virtual",
  mixta: "Mixta",
};

const MONTHS_LONG = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const MONTHS_SHORT = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SEP",
  "OCT",
  "NOV",
  "DIC",
];

const argentinaDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Argentina/Buenos_Aires",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Fecha de hoy en Argentina, con formato YYYY-MM-DD. */
export function todayInArgentina(): string {
  const parts = argentinaDateFormatter.formatToParts(new Date());

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";

  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function isUpcoming(date: string, today = todayInArgentina()): boolean {
  return date >= today;
}

/** Ejemplo: 2026-11-05 -> "5 de noviembre de 2026". */
export function formatActivityDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${Number(day)} de ${MONTHS_LONG[Number(month) - 1]} de ${year}`;
}

/** Devuelve el día y el mes abreviado para el badge de la tarjeta. */
export function getDateBadge(date: string): { day: string; month: string } {
  const [, month, day] = date.split("-");
  return {
    day,
    month: MONTHS_SHORT[Number(month) - 1] ?? "",
  };
}

/** Ejemplo: ("18:00", "20:00") -> "18:00 a 20:00 hs". */
export function formatActivityTime(time?: string, endTime?: string): string | undefined {
  if (!time) return undefined;
  return endTime ? `${time} a ${endTime} hs` : `${time} hs`;
}

/**
 * Compatibilidad con imágenes administradas desde Pages CMS.
 * Las fotos se guardan en src/assets/actividades y Astro las procesa en build.
 */
export function activityHref(slug: string): string {
  return withBase(`/actividades/${slug}`);
}

interface ActivityWithSlug {
  id: string;
  data: {
    slug?: string;
  };
}

/** Slug editable desde Pages CMS; si no se define, se usa el id del archivo. */
export function getActivitySlug(activity: ActivityWithSlug): string {
  return activity.data.slug?.trim() || activity.id;
}

export interface ActivityPhoto {
  src: ImageMetadata;
  alt: string;
}

interface ActivityWithImages {
  data: {
    title: string;
    cover?: ImageMetadata;
    coverAlt?: string;
    gallery?: ImageMetadata[];
    galleryAlts?: string[];
  };
}

/** Fotos de una actividad, sin repetir la portada si también está en la galería. */
export function getActivityPhotos(activity: ActivityWithImages): ActivityPhoto[] {
  const images = [activity.data.cover, ...(activity.data.gallery ?? [])].filter(
    (image): image is ImageMetadata => Boolean(image),
  );

  const unique = [...new Map(images.map((image) => [image.src, image])).values()];
  const altBySrc = new Map<string, string>();

  (activity.data.gallery ?? []).forEach((image, index) => {
    const alt = activity.data.galleryAlts?.[index]?.trim();
    if (alt) altBySrc.set(image.src, alt);
  });

  let photoNumber = 0;

  return unique.map((image) => {
    const isCover = image.src === activity.data.cover?.src;
    const alt =
      isCover && activity.data.coverAlt
        ? activity.data.coverAlt
        : (altBySrc.get(image.src) ?? `${activity.data.title} - Foto ${++photoNumber}`);

    return { src: image, alt };
  });
}

interface SortableActivity {
  data: {
    date: string;
    time?: string;
  };
}

export function sortUpcoming(a: SortableActivity, b: SortableActivity): number {
  return (
    a.data.date.localeCompare(b.data.date) || (a.data.time ?? "").localeCompare(b.data.time ?? "")
  );
}

export function sortPast(a: SortableActivity, b: SortableActivity): number {
  return (
    b.data.date.localeCompare(a.data.date) || (b.data.time ?? "").localeCompare(a.data.time ?? "")
  );
}

interface CalendarActivity {
  data: {
    title: string;
    date: string;
    time?: string;
    endTime?: string;
    location?: string;
    summary?: string;
  };
}

const pad = (value: number) => String(value).padStart(2, "0");

function calendarStamp(date: string, time: string): string {
  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");
  return `${year}${month}${day}T${hours}${minutes}00`;
}

function calendarNextHour(date: string, time: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day, hours, minutes + 60));

  return `${next.getUTCFullYear()}${pad(next.getUTCMonth() + 1)}${pad(next.getUTCDate())}T${pad(
    next.getUTCHours(),
  )}${pad(next.getUTCMinutes())}00`;
}

function calendarNextDay(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + 1));

  return `${next.getUTCFullYear()}${pad(next.getUTCMonth() + 1)}${pad(next.getUTCDate())}`;
}

/** Enlace "Agregar a Google Calendar" para una actividad. */
export function googleCalendarUrl(activity: CalendarActivity): string {
  const { data } = activity;
  const time = data.time;
  const dates = time
    ? `${calendarStamp(data.date, time)}/${
        data.endTime ? calendarStamp(data.date, data.endTime) : calendarNextHour(data.date, time)
      }`
    : `${data.date.replace(/-/g, "")}/${calendarNextDay(data.date)}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: data.title,
    dates,
    details: data.summary ?? "",
    location: data.location ?? "",
  });

  if (time) params.set("ctz", "America/Argentina/Buenos_Aires");

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
