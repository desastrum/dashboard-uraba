import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

function TooltipPersonalizado({ active, payload, label, nota }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 max-w-xs">
      <p className="font-semibold text-slate-800 mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm" style={{ color: p.fill }}>
          {p.name}: <strong>{p.value != null ? `${p.value.toFixed(1)}%` : '—'}</strong>
        </p>
      ))}
      {nota && <p className="text-xs text-slate-400 mt-2 border-t border-slate-100 pt-2">{nota}</p>}
    </div>
  );
}

export default function GraficaBarras({ datos, titulo, subtitulo, nota }) {
  const series = datos
    .filter((d) => d.municipio)
    .map((d) => ({
      municipio: d.municipio?.length > 10 ? d.municipio.substring(0, 10) + '…' : d.municipio,
      municipioFull: d.municipio,
      urbano: d.cobertura_acueducto_urbano,
      rural: d.cobertura_acueducto_rural,
    }));

  if (!series.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-base font-semibold text-slate-700 mb-1">{titulo}</h3>
        <p className="text-slate-400 text-sm py-8 text-center">Sin datos para el año seleccionado.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="text-base font-semibold text-slate-700">{titulo}</h3>
      {subtitulo && <p className="text-xs text-slate-400 mb-3">{subtitulo}</p>}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={series} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="municipio"
            tick={{ fontSize: 11, fill: '#64748b' }}
            angle={-35}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#64748b' }}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 100]}
          />
          <Tooltip content={<TooltipPersonalizado nota={nota} />} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          <Bar dataKey="urbano" name="Urbano" fill="#1d4ed8" radius={[3, 3, 0, 0]} />
          <Bar dataKey="rural"  name="Rural"  fill="#059669" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
