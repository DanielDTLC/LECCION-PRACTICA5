import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const Carrito = () => {
  const { cart, removeFromCart, totalPrice } = useCart();

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
        Tu Carrito de Compras
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm text-center">
          <p className="text-slate-500">Tu carrito está vacío actualmente.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 sm:p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3 sm:gap-4"
              >
                <img
                  src={item.img}
                  alt={item.nombre}
                  className="w-16 h-16 shrink-0 object-cover rounded-md"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-800 truncate">
                    {item.nombre}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Cantidad: {item.cantidad}
                  </p>
                  {/* En móvil el precio va debajo del nombre */}
                  <p className="sm:hidden font-bold text-indigo-600 mt-1">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                  <p className="hidden sm:block font-bold text-indigo-600 whitespace-nowrap">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-full text-red-500 hover:bg-red-50 hover:text-red-700 transition"
                    aria-label={`Eliminar ${item.nombre}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de pago: se pega arriba en escritorio */}
          <div className="bg-white p-5 sm:p-6 rounded-lg border border-slate-200 shadow-sm h-fit lg:sticky lg:top-0">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Resumen del Pedido
            </h2>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center gap-4 mb-6">
              <span className="text-slate-800 font-bold">Total a Pagar</span>
              <span className="text-xl sm:text-2xl font-bold text-indigo-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 active:bg-indigo-800 transition">
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
