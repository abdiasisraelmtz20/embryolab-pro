# EmbryoLab PRO · V1.0

> Atlas interactivo de anomalías congénitas con modelos 3D y Realidad Aumentada.
> **Dr. Abdi** · **MedStudents**

---

## 🚀 Publicar en 5 pasos

Si nunca has usado Git antes, sigue [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — es la guía visual con capturas.

Si ya conoces Git:

```bash
# Descomprime el ZIP y entra a la carpeta
cd embryolab-pro

# Inicializa Git
git init
git branch -M main
git add .
git commit -m "Initial release: EmbryoLab PRO v1.0"

# Conecta con tu repo (crea uno vacío en github.com/new primero)
git remote add origin https://github.com/TU-USUARIO/embryolab-pro.git
git push -u origin main
```

Luego en GitHub: **Settings → Pages → Source: GitHub Actions**.

En 2 minutos: `https://TU-USUARIO.github.io/embryolab-pro/`

---

## 📦 Embeber en Odoo

Snippet listo en [`embed-kit/odoo.html`](embed-kit/odoo.html). Cambia `TU-USUARIO` y pega en una lección tipo "Página web" (vista HTML).

---

## Estructura

```
embryolab-pro/
├── index.html                      Punto de entrada
├── src/
│   ├── styles.css                  Estilos (aislados con .el-)
│   ├── data.js                     Contenido: temas, anomalías, quizzes
│   └── app.js                      Lógica: router, render, quiz
├── public/
│   ├── abdi-method.glb             Modelo 3D (4 MB)
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   └── robots.txt
├── vendor/model-viewer/            <model-viewer> vendorizado
├── embed-kit/                      Snippets Odoo/WordPress/Moodle
├── docs/
│   ├── DEPLOYMENT.md               Guía paso a paso
│   └── SECURITY.md                 Política de seguridad
├── .github/workflows/pages.yml     Auto-deploy a Pages
├── .gitignore
├── .gitattributes
├── .nojekyll
├── LICENSE
└── README.md
```

## Características

- **5 sistemas embriológicos** (Muscular completo, resto en plantilla)
- **Modelos 3D** con **Realidad Aumentada** (iOS ARKit + Android ARCore)
- **Tabla Método ABDI**: Anatomía · Bases · Diagnóstico · Impacto
- **Quiz** de 5 preguntas con feedback clínico
- **Tema día/noche** persistente
- **Responsive** (escritorio, tablet, móvil)
- **Navegación de 4 vistas**: Inicio → Índice → Lista → Detalle

## Seguridad y rendimiento

- Content Security Policy restrictiva
- `model-viewer` vendorizado (sin CDN externo)
- GLB optimizado: 35 MB → 4 MB (−88 %)
- Sin cookies, sin tracking, sin analítica

Ver [`docs/SECURITY.md`](docs/SECURITY.md).

## Licencia

Producto comercial. Ver [`LICENSE`](LICENSE).

© 2026 MedStudents · Dr. Abdi
