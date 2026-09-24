// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onToggleSidebar }) => {
  const { totalItems } = useCart();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-2 md:gap-4 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-slate-100 transition text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Alternar menú"
        >
          <Menu size={22} />
        </button>
        <h2 className="text-slate-600 font-medium text-base lg:text-lg truncate hidden sm:block">
          {user?.rol === "admin"
            ? "Panel de Administración"
            : "Tienda MultiCatálogo"}
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <Link
          to="/carrito"
          className="relative p-2 hover:bg-slate-100 rounded-full transition text-slate-700"
          aria-label={`Carrito (${totalItems} artículos)`}
        >
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold min-w-5 h-5 px-1 flex items-center justify-center rounded-full translate-x-1 -translate-y-1">
              {totalItems}
            </span>
          )}
        </Link>

        <span className="hidden md:block text-sm text-slate-500 max-w-[180px] lg:max-w-xs truncate">
          {user?.email}
        </span>

        <span
          className={`hidden md:inline-block text-xs font-semibold px-2 py-1 rounded-full uppercase ${
            user?.rol === "admin"
              ? "bg-amber-100 text-amber-700"
              : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {user?.rol}
        </span>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border border-slate-300 flex items-center justify-center"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="Menú de usuario"
          >
            <img
              src="https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg"
              alt="Avatar del usuario"
              className="w-full h-full object-cover"
            />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 w-56 max-w-[calc(100vw-1.5rem)] bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden"
            >
              <div className="md:hidden px-4 py-3 border-b border-slate-100">
                <p className="text-xs text-slate-400">Sesión iniciada como</p>
                <p className="text-sm text-slate-700 truncate">{user?.email}</p>
                <p className="text-xs uppercase font-semibold text-indigo-600 mt-1">
                  {user?.rol}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-600 font-semibold hover:bg-red-50 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
