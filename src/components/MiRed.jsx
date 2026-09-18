const referidos = [
  { id: 1, nombre: "Ana García", nivel: "Nivel 1", ventas: "$1,200" },
  { id: 2, nombre: "Luis Poveda", nivel: "Nivel 1", ventas: "$850" },
  { id: 3, nombre: "Marta Sánchez", nivel: "Nivel 2", ventas: "$430" },
];

const MiRed = () => {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
        Mi Red de Referidos
      </h1>

      {/* Móvil: tarjetas apiladas (una tabla de 3 columnas no cabe en 360px) */}
      <div className="grid gap-3 sm:hidden">
        {referidos.map((ref) => (
          <div
            key={ref.id}
            className="bg-white rounded-lg border border-slate-200 shadow-sm p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-slate-800">{ref.nombre}</h3>
              <span className="text-indigo-600 font-bold whitespace-nowrap">
                {ref.ventas}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{ref.nivel}</p>
          </div>
        ))}
      </div>

      {/* Tablet y escritorio: tabla clásica */}
      <div className="hidden sm:block bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-slate-600">Nombre</th>
              <th className="p-4 font-semibold text-slate-600">Jerarquía</th>
              <th className="p-4 font-semibold text-slate-600 whitespace-nowrap">
                Ventas Mensuales
              </th>
            </tr>
          </thead>
          <tbody>
            {referidos.map((ref) => (
              <tr
                key={ref.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="p-4 text-slate-700">{ref.nombre}</td>
                <td className="p-4 text-slate-500">{ref.nivel}</td>
                <td className="p-4 text-indigo-600 font-medium">{ref.ventas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MiRed;
