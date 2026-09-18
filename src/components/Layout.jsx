import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MOBILE_BREAKPOINT = 768; // coincide con 'md' de Tailwind

const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;

const Layout = () => {
  // - En escritorio: alterna entre ancho completo (w-64) e icono-solo (w-20).
  // - En móvil: alterna entre oculto (fuera de pantalla) y visible como drawer.
  const [isCollapsed, setIsCollapsed] = useState(() => isMobile());

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const closeSidebar = () => setIsCollapsed(true);

  // Al navegar desde el menú en móvil, cerramos el drawer automáticamente.
  const handleNavigate = () => {
    if (isMobile()) setIsCollapsed(true);
  };

  // Si el usuario gira el dispositivo o achica la ventana, evitamos que el
  // drawer quede abierto tapando todo el contenido.
  useEffect(() => {
    const onResize = () => {
      if (isMobile()) setIsCollapsed(true);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Bloquea el scroll del body mientras el drawer móvil está abierto.
  useEffect(() => {
    const locked = !isCollapsed && isMobile();
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCollapsed]);

  // Cerrar con la tecla Escape.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isMobile()) setIsCollapsed(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-[100dvh] h-[100dvh] bg-slate-50 overflow-hidden">
      <Sidebar
        isCollapsed={isCollapsed}
        onNavigate={handleNavigate}
        onClose={closeSidebar}
      />

      {/* Overlay oscuro solo en móvil cuando el drawer está abierto */}
      {!isCollapsed && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Área de Contenido Principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={!isCollapsed} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
