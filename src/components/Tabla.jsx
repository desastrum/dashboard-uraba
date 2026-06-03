import { useState } from 'react';
import { fmtNum, fmtPct } from '../utils/format';

function fmtCOP(v) {
  if (v == null || isNaN(v)) return '—';
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(2)} B`;
  if (v >= 1_000_000)     return `$${(v / 1_000_000).toFixed(1)} M`;
  if (v >= 1_000)         return `$${(v / 1_000).toFixed(0)} K`;
  return `$${Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`;
}

const GRUPOS_COLUMNAS = [
  {
    grupo: 'Identificación',
    columnas: [
      { key: 'municipio', label: 'Municipio', fmt: (v) => v ?? '—', sticky: true },
    ],
  },
  {
    grupo: 'Acueducto (%)',
    columnas: [
      { key: 'cobertura_acueducto',       label: 'Total',   fmt: fmtPct },
      { key: 'cobertura_acueducto_urbano', label: 'Urbano',  fmt: fmtPct },
      { key: 'cobertura_acueducto_rural',  label: 'Rural',   fmt: fmtPct },
    ],
  },
  {
    grupo: 'Alcantarillado (%)',
    columnas: [
      { key: 'alcantarillado_municipal', label: 'Total',  fmt: fmtPct },
      { key: 'alcantarillado_urbano',    label: 'Urbano', fmt: fmtPct },
      { key: 'alcantarillado_rural',     label: 'Rural',  fmt: fmtPct },
    ],
  },
  {
    grupo: 'IRCA',
    columnas: [
      { key: 'irca_municipal', label: 'Municipal', fmt: (v) => fmtNum(v, 1) },
      { key: 'irca_urbano',    label: 'Urbano',    fmt: (v) => fmtNum(v, 1) },
      { key: 'irca_rural',     label: 'Rural',     fmt: (v) => fmtNum(v, 1) },
    ],
  },
  {
    grupo: 'Usuarios Acueducto',
    columnas: [
      { key: 'usuarios_total',        label: 'Total',     fmt: (v) => v != null ? Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 }) : '—' },
      { key: 'usuarios_activos',      label: 'Activos',   fmt: (v) => v != null ? Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 }) : '—' },
      { key: 'usuarios_activos_pct',  label: 'Activos %', fmt: fmtPct },
    ],
  },
  {
    grupo: 'Usuarios Alcantarillado',
    columnas: [
      { key: 'alc_usuarios_total',        label: 'Total',     fmt: (v) => v != null ? Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 }) : '—' },
      { key: 'alc_usuarios_activos',      label: 'Activos',   fmt: (v) => v != null ? Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 }) : '—' },
      { key: 'alc_usuarios_activos_pct',  label: 'Activos %', fmt: fmtPct },
    ],
  },
  {
    grupo: 'Usuarios Energía',
    columnas: [
      { key: 'en_usuarios_total',         label: 'Total',       fmt: (v) => v != null ? Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 }) : '—' },
      { key: 'en_usuarios_activos_pct',   label: 'Activos %',   fmt: fmtPct },
      { key: 'en_usuarios_urbano',        label: 'Urb.',        fmt: (v) => v != null ? Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 }) : '—' },
      { key: 'en_usuarios_activos_pct_urb', label: 'Urb. %',   fmt: fmtPct },
      { key: 'en_usuarios_rural',         label: 'Rur.',        fmt: (v) => v != null ? Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 }) : '—' },
      { key: 'en_usuarios_activos_pct_rur', label: 'Rur. %',   fmt: fmtPct },
    ],
  },
  {
    grupo: 'Salud',
    columnas: [
      { key: 'tasa_mortalidad_infantil_menores5',  label: 'Mort. <5',       fmt: (v) => fmtNum(v, 1) },
      { key: 'mortalidad_eda_menores5',            label: 'EDA <5',         fmt: (v) => fmtNum(v, 1) },
      { key: 'incidencia_dengue',                  label: 'Dengue',         fmt: (v) => fmtNum(v, 0) },
      { key: 'mortalidad_desnutricion_menores5',   label: 'Desnutr.',       fmt: (v) => fmtNum(v, 1) },
    ],
  },
  {
    grupo: 'Fiscal',
    columnas: [
      { key: 'idf',                   label: 'IDF',          fmt: (v) => fmtNum(v, 1) },
      { key: 'ingresos_tributarios_pc',label: 'Trib. PC',    fmt: (v) => fmtCOP(v) },
      { key: 'ingresos_ind_com_pc',    label: 'ICA PC',      fmt: (v) => fmtCOP(v) },
      { key: 'agua_potable',           label: 'Inv. Agua',   fmt: (v) => fmtCOP(v) },
    ],
  },
  {
    grupo: 'Economía',
    columnas: [
      { key: 'pib',           label: 'PIB (B COP)',   fmt: (v) => fmtNum(v, 2) },
      { key: 'pib_pc*millon', label: 'PIB PC (M)',    fmt: (v) => fmtNum(v, 2) },
      { key: 'avaluo_catastral_total',   label: 'Aval. Total', fmt: (v) => fmtNum(v, 0) },
      { key: 'avaluo_catastral_urbano',  label: 'Aval. Urb.',  fmt: (v) => fmtNum(v, 0) },
      { key: 'avaluo_catastral_rural',   label: 'Aval. Rur.',  fmt: (v) => fmtNum(v, 0) },
      { key: 'pob_total', label: 'Población', fmt: (v) => v != null ? Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 }) : '—' },
    ],
  },
];

// Flat list para ordenamiento
const COLUMNAS_FLAT = GRUPOS_COLUMNAS.flatMap((g) => g.columnas);

export default function Tabla({ datos }) {
  const [ordenCol, setOrdenCol] = useState('municipio');
  const [asc, setAsc] = useState(true);

  function handleOrden(key) {
    if (ordenCol === key) setAsc((a) => !a);
    else { setOrdenCol(key); setAsc(true); }
  }

  const filas = [...datos].sort((a, b) => {
    const va = a[ordenCol];
    const vb = b[ordenCol];
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    const cmp = typeof va === 'string' ? va.localeCompare(vb, 'es') : Number(va) - Number(vb);
    return asc ? cmp : -cmp;
  });

  if (!datos.length) return <p className="text-slate-400 text-sm py-4 text-center">Sin datos para mostrar.</p>;

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-xs border-collapse bg-white">
        <thead>
          {/* Fila de grupos */}
          <tr className="bg-slate-100 border-b border-slate-300">
            {GRUPOS_COLUMNAS.map((g) => (
              <th
                key={g.grupo}
                colSpan={g.columnas.length}
                className="px-3 py-2 text-center font-bold text-slate-600 border-r border-slate-200 whitespace-nowrap"
              >
                {g.grupo}
              </th>
            ))}
          </tr>
          {/* Fila de columnas */}
          <tr className="bg-slate-50 border-b border-slate-200">
            {COLUMNAS_FLAT.map((col) => (
              <th
                key={col.key}
                onClick={() => handleOrden(col.key)}
                className="px-3 py-2 text-left font-semibold text-slate-500 cursor-pointer whitespace-nowrap hover:bg-slate-100 select-none"
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
              {COLUMNAS_FLAT.map((col) => (
                <td key={col.key} className="px-3 py-2 text-slate-700 whitespace-nowrap">
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
