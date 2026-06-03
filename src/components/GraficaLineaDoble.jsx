import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import { colorPorIndice } from '../utils/format';

function TooltipPersonalizado({ active, payload, label, nota, fmtA, fmtB }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 max-w-xs">
      <p className="font-semibold text-slate-800 mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={p.dataKey} className="text-sm" style={{ color: p.color ?? p.fill }}>
          {p.name}: <strong>{p.value != null ? (i === 0 && fmtA ? fmtA(p.value) : i === 1 && fmtB ? fmtB(p.value) : Number(p.value).toLocaleString('es-CO')) : '—'}</strong>
        </p>
      ))}
      {nota && <p className="text-xs text-slate-400 mt-2 border-t border-slate-100 pt-2">{nota}</p>}
    </div>
  );
}

/**
 * Gráfica con un municipio, dos variables en el mismo eje o ejes distintos.
 * Útil para evolución de ingresos tributarios + ICA, o PIB + PIB pc.
 */
export default function GraficaLineaDoble({
  datos,
  municipios,
  varA,
  varB,
  labelA,
  labelB,
  titulo,
  subtitulo,
  nota,
  sufijoA = '',
  sufijoB = '',
  dosEjes = false,
}) {
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
      const reg = datos.find((d) => d.anio === anio && d.municipio === m);
      fila[`a_${m}`] = reg?.[varA] != null ? Number(reg[varA]) : null;
      fila[`b_${m}`] = reg?.[varB] != null ? Number(reg[varB]) : null;
    });
    return fila;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="text-base font-semibold text-slate-700">{titulo}</h3>
      {subtitulo && <p className="text-xs text-slate-400 mb-3">{subtitulo}</p>}
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={series} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="anio" tick={{ fontSize: 12, fill: '#64748b' }} />
          <YAxis
            yAxisId="a"
            orientation="left"
            tick={{ fontSize: 11, fill: '#64748b' }}
            tickFormatter={(v) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)}M` : v >= 1_000 ? `${(v / 1_000).toFixed(0)}K` : `${v}${sufijoA}`}
          />
          {dosEjes && (
            <YAxis
              yAxisId="b"
              orientation="right"
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickFormatter={(v) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)}M` : v >= 1_000 ? `${(v / 1_000).toFixed(0)}K` : `${v}${sufijoB}`}
            />
          )}
          <Tooltip content={<TooltipPersonalizado nota={nota} />} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {municipios.map((m, i) => (
            <Line
              key={`a_${m}`}
              yAxisId="a"
              type="monotone"
              dataKey={`a_${m}`}
              name={`${labelA} — ${m}`}
              stroke={colorPorIndice(i)}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls={false}
            />
          ))}
          {municipios.map((m, i) => (
            <Line
              key={`b_${m}`}
              yAxisId={dosEjes ? 'b' : 'a'}
              type="monotone"
              dataKey={`b_${m}`}
              name={`${labelB} — ${m}`}
              stroke={colorPorIndice(i + 5)}
              strokeWidth={2}
              strokeDasharray="5 3"
              dot={{ r: 3 }}
              connectNulls={false}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
