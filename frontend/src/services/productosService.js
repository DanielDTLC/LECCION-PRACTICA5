// src/services/productosService.js
// Capa de servicios del catálogo.
// Actualmente devuelve datos de ejemplo (mock) simulando una llamada asíncrona.
// En la Unidad 2, estas funciones se reemplazarán por fetch a GET /api/productos
// sin necesidad de modificar los componentes que las consumen.

import { productosMock } from "../data/productos";

// Simula GET /api/productos (lista completa)
export const getProductos = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(productosMock), 400);
  });
};

// Simula GET /api/productos/:id (detalle de un producto)
export const getProductoById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(productosMock.find((p) => p.id === id)), 300);
  });
};
