# Despliegue en Firebase Hosting

## Por qué así
Se reutiliza el proyecto de Firebase del SaaS de clínicas (`aestheticsaas-495821`), pero el portafolio vive en
**su propio sitio de Hosting** (multi-site): tiene su propia URL, sus propios despliegues y su propio dominio.
El SaaS no se toca. Ver ADR-002.

| Dato | Valor |
|---|---|
| Proyecto de Firebase / Google Cloud | `aestheticsaas-495821` |
| Sitio de Hosting | `TODO` (paso 2) → `https://TODO.web.app` |
| Target en `.firebaserc` | `portafolio` |
| Secreto en GitHub | `FIREBASE_SERVICE_ACCOUNT_PORTAFOLIO` |
| Dominio propio | `TODO` (paso 6) |

---

## Paso 1 — CLI de Firebase (en tu equipo, una vez)
```powershell
fnm use 22.22.3
npm install -g firebase-tools
firebase login
firebase projects:list        # debe aparecer aestheticsaas-495821
firebase hosting:sites:list --project aestheticsaas-495821   # el sitio actual del SaaS
```

## Paso 2 — Crear el sitio del portafolio
El nombre es único en todo Firebase y será la URL `https://<nombre>.web.app`.
```powershell
firebase hosting:sites:create jevillamizar --project aestheticsaas-495821
```
Si dice que está ocupado, prueba otro (`esteban-villamizar`, `jevillamizar-portafolio`).
También se puede en **Firebase Console → Hosting → Agregar otro sitio**.

## Paso 3 — Cuenta de servicio para GitHub Actions (Google Cloud Console)
Es la identidad con la que GitHub publica. Debe poder **solo** publicar en Hosting:
si alguien robara el secreto, no podría tocar Cloud Run, la base de datos ni nada del SaaS.

1. Entra a <https://console.cloud.google.com> y elige el proyecto **aestheticsaas-495821** arriba a la izquierda.
2. **IAM y administración → Cuentas de servicio → + Crear cuenta de servicio.**
   - Nombre: `github-portafolio-deploy`
   - Descripción: `Publica el portafolio en Firebase Hosting desde GitHub Actions`
3. **Otorgar acceso** — agrega exactamente estos dos roles:
   - **Administrador de Firebase Hosting** (`roles/firebasehosting.admin`)
   - **Visualizador de claves de API** (`roles/serviceusage.apiKeysViewer`), que la CLI necesita para leer la configuración del proyecto.
   No agregues Editor, Propietario, Cloud Run ni Firebase Authentication.
4. **Listo.** Abre la cuenta creada → pestaña **Claves → Agregar clave → Crear clave nueva → JSON**.
   Se descarga un archivo `.json`.
   - Si aparece el error *"La creación de claves está inhabilitada por una política de la organización"*
     (`iam.disableServiceAccountKeyCreation`), avísale a Claude: la alternativa es Workload Identity Federation (sin claves).

## Paso 4 — Secreto en GitHub
1. En <https://github.com/jevillamizar/portafolio-sdd> → **Settings → Secrets and variables → Actions → New repository secret**.
2. Nombre: `FIREBASE_SERVICE_ACCOUNT_PORTAFOLIO`. Valor: **todo** el contenido del `.json`.
3. **Borra el `.json` de tu equipo** (y de la papelera). Nunca lo subas al repositorio.

## Paso 5 — Primer despliegue
Lo hace el workflow (spec 000, tareas 9 y 10):
- `firebase.json` con el target `portafolio`: `public: "dist"`, `rewrites` `** → /index.html` (rutas de la SPA),
  caché larga e inmutable para `/assets/**` y `no-cache` para `index.html`.
- `.firebaserc` con el proyecto por defecto y el target `portafolio` → el sitio del paso 2.
- `.github/workflows/deploy.yml`: Node desde `.nvmrc`, instala, `check`, `test`, `build`, `test:e2e` (Chromium)
  y publica con la acción oficial de Firebase Hosting:
  - push a `main` → canal `live` (producción);
  - pull request → canal de vista previa, con el enlace comentado en el PR.

Flujo: `git push -u origin main` y `git push -u origin spec/000-base` → abrir PR → revisar la vista previa → merge.

## Paso 6 — Dominio propio
### 6.1 Comprarlo
Compra el dominio en un registrador con DNS editable y precio de renovación sin sorpresas:
Cloudflare Registrar (precio de costo), Porkbun o Namecheap. Un `.com` cuesta alrededor de 10–12 USD al año;
un `.dev` es una opción común para desarrolladores. No uses el dominio del SaaS: el portafolio es tu marca personal.

### 6.2 Conectarlo en Firebase
1. **Firebase Console → Hosting →** abre el sitio **del portafolio** (no el del SaaS) **→ Agregar dominio personalizado.**
2. Escribe el dominio raíz (`tudominio.com`).
3. Firebase te muestra registros DNS: un **TXT** (verifica que el dominio es tuyo) y uno o más **A** (apuntan a Hosting).
4. En el panel del registrador → DNS, crea exactamente esos registros. Borra otros registros **A** o **AAAA** del dominio raíz
   que el registrador haya creado por defecto (páginas de estacionamiento).
   - Si usas Cloudflare: deja los registros en **"Solo DNS"** (nube gris), no en "Proxied".
5. Repite con `www.tudominio.com` y elige **Redirigir a** `tudominio.com`.
6. Espera: la verificación toma de minutos a unas horas, y el certificado HTTPS lo emite Firebase solo (hasta 24 h).
   El estado pasa a **Conectado**.

### 6.3 Después de conectarlo
Avísale a Claude para actualizar la URL en este archivo, en `index.html` (Open Graph) y en el sitemap (spec 005).

---

## Cada despliegue
Merge a `main` → Actions compila, prueba y publica en 2–3 minutos. Revisa la pestaña **Actions** si algo falla.

## Despliegue manual (solo si Actions falla)
```powershell
npm run build
firebase deploy --only hosting:portafolio
```
**Nunca** `firebase deploy` sin `--only hosting:portafolio`: desplegaría también lo del SaaS.

## Costos
Firebase Hosting incluye 10 GB de almacenamiento y 360 MB/día de transferencia sin costo; un portafolio queda muy por debajo.
El dominio y su renovación anual se pagan en el registrador.
