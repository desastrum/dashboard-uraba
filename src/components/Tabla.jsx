import { useState } from 'react';
import { fmtNum, fmtPct } from '../utils/format';

const COLUMNAS = [
  { key: 'municipio',               label: 'Municipio',           fmt: (v) => v ?? '—' },
  { key: 'cobertura_acueducto',     label: 'Acueducto (%)',       fmt: fmtPct },
  { key: 'alcantarillado_municipal',label: 'Alcantarillado (%)',  fmt: fmtPct },
  { key: 'irca_municipal',          label: 'IRCA',                fmt: (v) => fmtNum(v, 1) },
  { key: 'idf',                     label: 'IDF',                 fmt: (v) => fmtNum(v, 1) },
  { key: 'tasa_mortalidad_infantil_menores5', label: 'Mort. Inf.', fmt: (v) => fmtNum(v, 1) },
  { key: 'incidencia_dengue',       label: 'Dengue',              fmt: (v) => fmtNum(v, 0) },
  { key: 'pib_pc*millon',           label: 'PIB PC (M)',          fmt: (v) => fmtNum(v, 2) },
  { key: 'pob_total',               label: 'Población',           fmt: (v) => v != null ? Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 }) : '—' },
];

export default function Tabla({ datos }) {
  const [ordenCol, setOrdenCol] = useState('municipio');
  const [asc, setAsc] = useState(true);

  function handleOrden(col) {
    if (ordenCol === col) setAsc((a) => !a);
    else { setOrdenCol(col); setAsc(true); }
  }

  const filas = [...datos].sort((a, b) => {
    const va = a[ordenCol];
    const vb = b[ordenCol];
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    const cmp = typeof va === 'string'
      ? va.localeCompare(vb, 'es')
      : Number(va) - Number(vb);
    return asc ? cmp : -cmp;
  });

  if (!datos.length) return <p className="text-slate-400 text-sm py-4 text-center">Sin datos para mostrar.</p>;

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm border-collapse bg-white">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {COLUMNAS.map((col) => (
              <th
                key={col.key}
                onClick={() => handleOrden(col.key)}
                className="px-4 py-3 text-left font-semibold text-slate-600 cursor-pointer whitespace-nowrap hover:bg-slate-100 select-none"
              >
                {col.label}
                {ordenCol === col.key && (
                  <span className="ml-1 text-blue-600">{asc ? '↑' : '↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, i) => (
            <tr
              key={`${fila.municipio}-${i}`}
              className={`border-b border-slate-100 hover:bg-blue-50 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}
            >
              {COLUMNAS.map((col) => (
                <td key={col.key} className="px-4 py-2.5 text-slate-700 whitespace-nowrap">
                  {col.fmt(fila[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
