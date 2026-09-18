import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { totalItems } = useCart();
  const { logout, userEmail } = useAuth();
  const navigate = useNavigate();

  // El menú por hover no funciona en pantallas táctiles: lo pasamos a click.
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-full hover:bg-slate-100 transition text-slate-600 shrink-0"
          aria-label="Colapsar o expandir menú"
          aria-expanded={isSidebarOpen}
        >
          {/* En móvil el icono refleja abierto/cerrado; en escritorio siempre hamburguesa */}
          <span className="md:hidden">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </span>
          <span className="hidden md:block">
            <Menu size={20} />
          </span>
        </button>
        <h2 className="hidden sm:block text-slate-600 font-medium text-base lg:text-lg truncate">
          Panel de Administración
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

        {/* El correo se oculta en móvil para no romper la barra */}
        <span className="hidden md:block text-sm text-slate-500 max-w-[180px] lg:max-w-xs truncate">
          {userEmail}
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
              {/* En móvil mostramos aquí el correo que ocultamos arriba */}
              <div className="md:hidden px-4 py-3 border-b border-slate-100">
                <p className="text-xs text-slate-400">Sesión iniciada como</p>
                <p className="text-sm text-slate-700 truncate">{userEmail}</p>
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
