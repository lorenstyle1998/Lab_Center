# Lab_Center | Todo iPhone

Catálogo y taller de iPhones. Toda consulta, negociación y pago se realiza por WhatsApp; no hay pagos en línea.

## Ejecutar el proyecto

Instala Node.js 22 o superior. Abre una terminal en la carpeta del proyecto y ejecuta:

```sh
npm install
npm run dev
```

Abre la dirección que aparece en la terminal. También puedes usar Bun con `bun install` y `bun run dev`.
Para generar la versión de producción: `npm run build` (o `bun run build`).

## Probar el inventario

En desarrollo, abre `/admin-demo` en la dirección local para editar, agregar y retirar equipos de prueba. La ruta devuelve not-found en builds de producción. El prototipo guarda cambios únicamente en `localStorage` del navegador actual; no tiene inicio de sesión ni sincroniza el inventario entre clientes, por lo que no equivale a un panel privado.

Para producción, recomiendo Supabase Auth y Postgres con políticas RLS, conectado desde Lovable. El esquema y los permisos deben crearse desde Lovable; el plan gratuito tiene límites que conviene revisar antes de depender de él.

## Cambiar información

- `src/lib/catalog.ts`: número de WhatsApp, modelos, precios y estado de cada equipo.
- `src/lib/services.ts`: servicios, precios y tiempos.
- `src/lib/trade-in.ts`: propuesta de entregar un iPhone como parte del pago.

Confirma que el número de WhatsApp corresponde a la línea del negocio antes de publicar. Precios, descuentos, tiempos y etiquetas de disponibilidad se dejan en `null` hasta verificarlos. Las características de cada equipo también se dejan en `null` ("Por confirmar") hasta revisar el inventario. Batería acepta un número; libre de fábrica, SIM física, eSIM, R-SIM, Face ID y True Tone aceptan `true` o `false`; pantalla, piezas cambiadas y accesorios aceptan texto.

Las imágenes oficiales de Apple son referencias de los modelos, no fotografías del inventario. El RAR incluye las imágenes dentro de `public/images` y referencias locales para ejecutarlo fuera de Lovable, sin depender de su servidor de imágenes.

## Comprobar las reglas

```sh
npm run test
```

Construido con TanStack Start, React, TypeScript, Tailwind CSS y Embla Carousel.
