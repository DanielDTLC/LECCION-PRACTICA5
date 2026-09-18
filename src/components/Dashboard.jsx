const stats = [
  { label: "Ventas Totales", value: "$12,450.00" },
  { label: "Referidos Activos", value: "24" },
  { label: "Nivel Actual", value: "Diamante" },
];

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
        Resumen General
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-100"
          >
            <p className="text-xs sm:text-sm text-slate-500 uppercase font-semibold">
              {s.label}
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-indigo-600 mt-1 break-words">
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
