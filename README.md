# PortalWow Theme

Tema personalizado para la tienda [portalwow.cl](https://portalwow.cl) — construido desde cero con el stack de Shopify (Liquid + CSS + JS vanilla).

**Paleta:** `#080A0D` (fondo) + `#00E5A0` (acento verde) + `#Outfit` / `Syne` (tipografía)

---

## Estructura del repositorio

```
portalwow-theme/
├── assets/
│   ├── theme.css          # Estilos globales + variables CSS
│   └── theme.js           # JS global (cursor, reveal, nav, cart, FAQ, tabs)
├── config/
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/
│   ├── theme.liquid        # Layout principal (HTML raíz)
│   └── password.liquid     # Página de contraseña
├── locales/
│   └── es.default.json
├── sections/
│   ├── header.liquid       # Navegación sticky + mobile drawer
│   ├── footer.liquid       # Footer con columnas de links
│   ├── header-group.json
│   ├── footer-group.json
│   ├── home-hero.liquid    # Homepage completa
│   ├── product-main.liquid # Página de producto con tabs
│   ├── collection-main.liquid
│   ├── page-content.liquid # Descargas / Soporte / FAQ / Privacidad / Términos
│   ├── blog-main.liquid
│   ├── article-main.liquid
│   ├── cart-main.liquid
│   └── not-found.liquid    # 404
├── snippets/
│   ├── product-card.liquid # Card reutilizable
│   └── icon-arrow.liquid
└── templates/
    ├── index.json
    ├── product.json
    ├── collection.json
    ├── page.json
    ├── blog.json
    ├── article.json
    ├── cart.json
    ├── 404.json
    └── customers/
        ├── login.json
        └── account.json
```

---

## Instalación via GitHub → Shopify

### 1. Conectar GitHub a Shopify

1. Shopify Admin → **Online Store → Themes**
2. Clic en **"Add theme" → "Connect from GitHub"**
3. Autoriza la conexión y selecciona este repositorio
4. Selecciona la rama `main`
5. Shopify importa el tema automáticamente

### 2. Subir el logo

1. Online Store → Themes → **Customize**
2. Selecciona la sección **Header**
3. Sube tu logo en **Settings → Logo**
4. Repite para el **Footer**

### 3. Crear las páginas necesarias

En **Online Store → Pages**, crea estas páginas con los handles exactos:

| Título | Handle (URL) |
|--------|-------------|
| Descargas | `descargas` |
| Soporte | `soporte` |
| Política de Privacidad | `politica-de-privacidad` |
| Términos y Condiciones | `terminos-y-condiciones` |
| Política de Reembolso | `politica-de-reembolso` |

> Las páginas `descargas` y `soporte` tienen contenido dinámico generado por `page-content.liquid`.  
> Las demás páginas puedes llenarlas con el editor de Shopify.

### 4. Crear el Blog

1. Online Store → Blog Posts → **Manage Blogs**
2. Crear blog con handle: `novedades`
3. El título puede ser "Novedades" o "Blog"

### 5. Activar el tema

1. Online Store → Themes
2. En el tema importado → **"Publish"**

---

## Personalización rápida

### Cambiar colores
Edita las variables CSS en `assets/theme.css`:

```css
:root {
  --pw-green:  #00E5A0;   /* Color acento principal */
  --pw-bg:     #080A0D;   /* Fondo oscuro */
  --pw-text:   #EDF0F4;   /* Texto principal */
}
```

### Cambiar tipografía
En `assets/theme.css` y `layout/theme.liquid`, reemplaza los nombres de las fuentes de Google Fonts.

### Precios del producto
Los precios se toman directamente de Shopify. Actualízalos en:  
**Products → Generador de Documentos → Pricing**

### Link de descarga
Actualiza la URL en `sections/header.liquid` y `sections/home-hero.liquid`:
```
https://portalwow.cl/descargas/instalador-portalwow
```

---

## Flujo de trabajo con GitHub

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/portalwow-theme.git

# Hacer cambios
# ...

# Subir cambios (Shopify sincroniza automáticamente desde la rama main)
git add .
git commit -m "feat: actualizar hero section"
git push origin main
```

> Shopify detecta el push y actualiza el tema automáticamente. No se necesita Shopify CLI.

---

## Páginas incluidas

| Página | Sección | URL |
|--------|---------|-----|
| Homepage | `home-hero.liquid` | `/` |
| Producto | `product-main.liquid` | `/products/generador-de-documentos` |
| Catálogo | `collection-main.liquid` | `/collections/all` |
| Descargas | `page-content.liquid` | `/pages/descargas` |
| Soporte/FAQ | `page-content.liquid` | `/pages/soporte` |
| Privacidad | `page-content.liquid` | `/pages/politica-de-privacidad` |
| Términos | `page-content.liquid` | `/pages/terminos-y-condiciones` |
| Blog | `blog-main.liquid` | `/blogs/novedades` |
| Artículo | `article-main.liquid` | `/blogs/novedades/[slug]` |
| Carrito | `cart-main.liquid` | `/cart` |
| 404 | `not-found.liquid` | `/404` |

---

## Stack técnico

- **Shopify Liquid** — templating
- **CSS vanilla** con variables custom (sin frameworks)
- **JS vanilla** — sin dependencias externas
- **Google Fonts** — Outfit + Syne + JetBrains Mono

---

*PortalWow © 2026 — Software que resuelve problemas reales.*
