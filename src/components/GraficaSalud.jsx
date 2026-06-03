import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import { colorPorIndice } from '../utils/format';

function TooltipPersonalizado({ active, payload, label, nota }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 max-w-xs">
      <p className="font-semibold text-slate-800 mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm" style={{ color: p.color ?? p.fill }}>
          {p.name}: <strong>{p.value != null ? Number(p.value).toFixed(1) : '—'}</strong>
        </p>
      ))}
      {nota && <p className="text-xs text-slate-400 mt-2 border-t border-slate-100 pt-2">{nota}</p>}
    </div>
  );
}

export default function GraficaSalud({ datos, municipios, titulo, subtitulo, nota }) {
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
      fila[`mort_${m}`]   = reg?.tasa_mortalidad_infantil_menores5 ?? null;
      fila[`dengue_${m}`] = reg?.incidencia_dengue ?? null;
    });
    return fila;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="text-base font-semibold text-slate-700">{titulo}</h3>
      {subtitulo && <p className="text-xs text-slate-400 mb-3">{subtitulo}</p>}
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={series} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="anio" tick={{ fontSize: 12, fill: '#64748b' }} />
          <YAxis yAxisId="mort" tick={{ fontSize: 11, fill: '#64748b' }} orientation="left" label={{ value: 'Mort. infantil', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } }} />
          <YAxis yAxisId="dengue" tick={{ fontSize: 11, fill: '#64748b' }} orientation="right" label={{ value: 'Dengue', angle: 90, position: 'insideRight', style: { fontSize: 10, fill: '#94a3b8' } }} />
          <Tooltip content={<TooltipPersonalizado nota={nota} />} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {municipios.map((m, i) => (
            <Line
              key={`mort_${m}`}
              yAxisId="mort"
              type="monotone"
              dataKey={`mort_${m}`}
              name={`Mort. <5 — ${m}`}
              stroke={colorPorIndice(i)}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls={false}
            />
          ))}
          {municipios.slice(0, 3).map((m, i) => (
            <Bar
              key={`dengue_${m}`}
              yAxisId="dengue"
              dataKey={`dengue_${m}`}
              name={`Dengue — ${m}`}
              fill={colorPorIndice(i + 4)}
              opacity={0.55}
              radius={[2, 2, 0, 0]}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
