import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { colorPorIndice } from '../utils/format';

function TooltipPersonalizado({ active, payload, label, nota }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 max-w-xs">
      <p className="font-semibold text-slate-800 mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm" style={{ color: p.color }}>
          {p.name}: <strong>{p.value != null ? p.value.toFixed(1) : '—'}</strong>
        </p>
      ))}
      {nota && <p className="text-xs text-slate-400 mt-2 border-t border-slate-100 pt-2">{nota}</p>}
    </div>
  );
}

export default function GraficaLinea({ datos, municipios, variable, titulo, subtitulo, sufijo = '', nota }) {
  if (!datos.length || !municipios.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-base font-semibold text-slate-700 mb-1">{titulo}</h3>
        <p className="text-slate-400 text-sm py-8 text-center">Selecciona al menos un municipio.</p>
      </div>
    );
  }

  const anios = [...new Set(datos.map((d) => d.anio))].sort();
  const series = anios.map((anio) => {
    const fila = { anio };
    municipios.forEach((m) => {
      const registro = datos.find((d) => d.anio === anio && d.municipio === m);
      fila[m] = registro ? registro[variable] : null;
    });
    return fila;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="text-base font-semibold text-slate-700">{titulo}</h3>
      {subtitulo && <p className="text-xs text-slate-400 mb-3">{subtitulo}</p>}
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={series} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="anio" tick={{ fontSize: 12, fill: '#64748b' }} />
          <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `${v}${sufijo}`} />
          <Tooltip content={<TooltipPersonalizado nota={nota} />} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {municipios.map((m, i) => (
            <Line
              key={m}
              type="monotone"
              dataKey={m}
              stroke={colorPorIndice(i)}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
