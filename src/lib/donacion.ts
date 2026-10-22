import donacionData from "../data/donacion.json";

export interface DonacionConfig {
  /**
   * Habilita el método de donación online (Mercado Pago).
   * La transferencia se muestra si hay alias o CVU, aunque `activa` sea false.
   */
  activa: boolean;
  mercadoPagoUrl: string;
  transferenciaAlias: string;
  transferenciaCvu: string;
  transferenciaTitular: string;
  /** Marca los datos como provisionales y muestra un aviso en la página. */
  datosDeEjemplo: boolean;
}

const config = donacionData as Partial<DonacionConfig>;

/** Normaliza el JSON para que una clave faltante no rompa el build. */
export const donacion: DonacionConfig = {
  activa: config.activa ?? false,
  mercadoPagoUrl: (config.mercadoPagoUrl ?? "").trim(),
  transferenciaAlias: (config.transferenciaAlias ?? "").trim(),
  transferenciaCvu: (config.transferenciaCvu ?? "").trim(),
  transferenciaTitular: (config.transferenciaTitular ?? "").trim(),
  datosDeEjemplo: config.datosDeEjemplo ?? false,
};

const esUrlSegura = (url: string) => /^https:\/\//i.test(url.trim());

/**
 * Estado de los métodos de donación.
 *
 * Las URLs se validan en build: si falta una URL o no es `https`, el botón no
 * se renderiza. Así nunca queda un enlace vacío o roto en producción.
 */
const mercadoPago = donacion.activa && esUrlSegura(donacion.mercadoPagoUrl);
const transferencia = Boolean(
  donacion.transferenciaAlias.trim() || donacion.transferenciaCvu.trim(),
);

export const donacionEstado = {
  mercadoPago,
  transferencia,
  hayMetodo: mercadoPago || transferencia,
};
