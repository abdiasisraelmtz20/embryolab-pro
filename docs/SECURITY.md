# Política de seguridad · EmbryoLab PRO

## Medidas implementadas

### 1. Content Security Policy (CSP)

Whitelist estricta en `index.html`:

| Directiva | Valor |
|---|---|
| `default-src` | `'self'` |
| `script-src` | `'self' 'unsafe-inline'` |
| `style-src` | `'self' 'unsafe-inline' fonts.googleapis.com` |
| `font-src` | `'self' fonts.gstatic.com data:` |
| `img-src` | `'self' data: https: blob:` |
| `frame-src` | `app.vectary.com` |
| `object-src` | `'none'` |

### 2. Cabeceras adicionales

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()`

### 3. Dependencias

- **`<model-viewer>` vendorizado** — sin CDN externo
- **Sin node_modules en producción** — 100% vanilla JS
- **Google Fonts** con `display=swap`

### 4. Prácticas de código

- Sin `eval()`, `Function()`
- Sin `document.write()`
- Sin `innerHTML` con entrada de usuario
- Iframes con `referrerpolicy="no-referrer"`
- `localStorage` en try/catch
- Sin cookies, sin tracking, sin fingerprinting

### 5. Aislamiento

Todos los estilos bajo `.el-app`. No contamina Odoo/WordPress ni al revés.

## Reportar vulnerabilidad

Escribe con asunto `[SECURITY] EmbryoLab PRO`. Respuesta máxima: 5 días laborables.
