# Propuesta Práctica IT CILSA — Regénesis

Sitio web institucional para **Regénesis**, una asociación civil orientada al acompañamiento y contención de personas que atraviesan situaciones de consumo problemático y sus familias.

El proyecto busca brindar una presencia web clara, accesible y adaptable a distintos dispositivos, donde las personas puedan conocer la organización, sus actividades y capacitaciones, y contar con canales simples para comunicarse.

---

## Tecnologías utilizadas

El proyecto está desarrollado con:

- **Astro** — Framework principal para el desarrollo del sitio.
- **TypeScript** — Tipado y mayor seguridad durante el desarrollo.
- **Tailwind CSS v4** — Estilos y diseño responsive.
- **Pages CMS** — Panel para administrar las actividades sin tocar código.
- **Git / GitHub** — Control de versiones y trabajo colaborativo.
- **npm** — Gestión de dependencias.

---

## Requisitos

Antes de comenzar, es necesario tener instalado:

- [Node.js](https://nodejs.org/) versión `22.23.4` o superior.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/SaraEOlivera/propuesta-regenesis.git
```

Instalar las dependencias:

```bash
npm install
```

> Las imágenes se procesan con **Sharp**, incluido como dependencia directa. Si al iniciar el sitio aparece `Could not find Sharp`, reinstalá las dependencias con `npm install` (evitá `--omit=optional`) y reiniciá el servidor de desarrollo.

### Librerías principales

El proyecto utiliza Astro, Tailwind CSS, `@astrojs/sitemap` y una navegación móvil propia (sin dependencias de JavaScript externas).

## Ejecutar el proyecto

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Astro mostrará una dirección similar a:

```text
http://localhost:4321
```

El proyecto se actualiza automáticamente al guardar cambios.

Otros comandos útiles:

```bash
npm run check        # Validación de tipos y contenido
npm run build        # Check + build de producción
npm run preview      # Servir el resultado de dist/
npm run format       # Formatear con Prettier
npm run format:check # Verificar formato sin modificar archivos
npm run check:links  # Verificar enlaces y anclas internas sobre dist/
```

---

# Estructura de la página

El proyecto está pensado como un sitio institucional con varias páginas, organizado en las siguientes secciones.

## 1. Inicio

Presentación principal de Regénesis.

Contendrá:

- Nombre de la organización.
- Mensaje principal.
- Breve descripción.
- Botón de contacto.
- Imagen o elemento visual representativo.

El objetivo es que la persona pueda entender rápidamente qué es Regénesis y qué tipo de acompañamiento ofrece.

---

## 2. Quiénes somos

Sección destinada a presentar la organización.

Contendrá información sobre:

- Regénesis.
- Su propósito.
- Valores.
- Forma de trabajo.
- A quiénes acompaña.

La información debe utilizar un lenguaje claro, cercano y respetuoso.

---

## 3. Información y acompañamiento

Sección donde se presentan las principales propuestas de Regénesis y la información sobre consumos problemáticos. Se muestra en la ruta `/informacion`.

Puede incluir diferentes tarjetas o bloques con:

- Nombre del servicio.
- Descripción.
- Información adicional.
- Ícono representativo.

El objetivo es facilitar la comprensión de las diferentes propuestas disponibles.

### Materiales de orientación

La página `/informacion` incluye una sección de materiales descargables. Los PDFs se guardan en `public/materiales/` con estos nombres:

- `guia-consumos-problematicos.pdf`
- `guia-para-familias.pdf`
- `primeros-pasos.pdf`
- `prevencion.pdf`

La sección **Materiales de orientación** y su enlace en el índice interno se muestran recién cuando existe al menos un PDF en `public/materiales/`. Mientras no haya ninguno, la sección se oculta para no mostrar tarjetas inactivas. Al subir un PDF con el nombre correspondiente, la próxima publicación del sitio lo habilita automáticamente como descarga, respetando el `base` configurado para GitHub Pages.

---

## 4. Actividades

Sección destinada a mostrar los talleres, charlas y eventos de Regénesis.

Cada publicación puede incluir:

- Título y tipo de actividad (taller, charla o evento).
- Fecha, hora, lugar y modalidad.
- Resumen y descripción completa.
- Imagen principal y galería de fotos.
- Link de inscripción o consulta.
- Estado de publicación.

La página `/actividades` agrupa automáticamente las publicaciones en **Próximas actividades** y **Actividades realizadas** según la fecha. Además, permite filtrar por tipo y reúne las fotos de las actividades en una galería.

Para que la página no crezca indefinidamente, cada sección muestra hasta **6 actividades** y el resto queda disponible con un botón **Ver más**. El límite es solo visual: todas las actividades se siguen generando en el HTML (bueno para buscadores y para quienes navegan sin JavaScript). Al aplicar un filtro por tipo, la lista se reinicia y el botón aparece únicamente si ese tipo supera las 6 actividades.

La galería, en cambio, es una selección de **hasta 9 fotos** de las actividades realizadas más recientes. Se actualiza sola a medida que se publican actividades nuevas y no crece con un botón: cada actividad conserva su galería completa en su página de detalle.

La sección se administra desde Pages CMS. Ver [Administración de Actividades con Pages CMS](#administración-de-actividades-con-pages-cms).

---

## 5. Contacto

La sección de contacto permite que las personas puedan comunicarse fácilmente con Regénesis. Se muestra en la ruta `/contacto`.

Incluye:

- Información de contacto.
- Ubicación, con enlace a Google Maps.
- Teléfono y WhatsApp.
- Correo electrónico.
- Redes sociales.
- Formulario de contacto, con aviso de privacidad.

Los datos de contacto y los enlaces de navegación se editan desde Pages CMS (sección **Datos de contacto y navegación**, archivo `src/data/navegacion.json`).

### Privacidad

La página `/privacidad` explica qué datos recibe el formulario, cómo se envían por WhatsApp y cómo ejercer los derechos de acceso, corrección o eliminación. Está enlazada desde el footer y desde el propio formulario.

---

## 6. Donaciones

La página `/donar` reúne las formas de colaborar con Regénesis. El botón **Quiero donar** del inicio y el enlace **Donar** del pie de página llevan siempre a esta página, que permite explicar el destino de los aportes y ofrecer alternativas. Cuando hay al menos un método de donación configurado, el header también muestra un enlace **Donar** como acción secundaria.

La configuración está en `src/data/donacion.json` y se puede editar desde Pages CMS en la sección **Donaciones**:

- `activa`: habilita el botón de Mercado Pago.
- `mercadoPagoUrl`: Link de pago de Mercado Pago para aportes únicos.
- `transferenciaAlias` / `transferenciaCvu` / `transferenciaTitular`: datos para transferencia directa.
- `datosDeEjemplo`: muestra un aviso de que los datos de transferencia son provisionales. Se desactiva al cargar los datos reales.

### Mercado Pago

1. Ingresar a la cuenta institucional de Mercado Pago.
2. Ir a **Tu negocio → Link de pago → Crear link**.
3. Elegir **monto libre** para que cada persona decida cuánto aportar. Si la cuenta no lo permite, crear links con montos sugeridos.
4. Copiar la URL, pegarla en Pages CMS y activar la donación.
5. Probar con un pago pequeño antes de publicar.

No se usa Checkout API ni un backend: al ser un sitio estático, el Link de pago es la opción más simple y segura. Los datos de tarjeta se ingresan siempre en Mercado Pago, nunca en este sitio.

### Mientras no estén configuradas

Si no hay URLs ni datos de transferencia, `/donar` muestra un aviso de que las donaciones online están en preparación y ofrece WhatsApp para coordinar una colaboración. La página queda indexable en todos los casos.

Mientras los datos de transferencia sean de ejemplo, `datosDeEjemplo` debe quedar en `true` para mostrar el aviso correspondiente. Al reemplazarlos por los datos reales, se pone en `false` y se carga el link de Mercado Pago cuando esté disponible.

---

## Administración de Actividades con Pages CMS

La sección `/actividades` se administra desde [Pages CMS](https://app.pagescms.org) usando el archivo `.pages.yml` del repositorio. No hace falta editar código para agregar, modificar o eliminar publicaciones.

### Conectar el repositorio

1. Ingresar a [app.pagescms.org](https://app.pagescms.org) e iniciar sesión con GitHub.
2. Instalar la GitHub App de Pages CMS en la cuenta que administra el repositorio.
3. Abrir el repositorio `SaraEOlivera/propuesta-regenesis` y seleccionar la rama `master`.
4. En el menú lateral aparecerá la colección **Actividades**.

### Crear o editar una actividad

Cada actividad es un archivo Markdown dentro de `src/content/actividades/`. Desde Pages CMS se completan estos campos:

- **Título**: nombre de la actividad.
- **URL de la actividad (slug)**: opcional. Define la dirección, por ejemplo `/actividades/taller-de-oficios`. Si se deja vacío, se usa el nombre del archivo.
- **Tipo de actividad**: taller, charla o evento. Se usa para la etiqueta y los filtros.
- **Fecha**: determina si la actividad aparece como próxima o realizada.
- **Hora de inicio / fin**: opcionales.
- **Lugar** y **modalidad**: opcionales.
- **Resumen**: texto breve para las tarjetas.
- **Imagen principal** y **fotos de la actividad**: se guardan en `src/assets/actividades/` y Astro las optimiza automáticamente.
- **Link de inscripción o consulta**: opcional.
- **Textos alternativos de las fotos**: opcional. Un texto por foto, en el mismo orden que la galería; si falta, se usa "Título - Foto N".
- **Publicada**: si se desactiva, la actividad no se muestra en el sitio.
- **Descripción completa**: texto de la página de detalle.

Las actividades próximas incluyen un botón **Agregar a mi calendario** que genera un evento de Google Calendar con fecha, hora, lugar y resumen.

Al guardar, Pages CMS hace un commit y el workflow de GitHub Actions publica el sitio automáticamente.

### Consideraciones

- Las actividades con fecha de hoy o posterior aparecen en **Próximas actividades**. Al pasar la fecha, se mueven solas a **Actividades realizadas**.
- El workflow incluye un rebuild diario para actualizar ese estado aunque no haya commits nuevos.
- Las fotos se optimizan en build: Astro genera versiones WebP responsive para tarjetas, galerías y visor ampliado. Se recomienda subir imágenes JPG o WebP de hasta 1600 px de ancho. Para el hero del inicio conviene una versión de al menos 1920 px.
- La galería de cada actividad se puede navegar con las flechas ←/→ del teclado y devuelve el foco al botón que abrió la foto.
- Las primeras publicaciones son ejemplos basados en actividades públicas del centro. Se pueden editar o eliminar desde Pages CMS.
- Si cambiás el slug de una actividad ya publicada, también cambia su URL. Las direcciones anteriores no redirigen automáticamente.

## Integración continua

- GitHub Actions publica en GitHub Pages al hacer push a `master` y reconstruye a diario para actualizar el estado de las actividades.
- El workflow de CI corre en pull requests y pushes: formato, build y verificación de enlaces internos.
- Dependabot revisa semanalmente las dependencias de npm y mensualmente las GitHub Actions.

## Objetivo

El objetivo del proyecto es desarrollar un sitio web institucional moderno, claro y accesible para Regénesis, facilitando el acceso a información sobre la organización y ofreciendo canales de contacto simples para las personas que necesiten realizar una consulta.
