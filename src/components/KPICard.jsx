import { fmtNum } from '../utils/format';

const COLORES = {
  blue:   { bg: 'bg-blue-50',   borde: 'border-blue-200',   texto: 'text-blue-700',   valor: 'text-blue-900' },
  teal:   { bg: 'bg-teal-50',   borde: 'border-teal-200',   texto: 'text-teal-700',   valor: 'text-teal-900' },
  green:  { bg: 'bg-green-50',  borde: 'border-green-200',  texto: 'text-green-700',  valor: 'text-green-900' },
  indigo: { bg: 'bg-indigo-50', borde: 'border-indigo-200', texto: 'text-indigo-700', valor: 'text-indigo-900' },
};

export default function KPICard({ label, valor, sufijo, color = 'blue', icono, subtitulo, invert }) {
  const c = COLORES[color] || COLORES.blue;
  const decimales = sufijo === 'M' ? 2 : 1;
  const valorFmt = valor != null ? fmtNum(valor, decimales) : '—';

  return (
    <div className={`rounded-xl border ${c.bg} ${c.borde} p-5 flex flex-col gap-1 shadow-sm`}>
      <div className="flex items-center gap-2">
        <span className="text-xl">{icono}</span>
        <span className={`text-sm font-medium ${c.texto}`}>{label}</span>
      </div>
      <div className={`text-3xl font-bold ${c.valor} mt-1`}>
        {valorFmt}
        {valor != null && <span className="text-lg font-medium ml-1">{sufijo}</span>}
      </div>
      {subtitulo && (
        <p className={`text-xs ${c.texto} mt-1 opacity-80`}>{subtitulo}</p>
      )}
      {invert && valor != null && (
        <p className="text-xs text-slate-500 mt-1">Menor valor = mejor calidad</p>
      )}
    </div>
  );
}
