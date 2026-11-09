# Despliegue en Firebase Hosting

## Por qué así
Se reutiliza el proyecto de Firebase donde ya está el SaaS de clínicas, pero el portafolio vive en
**su propio sitio de Hosting** (multi-site). El SaaS no se toca. Ver ADR-002.

Proyecto de Firebase: `aestheticsaas-495821`.
URL de producción: `https://TODO.web.app` (pendiente del nombre del sitio).

## Pasos únicos (los haces tú, una vez)
1. Instala la CLI: `npm i -g firebase-tools` y `firebase login`.
2. Crea el sitio en el proyecto existente:
   ```bash
   firebase hosting:sites:create <nombre-del-sitio> --project aestheticsaas-495821
   ```
3. Crea una **cuenta de servicio dedicada** en Google Cloud (IAM → Cuentas de servicio) con un solo rol:
   **Firebase Hosting Admin**. Genera una clave JSON.
   No reutilices la cuenta que despliega el SaaS.
4. En GitHub → **Settings → Secrets and variables → Actions** crea el secreto
   `FIREBASE_SERVICE_ACCOUNT_PORTAFOLIO` con el contenido del JSON. Borra el archivo de tu equipo.
5. Envía el primer commit a `main`: `git push -u origin main`.

## Lo que configura el spec 000
- `firebase.json` con el target `portafolio`:
  - `public: "dist"`
  - `rewrites`: `** → /index.html` (rutas de la SPA)
  - `headers`: caché larga e inmutable para `/assets/**` (archivos con hash) y `no-cache` para `index.html`.
- `.firebaserc` con el proyecto por defecto y el target `portafolio` apuntando al sitio creado.
- `.github/workflows/deploy.yml`: instala, `npm run check`, `npm test`, `npm run build`, `npm run test:e2e`
  (Chromium) y publica con la acción oficial de Firebase Hosting:
  - push a `main` → canal `live` (producción);
  - pull request → canal de vista previa, con el enlace comentado en el PR.
  Claude Code debe verificar las versiones vigentes de las acciones al escribirlo.

## Cada despliegue
Merge a `main` → Actions compila, prueba y publica en 2–3 minutos.
Revisa la pestaña **Actions** si algo falla.

## Despliegue manual (solo si Actions falla)
```bash
npm run build
firebase deploy --only hosting:portafolio
```
Nunca `firebase deploy` sin `--only hosting:portafolio`: desplegaría también lo del SaaS.

## Dominio propio (opcional, después)
Firebase Console → Hosting → sitio del portafolio → **Agregar dominio personalizado**, y crea los registros DNS
que indica. Actualiza la URL en `index.html` (Open Graph) y en el sitemap.
