# Guía de despliegue · EmbryoLab PRO

**Tiempo:** ~15 minutos la primera vez.

Esta guía asume que **nunca has usado Git ni GitHub** antes. Si algo no queda claro, pregunta.

---

## PARTE 1 · Preparación (una sola vez)

### 1.1 Crea una cuenta en GitHub

Ve a https://github.com/signup y crea una cuenta gratuita.

### 1.2 Instala Git

Descarga desde https://git-scm.com/downloads e instala con las opciones por defecto.

**Verifica** que se instaló abriendo una terminal y escribiendo:
```bash
git --version
```
Debe responder algo como `git version 2.43.0`.

### 1.3 Configura tu identidad en Git (una sola vez)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

---

## PARTE 2 · Crear el repositorio en GitHub

### 2.1 Ve a https://github.com/new

Rellena:

- **Repository name:** `embryolab-pro`
- **Description:** *(opcional)* `Atlas de anomalías congénitas · MedStudents`
- **Visibility:** ⦿ **Public** ← necesario para GitHub Pages gratis
- **NO marques nada** de: "Add a README", "Add .gitignore", "Choose a license"
- Click en **Create repository**

### 2.2 Copia la URL del repo

En la página que aparece, verás una URL como:
```
https://github.com/TU-USUARIO/embryolab-pro.git
```

Cópiala — la usarás en el siguiente paso.

---

## PARTE 3 · Subir el código

### 3.1 Descomprime el ZIP

Descomprime `embryolab-pro.zip` en tu computadora. Verás una carpeta llamada `embryolab-pro`.

### 3.2 Abre una terminal DENTRO de esa carpeta

**En Windows:**
- Abre el Explorador de archivos
- Entra a la carpeta `embryolab-pro`
- Haz click derecho en un espacio vacío
- Elige **"Abrir en Terminal"** (o "Git Bash Here" si instalaste Git Bash)

**En Mac:**
- Abre Finder
- Ve a la carpeta `embryolab-pro`
- Haz **click derecho** sobre la carpeta y elige **Servicios → Nueva Terminal en la Carpeta**

**Alternativa universal:** abre Terminal, escribe `cd ` (con espacio) y arrastra la carpeta `embryolab-pro` desde el Finder al terminal. Presiona Enter.

### 3.3 Verifica que estás dentro de la carpeta correcta

Ejecuta:
```bash
ls
```

**Windows (cmd):** usa `dir` en lugar de `ls`.

**Debes ver estos archivos y carpetas:**
```
LICENSE  README.md  docs  embed-kit  index.html  public  src  vendor
```

⚠️ **Si NO ves `index.html` en la lista**, es que estás una carpeta arriba. Ejecuta:
```bash
cd embryolab-pro
```
Y vuelve a comprobar con `ls`.

### 3.4 Sube el código a GitHub

Copia y pega estos comandos uno por uno (cambia `TU-USUARIO` por tu usuario real de GitHub):

```bash
git init
```
```bash
git branch -M main
```
```bash
git add .
```
```bash
git commit -m "Initial release: EmbryoLab PRO v1.0"
```
```bash
git remote add origin https://github.com/TU-USUARIO/embryolab-pro.git
```
```bash
git push -u origin main
```

### 3.5 Autenticación

Cuando ejecutes `git push`, GitHub te pedirá autenticarte.

**Windows/Mac con Git moderno:** se abrirá una ventana del navegador, autoriza y listo.

**Si te pide usuario/contraseña en la terminal:**
1. Usuario: tu usuario de GitHub
2. Contraseña: **NO tu contraseña normal** — necesitas un Personal Access Token:
   - Ve a https://github.com/settings/tokens
   - Click en **Generate new token → Generate new token (classic)**
   - Note: `EmbryoLab Deploy`
   - Expiration: `90 days`
   - Scopes: marca **`repo`** (marca los 5 hijos de `repo`)
   - Click en **Generate token** abajo del todo
   - **COPIA el token que aparece** (solo se ve una vez)
   - Pégalo en la terminal como contraseña

### 3.6 Verifica que subió

Refresca tu repo en https://github.com/TU-USUARIO/embryolab-pro y verás la lista de archivos con `index.html`, `src/`, `public/`, etc.

---

## PARTE 4 · Activar GitHub Pages

### 4.1 Ve a Settings del repo

Dentro de tu repo → pestaña superior **Settings** ⚙

### 4.2 Ve a Pages

En el menú lateral izquierdo, bajo **"Code and automation"**, click en **Pages**.

### 4.3 Configura la fuente

En **Build and deployment → Source**, cambia el dropdown a:
```
GitHub Actions
```

Se guarda solo, no hay botón "Save".

### 4.4 Espera el primer despliegue

1. Ve a la pestaña **Actions** (arriba, con el icono ▶)
2. Verás un workflow **"Deploy to GitHub Pages"** con círculo amarillo 🟡 (ejecutándose)
3. Espera 1-2 minutos → se pondrá verde ✅

### 4.5 Copia tu URL

Vuelve a **Settings → Pages**. Arriba verás:
```
✅ Your site is live at https://TU-USUARIO.github.io/embryolab-pro/
   Visit site 🔗
```

**Click en "Visit site"** para abrir y verificar que EmbryoLab carga correctamente.

---

## PARTE 5 · Embeber en Odoo

### 5.1 Entra a Odoo como administrador

Ve a tu curso en Odoo eLearning.

### 5.2 Crea una nueva lección

Tipo: **"Página web"** (Web Page).

### 5.3 Cambia al editor HTML

En la barra de herramientas del editor, click en el icono `</>` o "Ver código fuente".

### 5.4 Pega este bloque

**Cambia `TU-USUARIO` por tu usuario real:**

```html
<div style="position:relative;width:100%;max-width:1400px;margin:0 auto;">
  <iframe
    src="https://TU-USUARIO.github.io/embryolab-pro/"
    width="100%"
    height="900"
    frameborder="0"
    style="border:0;border-radius:16px;display:block;"
    allow="xr-spatial-tracking; fullscreen; accelerometer; gyroscope; magnetometer"
    allowfullscreen
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    title="EmbryoLab PRO">
  </iframe>
</div>
```

### 5.5 Guarda

Click en **Guardar** de Odoo. Refresca la vista de estudiante y verifica que carga.

---

## PARTE 6 · Actualizaciones futuras

Cada vez que quieras cambiar algo (añadir una anomalía, corregir un texto, etc.):

1. Edita los archivos en tu computadora (normalmente `src/data.js`)
2. En la terminal, dentro de la carpeta `embryolab-pro`:
```bash
git add .
git commit -m "Describe qué cambiaste"
git push
```
3. En 1-2 minutos GitHub Pages se actualiza solo. Los estudiantes ven los cambios al refrescar Odoo.

---

## ⚠️ Solución de problemas frecuentes

### "404 File not found" al abrir mi URL de Pages

Significa que los archivos están dentro de una subcarpeta en el repo, no en la raíz.

**Verifica:** ve a https://github.com/TU-USUARIO/embryolab-pro y mira los archivos:

✅ **Debe verse así (raíz):**
```
📁 .github/     📁 docs/     📁 public/     📁 src/
📄 index.html   📄 README.md
```

❌ **NO debe verse así (subcarpeta):**
```
📁 embryolab-pro/     ← todo dentro
```

Si aparece el caso ❌:
1. En tu terminal, **entra a la carpeta correcta** con `cd embryolab-pro`
2. Verifica con `ls` que ves `index.html`
3. Borra el repo en GitHub (Settings → Danger Zone → Delete)
4. Créalo de nuevo vacío y repite la PARTE 3 desde la carpeta correcta

### El workflow de Actions falla con ❌ rojo

Click en el workflow fallido → mira el error. El más común es "Get Pages site failed": significa que aún no activaste Pages. Ve a **Settings → Pages → Source: GitHub Actions** y vuelve a ejecutar el workflow desde la pestaña Actions (**Re-run all jobs**).

### El botón "Ver en AR" no funciona

AR requiere:
- **HTTPS** (GitHub Pages lo tiene)
- **Móvil real** con iOS 12+ o Android con ARCore
- No funciona en escritorio

### El modelo 3D del Método ABDI aparece vacío

Verifica que el archivo `public/abdi-method.glb` está en tu repo. Si pesa 0 bytes, es que se corrompió al subir. Vuelve a copiarlo desde el ZIP original y `git push` de nuevo.

### En Odoo se ve blanco / no carga

- Verifica que copiaste bien la URL con `https://` y las barras finales `/`
- Abre la URL directamente en el navegador para confirmar que sola sí funciona
- Comprueba que tu instancia de Odoo permite iframes (por defecto sí)

---

## Checklist final

Antes de anunciarlo al equipo:

- [ ] Repo subido a GitHub con `index.html` en la raíz
- [ ] Pages activado con Source: GitHub Actions
- [ ] Workflow terminó en ✅ verde
- [ ] URL pública carga en <3 segundos
- [ ] Modelo 3D del Método ABDI rota
- [ ] Los 3 iframes de Vectary se ven
- [ ] Toggle día/noche funciona
- [ ] Navegación Inicio → Índice → Lista → Detalle funciona en ambas direcciones
- [ ] Quiz da feedback correcto
- [ ] Embebido en Odoo se ve dentro del contenedor
- [ ] "Ver en AR" aparece en móvil real
