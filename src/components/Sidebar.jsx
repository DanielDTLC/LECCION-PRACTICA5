import { NavLink } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Users, ShoppingCart, X } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/catalogo", label: "Catálogo", icon: ShoppingBag },
  { to: "/mi-red", label: "Mi Red", icon: Users },
  { to: "/carrito", label: "Carrito", icon: ShoppingCart },
];

const Sidebar = ({ isCollapsed, onNavigate, onClose }) => {
  return (
    <aside
      className={[
        // Móvil: drawer fijo que se desliza por encima del contenido.
        "fixed inset-y-0 left-0 z-40 w-64 max-w-[80vw]",
        "transform transition-transform duration-300 ease-in-out",
        isCollapsed ? "-translate-x-full" : "translate-x-0",
        // Escritorio (md+): vuelve al flujo normal y solo cambia de ancho.
        "md:static md:translate-x-0 md:max-w-none md:transition-[width]",
        isCollapsed ? "md:w-20" : "md:w-64",
        "bg-blue-600 text-white flex flex-col shrink-0",
      ].join(" ")}
      aria-label="Menú principal"
    >
      <div className="h-16 px-4 flex items-center justify-between border-b border-white/20 overflow-hidden whitespace-nowrap">
        <span className="text-xl font-bold truncate">
          {isCollapsed ? "MC" : "MultiCatálogo"}
        </span>
        {/* Cerrar: solo en móvil */}
        <button
          onClick={onClose}
          className="md:hidden p-2 -mr-2 rounded-full hover:bg-white/15 transition"
          aria-label="Cerrar menú"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={label}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 p-3 rounded-lg transition",
                isCollapsed ? "md:justify-center" : "",
                isActive ? "bg-blue-800 font-semibold" : "hover:bg-blue-700",
              ].join(" ")
            }
          >
            <Icon size={20} className="shrink-0" />
            {/* En móvil el drawer siempre está expandido; solo ocultamos en md+ */}
            <span className={isCollapsed ? "md:hidden" : ""}>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
