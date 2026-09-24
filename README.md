# MultiCatálogo

Proyecto dividido en dos partes:

```
MultiCatalogo/
├── backend/    API en Go (Fiber) — puerto 3000
└── frontend/   React 19 + Vite + Tailwind + React Router 7 + TypeScript
```

## Backend
```bash
cd backend
go run main.go
```

## Frontend
```bash
cd frontend
npm install
npm run dev
```

El frontend se conecta al backend en `http://<host>:3000` (ver `frontend/src/config.js`).
Más detalle del frontend en `frontend/README.md`.
