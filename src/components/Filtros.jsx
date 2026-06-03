import { ANIO_MIN, ANIO_MAX } from '../data/variables';

export default function Filtros({
  municipiosDisponibles,
  municipiosSeleccionados,
  setMunicipiosSeleccionados,
  anioMin,
  setAnioMin,
  anioMax,
  setAnioMax,
}) {
  const anios = Array.from({ length: ANIO_MAX - ANIO_MIN + 1 }, (_, i) => ANIO_MIN + i);

  function toggleMunicipio(m) {
    setMunicipiosSeleccionados((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  }

  function seleccionarTodos() {
    setMunicipiosSeleccionados([]);
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-wrap gap-6 items-start">
      <div className="flex-1 min-w-60">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Municipios
          <span className="ml-2 text-xs font-normal text-slate-400">
            {municipiosSeleccionados.length === 0 ? 'Todos' : `${municipiosSeleccionados.length} seleccionados`}
          </span>
        </label>
        <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
          <button
            onClick={seleccionarTodos}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
              municipiosSeleccionados.length === 0
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
            }`}
          >
            Todos
          </button>
          {municipiosDisponibles.map((m) => (
            <button
              key={m}
              onClick={() => toggleMunicipio(m)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                municipiosSeleccionados.includes(m)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Año desde</label>
          <select
            value={anioMin}
            onChange={(e) => setAnioMin(Number(e.target.value))}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {anios.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Año hasta</label>
          <select
            value={anioMax}
            onChange={(e) => setAnioMax(Number(e.target.value))}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {anios.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
