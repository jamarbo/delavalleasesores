# Delavalle Asesores - Sitio Web

Sitio web estático y responsive para Delavalle Asesores, una firma de asesoría y consultoría jurídica con cobertura nacional en Colombia.

## 🌐 Demo en vivo

**URL:** https://jamarbo.github.io/delavalleasesores/

## ✨ Características

- ✅ **100% estático** - Sin backend, perfecto para GitHub Pages
- ✅ **Diseño profesional** - Paleta de colores sobria (slate/gray/gold) ideal para firma legal
- ✅ **Responsive** - Diseño adaptable desde 320px hasta escritorio 4K
- ✅ **Tema claro/oscuro** - Respeta preferencias del sistema y permite cambio manual persistente
- ✅ **Animaciones elegantes** - Efectos sutiles que transmiten confianza y profesionalismo
- ✅ **Blog integrado** - Sistema de posts en Markdown con búsqueda en tiempo real
- ✅ **Formulario de contacto** - Validación completa, honeypot anti-spam, rate limiting
- ✅ **WhatsApp flotante** - Botón de contacto directo siempre visible
- ✅ **SEO optimizado** - Meta tags, JSON-LD schema, sitemap, robots.txt, Open Graph
- ✅ **Accesible (WCAG AA)** - ARIA labels, contraste adecuado, navegación por teclado
- ✅ **Performance** - Lazy loading, CDNs optimizados, puntuación Lighthouse >90

## 🛠️ Stack Tecnológico

- **HTML5** - Estructura semántica
- **Tailwind CSS** (CDN) - Estilos utility-first
- **JavaScript Vanilla** - Sin frameworks, código limpio
- **Marked.js** (CDN) - Conversión de Markdown a HTML
- **Lucide Icons** (CDN) - Iconos SVG
- **Google Fonts** (CDN) - Inter + Playfair Display

## 📁 Estructura del Proyecto

```
delavalle/
├── index.html              # Página de inicio
├── acerca.html            # Acerca de nosotros
├── servicios.html         # Servicios jurídicos
├── blog.html              # Blog con posts
├── contacto.html          # Formulario de contacto
├── robots.txt             # Control de rastreo SEO
├── sitemap.xml            # Mapa del sitio
├── manifest.webmanifest   # PWA manifest
├── assets/
│   ├── css/
│   │   └── styles.css     # Estilos personalizados
│   ├── js/
│   │   ├── main.js        # Navegación, tema, utilidades
│   │   ├── blog.js        # Gestión del blog
│   │   └── form.js        # Formulario de contacto
│   └── img/
│       └── favicon.svg    # Favicon (reemplazar con logo real)
└── posts/
    ├── 2025-01-bienvenida.md
    ├── 2025-02-checklist-legal.md
    └── 2025-03-asesoria-primera-visita.md
```

## 🚀 Deployment en GitHub Pages

### Paso 1: Subir el código

```bash
git add .
git commit -m "Initial commit - Delavalle Asesores website"
git push origin main
```

### Paso 2: Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Source**, selecciona:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click en **Save**
6. Espera 2-3 minutos y tu sitio estará en:
   `https://jamarbo.github.io/delavalleasesores/`

### Paso 3: Verificar deployment

Visita la URL y verifica que todo funcione correctamente.

## ⚙️ Configuración Inicial

### 1. Número de WhatsApp

**Buscar y reemplazar en todos los archivos HTML:**

```
+57xxxxxxxxxx
```

Por tu número real (incluye código de país sin +):

```
573001234567
```

**Archivos a modificar:**
- `index.html`
- `acerca.html`
- `servicios.html`
- `blog.html`
- `contacto.html`

### 2. Configurar Formulario de Contacto

Elige **UNA** de estas opciones:

#### Opción A: Formspree (Recomendado - Más fácil)

1. Crea cuenta gratuita en https://formspree.io
2. Crea un nuevo formulario
3. Copia tu endpoint (algo como `https://formspree.io/f/xyzabc123`)
4. Abre `assets/js/form.js`
5. Reemplaza:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/XXXXXXX';
   ```
   Con tu endpoint real:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzabc123';
   ```
6. Asegúrate de que:
   ```javascript
   const USE_FORMSPREE = true;
   ```

#### Opción B: EmailJS

1. Crea cuenta en https://www.emailjs.com
2. Configura tu servicio de email
3. Crea una plantilla
4. Abre `assets/js/form.js`
5. Reemplaza:
   ```javascript
   const EMAILJS_CONFIG = {
       serviceID: 'YOUR_SERVICE_ID',
       templateID: 'YOUR_TEMPLATE_ID',
       publicKey: 'YOUR_PUBLIC_KEY'
   };
   ```
6. Cambia a:
   ```javascript
   const USE_FORMSPREE = false;
   ```
7. Agrega el script de EmailJS en `contacto.html` antes de `</body>`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```

### 3. Enlaces de Redes Sociales

**Buscar y reemplazar en todos los footers:**

- LinkedIn: `https://www.linkedin.com/company/delavalle-asesores`
- Instagram: `https://www.instagram.com/delavalleasesores`
- YouTube: `https://www.youtube.com/@delavalleasesores`
- TikTok: `https://www.tiktok.com/@delavalleasesores`
- GitHub: `https://github.com/jamarbo`

### 4. Logo e Imágenes

Reemplaza los placeholders:

1. **Logo principal**: `assets/img/logo.svg` o `.png`
2. **Favicon**: `assets/img/favicon.svg` (actual es placeholder con "DA")
3. **Iconos PWA** (opcional):
   - `assets/img/icon-192.png`
   - `assets/img/icon-512.png`
4. **Fotos del equipo** en `acerca.html`

### 5. Información de Contacto

Actualiza en todos los archivos:

- **Email**: `info@delavalleasesores.com`
- **Teléfono**: `+57 (xxx) xxx-xxxx`
- **Dirección**: Actualizar según necesites

## 📝 Gestión del Blog

### Agregar un nuevo post

1. **Crear archivo Markdown** en `/posts/`:
   ```
   posts/2025-04-mi-nuevo-articulo.md
   ```

2. **Escribir contenido** en Markdown:
   ```markdown
   # Título del Artículo
   
   Introducción...
   
   ## Subtítulo
   
   Contenido...
   ```

3. **Registrar el post** en `assets/js/blog.js`:
   ```javascript
   const BLOG_POSTS = [
       // ... posts existentes
       {
           slug: '2025-04-mi-nuevo-articulo',
           file: 'posts/2025-04-mi-nuevo-articulo.md',
           title: 'Mi Nuevo Artículo',
           date: '2025-04-15',
           excerpt: 'Breve descripción del artículo...',
           tags: ['etiqueta1', 'etiqueta2'],
           author: 'Dr. Juan Delavalle'
       }
   ];
   ```

4. **Actualizar sitemap** en `sitemap.xml`:
   ```xml
   <url>
       <loc>https://jamarbo.github.io/delavalleasesores/blog.html?post=2025-04-mi-nuevo-articulo</loc>
       <lastmod>2025-04-15</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
   </url>
   ```

### Formato Markdown soportado

- Encabezados: `# ## ### ####`
- Negritas: `**texto**`
- Cursivas: `*texto*`
- Listas: `- item` o `1. item`
- Enlaces: `[texto](url)`
- Imágenes: `![alt](url)`
- Código: `` `código` `` o ` ```bloque``` `
- Citas: `> texto`
- Tablas
- Líneas horizontales: `---`

## 🎨 Personalización de Estilos

### Paleta de colores profesional

El sitio usa una paleta sobria y profesional ideal para servicios legales:

**Colores Primary (Slate/Gray):**
```css
:root {
    --color-primary-50: #f8fafc;
    --color-primary-100: #f1f5f9;
    --color-primary-600: #334155;
    --color-primary-700: #1e293b;
    --color-primary-800: #0f172a;
}
```

**Colores Accent (Púrpura elegante):**
```css
:root {
    --color-accent-600: #7c3aed;
    --color-accent-700: #6d28d9;
}
```

**Colores Gold (Para modo oscuro):**
```css
:root {
    --color-gold-400: #fbbf24;
    --color-gold-500: #f59e0b;
}
```

Para personalizar, edita `assets/css/styles.css` y el `<script>` de configuración de Tailwind en cada HTML.

### Hero Section

El hero incluye:
- **Imagen corporativa**: Edificio moderno que transmite solidez
- **Badges flotantes animados**: Estadísticas clave (100% Confiable, +15 Años, +500 Clientes)
- **Animaciones sutiles**: Efectos de entrada y flotación profesionales

Para cambiar la imagen del hero, edita en `index.html`:
```html
<img src="https://images.unsplash.com/photo-TU-IMAGEN-ID" ... />
```

### Fuentes

Para cambiar las fuentes, actualiza en el `<head>` de cada HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=TuFuente:wght@300;400;600;700&display=swap" rel="stylesheet">
```

Y en `tailwind.config`:

```javascript
fontFamily: {
    sans: ['TuFuente', 'sans-serif'],
    display: ['TuFuenteTitulares', 'serif'],
}
```

## 🔍 SEO

### Actualizar meta tags

En cada página HTML, actualiza:

```html
<title>Título de la Página - Delavalle Asesores</title>
<meta name="description" content="Descripción única de la página">
<meta name="keywords" content="palabras, clave, relevantes">
```

### Open Graph (redes sociales)

```html
<meta property="og:title" content="Título">
<meta property="og:description" content="Descripción">
<meta property="og:image" content="URL de imagen">
```

## 📊 Analytics (Opcional)

Para agregar Google Analytics 4:

1. Crea una propiedad en Google Analytics
2. Obtén tu ID de medición (G-XXXXXXXXXX)
3. Agrega antes de `</head>` en cada HTML:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## ✅ Checklist Pre-Launch

- [ ] Reemplazar número de WhatsApp
- [ ] Configurar formulario (Formspree o EmailJS)
- [ ] Actualizar enlaces de redes sociales
- [ ] Agregar logo y favicon reales
- [ ] Verificar información de contacto
- [ ] Revisar textos y copys
- [ ] Probar formulario de contacto
- [ ] Probar navegación en móvil
- [ ] Verificar todos los enlaces
- [ ] Probar tema claro/oscuro
- [ ] Verificar posts del blog
- [ ] Ejecutar Lighthouse (objetivo: >90)
- [ ] Probar en múltiples navegadores
- [ ] Verificar accesibilidad

## 🧪 Testing Local

Para probar localmente sin servidor:

1. Simplemente abre `index.html` en tu navegador
2. O usa un servidor local:

```bash
# Python 3
python -m http.server 8000

# Node.js (si tienes http-server instalado)
npx http-server

# VS Code - Extensión Live Server
# Click derecho en index.html > "Open with Live Server"
```

Luego abre: `http://localhost:8000`

## 🐛 Troubleshooting

### El blog no carga los posts

- Verifica que los archivos .md existen en `/posts/`
- Revisa la consola del navegador (F12) para errores
- Asegúrate de que `marked.js` esté cargando desde el CDN

### El formulario no envía

- Verifica que configuraste correctamente Formspree o EmailJS
- Revisa la consola para errores
- Verifica que el endpoint/configuración son correctos

### Imágenes no cargan

- Verifica las rutas relativas (deben empezar con `./ ` o `../`)
- Asegúrate de que los archivos existen

### Iconos no aparecen

- Verifica que el CDN de Lucide esté cargando
- Asegúrate de que `lucide.createIcons()` se ejecuta

## 📱 Soporte de Navegadores

- Chrome/Edge: ✅ Últimas 2 versiones
- Firefox: ✅ Últimas 2 versiones
- Safari: ✅ Últimas 2 versiones
- Mobile Safari: ✅ iOS 12+
- Chrome Mobile: ✅ Android 5+

## 📄 Licencia

© 2025 Delavalle Asesores. Todos los derechos reservados.

---

**Sitio web desarrollado para Delavalle Asesores**  
*Asesoría y consultoría jurídica con cobertura nacional en Colombia*

**Stack:** HTML5 • Tailwind CSS • Vanilla JavaScript • Markdown  
**Deployment:** GitHub Pages  
**Última actualización:** Noviembre 2025
