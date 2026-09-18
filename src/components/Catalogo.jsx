import { useCart } from "../context/CartContext";

const Catalogo = () => {
  const { addToCart } = useCart();

  const productos = [
    { id: 1, nombre: "Serum Revitalizante", precio: 45.0, img: "https://picsum.photos/seed/serum/400/300" },
    { id: 2, nombre: "Crema Hidratante Pro", precio: 32.5, img: "https://picsum.photos/seed/crema/400/300" },
    { id: 3, nombre: "Tónico Purificante", precio: 28.0, img: "https://picsum.photos/seed/tonico/400/300" },
    { id: 4, nombre: "Mascarilla Nocturna", precio: 50.0, img: "https://picsum.photos/seed/mascarilla/400/300" },
  ];

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
        Catálogo de Productos
      </h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {productos.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm flex flex-col"
          >
            <img
              src={prod.img}
              alt={prod.nombre}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-semibold text-slate-700 text-sm sm:text-base">
                {prod.nombre}
              </h3>
              <p className="text-indigo-600 font-bold mt-2 mb-4">
                ${prod.precio.toFixed(2)}
              </p>
              <button
                onClick={() => addToCart(prod)}
                className="mt-auto w-full bg-slate-900 text-white py-2.5 rounded text-sm hover:bg-indigo-600 active:bg-indigo-700 transition"
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
