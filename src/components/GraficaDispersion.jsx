import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Label,
} from 'recharts';
import { colorPorIndice } from '../utils/format';

function TooltipPersonalizado({ active, payload, nota }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 max-w-xs">
      <p className="font-semibold text-slate-800 mb-1">{d?.municipio}</p>
      <p className="text-sm text-slate-600">PIB PC: <strong>${d?.x != null ? d.x.toFixed(2) : '—'} M</strong></p>
      <p className="text-sm text-slate-600">IDF: <strong>{d?.y != null ? d.y.toFixed(1) : '—'}</strong></p>
      {nota && <p className="text-xs text-slate-400 mt-2 border-t border-slate-100 pt-2">{nota}</p>}
    </div>
  );
}

export default function GraficaDispersion({ datos, titulo, subtitulo, nota }) {
  const series = datos
    .filter((d) => d.municipio && d['pib_pc*millon'] != null && d.idf != null)
    .map((d, i) => ({
      municipio: d.municipio,
      x: Number(d['pib_pc*millon']),
      y: Number(d.idf),
      fill: colorPorIndice(i),
    }));

  if (!series.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-base font-semibold text-slate-700 mb-1">{titulo}</h3>
        <p className="text-slate-400 text-sm py-8 text-center">Sin datos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="text-base font-semibold text-slate-700">{titulo}</h3>
      {subtitulo && <p className="text-xs text-slate-400 mb-3">{subtitulo}</p>}
      <div className="flex flex-wrap gap-2 mb-3">
        {series.map((s) => (
          <span key={s.municipio} className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: s.fill }} />
            {s.municipio}
          </span>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis type="number" dataKey="x" name="PIB PC" tick={{ fontSize: 12, fill: '#64748b' }}>
            <Label value="PIB per cápita (M COP)" offset={-10} position="insideBottom" style={{ fontSize: 11, fill: '#94a3b8' }} />
          </XAxis>
          <YAxis type="number" dataKey="y" name="IDF" tick={{ fontSize: 12, fill: '#64748b' }}>
            <Label value="IDF" angle={-90} position="insideLeft" style={{ fontSize: 11, fill: '#94a3b8' }} />
          </YAxis>
          <Tooltip content={<TooltipPersonalizado nota={nota} />} />
          {series.map((s) => (
            <Scatter
              key={s.municipio}
              name={s.municipio}
              data={[s]}
              fill={s.fill}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
