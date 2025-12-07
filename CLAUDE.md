# Rogoyin - Blog Personal

## Descripción General

Blog minimalista de ensayos personales construido con Eleventy, Decap CMS,
y hosteado en Netlify. Artículos escritos en Markdown con editor visual.

## Stack Tecnológico

- **Eleventy (11ty):** Generador de sitios estáticos.
- **Decap CMS:** Editor visual para crear artículos.
- **Netlify:** Hosting y autenticación.
- **HTML/CSS/JS:** Sin frameworks frontend.

## Estructura del Proyecto

```
Blog/
├── src/                        # Código fuente.
│   ├── _includes/              # Templates Nunjucks.
│   │   ├── Base.njk            # Layout base del sitio.
│   │   └── Articulo.njk        # Layout para artículos.
│   ├── _data/                  # Datos globales (si se necesitan).
│   ├── Articulos/              # Artículos en Markdown.
│   │   ├── Articulos.json      # Configuración de la colección.
│   │   └── [Nombre_Articulo].md
│   ├── Estilos/
│   │   └── Principal.css       # Estilos globales.
│   ├── Scripts/
│   │   └── Principal.js        # JavaScript del sitio.
│   ├── Imagenes/
│   │   ├── Articulos/          # Imágenes subidas desde el CMS.
│   │   └── Favicon.ico
│   ├── admin/                  # Decap CMS.
│   │   ├── index.html
│   │   └── config.yml
│   ├── index.njk               # Página principal.
│   └── 404.njk                 # Página de error.
├── _site/                      # Sitio generado (no se sube a git).
├── .eleventy.js                # Configuración de Eleventy.
├── .gitignore
├── netlify.toml                # Configuración de Netlify.
├── package.json
└── CLAUDE.md
```

## Comandos

```bash
# Desarrollo local (con hot reload).
npm run dev

# Generar sitio para producción.
npm run build
```

## Flujo para Agregar Nuevo Artículo

### Opción 1: Usando el CMS (recomendado)

1. Ir a `https://tu-sitio.netlify.app/admin/`.
2. Iniciar sesión con tu cuenta.
3. Click en "Nuevo Artículo".
4. Completar los campos:
   - Título
   - Categoría (Ensayo, Cuento, Crítica)
   - Fecha
   - Resumen
   - Imagen (opcional)
   - Contenido (editor visual con negrita, cursiva, listas, etc.)
5. Guardar → Se crea automáticamente el commit en GitHub.
6. Netlify detecta el cambio y regenera el sitio.

### Opción 2: Manualmente

1. Crear archivo `.md` en `src/Articulos/`.
2. Agregar frontmatter:
   ```yaml
   ---
   titulo: "Mi artículo"
   categoria: "Ensayo"
   fecha: 2025-12-07
   resumen: "Breve descripción."
   imagen: "/Imagenes/Articulos/mi-imagen.webp"  # Opcional.
   indice:  # Opcional.
     - id: "seccion-1"
       texto: "Primera sección"
   ---
   ```
3. Escribir contenido en Markdown.
4. Commit y push → Netlify regenera el sitio.

## Configuración Inicial de Netlify

1. Crear cuenta en [Netlify](https://netlify.com).
2. Conectar repositorio de GitHub.
3. Configuración de build:
   - Build command: `npm run build`
   - Publish directory: `_site`
4. Habilitar **Identity** en Site Settings > Identity.
5. Habilitar **Git Gateway** en Identity > Services > Git Gateway.
6. Invitar usuario(s) desde Identity > Invite users.

## Especificaciones de Diseño

### Paleta de Colores

**Modo Claro (por defecto):**
- Fondo: #FFFFFF
- Texto principal: #1A1A1A
- Texto secundario: #666666
- Acentos/bordes: #E0E0E0

**Modo Oscuro:**
- Fondo: #1A1A1A
- Texto principal: #F5F5F5
- Texto secundario: #A0A0A0
- Acentos/bordes: #333333

### Tipografía

- Fuente títulos: Playfair Display (Google Fonts) - serif.
- Fuente cuerpo: Roboto (Google Fonts) - sans-serif.
- Tamaño base: 18px.
- Line-height: 1.7.

### Componentes

**Header/Navegación:**
- Logo "Rogoyin" a la izquierda.
- Filtros: Todos | Ensayos | Cuentos | Críticas.
- Toggle modo claro/oscuro.
- Desaparece al scrollear abajo, reaparece al subir.

**Tarjetas de artículos:**
- Imagen (opcional).
- Título, fecha, resumen, categoría.
- Hover con elevación sutil.

**Página de artículo:**
- Título, fecha, categoría.
- Imagen principal (opcional).
- Índice (opcional).
- Contenido con tipografía optimizada.
- Sección "Otros artículos".
- Botón flotante "Ir arriba" con deshacer.

### Responsive

- Móvil: < 768px (1 columna).
- Tablet: 768px - 1024px (2 columnas).
- Desktop: > 1024px (3 columnas).

## JavaScript (Principal.js)

1. **Header inteligente:** Oculta/muestra según dirección de scroll.
2. **Toggle tema:** Cambia modo y persiste en localStorage.
3. **Filtrado:** Muestra/oculta tarjetas por categoría.
4. **Botón ir arriba:** Con función deshacer.

## Notas Importantes

- Los IDs de sección en Markdown deben escribirse con `<h2 id="mi-id">`
  en lugar de `## Título {#mi-id}` por conflicto con Nunjucks.
- Las imágenes subidas desde el CMS van a `src/Imagenes/Articulos/`.
- El sitio se regenera automáticamente con cada push a `main`.

## Contacto

- Email: francorogoyin@gmail.com
- Autor: Rogoyin
