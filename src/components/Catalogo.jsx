import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { useCart } from "../context/CartContext";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
  fetch(`${API_URL}/api/productos`)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      setProductos(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      setError("No se pudo cargar el catálogo. Intenta más tarde.");
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-slate-500 text-lg">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Catálogo de Productos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <img
              src={producto.img}
              alt={producto.nombre}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 text-lg">
                {producto.nombre}
              </h3>
              <p className="text-indigo-600 font-bold mt-1">
                ${producto.precio.toFixed(2)}
              </p>
              <button
                onClick={() => addToCart(producto)}
                className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;