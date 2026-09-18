# MultiCatálogo — Estructura Frontend y Enrutamiento

Proyecto armado a partir de la guía "Estructura Frontend y Enrutamiento para
Catálogo Multinivel", con la estructura de carpetas completa y los bugs de
la guía original corregidos.

## Estructura de carpetas

```
multicatalogo-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   ├── AuthContext.jsx
    │   └── CartContext.jsx
    ├── components/
    │   ├── Layout.jsx
    │   ├── Navbar.jsx
    │   ├── Sidebar.jsx
    │   ├── Login.jsx
    │   └── ProtectedRoute.jsx
    └── pages/
        ├── Dashboard.jsx
        ├── Catalogo.jsx
        ├── MiRed.jsx
        └── Carrito.jsx
```

## Instalación

```bash
npm install
npm run dev
```

Credenciales de prueba (hardcodeadas, como indica la guía):
- Usuario: `admin@upse.edu.ec`
- Contraseña: `123456`

## Bugs de la guía original que se corrigieron

1. **`App.tsx` tenía una etiqueta rota**: `<index element={<Dashboard />} />`
   (con minúscula, sin `Route`) duplicada justo antes de la línea correcta
   `<Route index element={<Dashboard />} />`. Se eliminó la línea inválida.
2. **`useCart` y `useAuth` se usaban pero nunca se definían.** Se crearon
   `CartContext.jsx` y `AuthContext.jsx` con sus respectivos providers.
3. **Faltaban las rutas `/login` y `/carrito`** en `App.tsx`, a pesar de que
   `Navbar` y `Login` ya las referenciaban con `navigate()`/`Link`.
4. **No existía protección de rutas**: cualquiera podía navegar a `/` sin
   pasar por `Login`. Se agregó `ProtectedRoute.jsx`, que redirige a
   `/login` si `isAuthenticated` es `false`.
5. **`App.tsx` no envolvía la app en los providers** (`AuthProvider` /
   `CartProvider`), por lo que los hooks habrían fallado en tiempo de
   ejecución.
6. Se resolvió la mezcla inconsistente de extensiones `.tsx`/`.jsx` de la
   guía original unificando todo a `.jsx` (proyecto sin TypeScript), ya que
   el `npm install` indicado sólo agrega `react-router-dom`, sin tooling de
   TypeScript.

## Ejercicio de extensión (Sidebar colapsable)

Implementado en `Layout.jsx`, `Sidebar.jsx` y `Navbar.jsx`:

- `Layout.jsx` mantiene el estado global `isCollapsed` (con `useState`) y
  una función `toggleSidebar`.
- `Sidebar.jsx` recibe la prop `isCollapsed`: si es `true`, el ancho baja a
  `w-20` (80px) y sólo se muestran los íconos (de `lucide-react`), ocultando
  las etiquetas de texto.
- `Navbar.jsx` recibe `onToggleSidebar` y muestra un botón con el ícono
  `Menu` que alterna el estado global del Layout.
