import { useState } from 'react';
import { VARIABLES_METADATA } from '../data/variables';

const GRUPOS = [
  {
    titulo: 'Cobertura de Agua y Saneamiento',
    icono: '💧',
    variables: ['cobertura_acueducto', 'cobertura_acueducto_urbano', 'cobertura_acueducto_rural', 'alcantarillado_municipal'],
  },
  {
    titulo: 'Calidad del Agua',
    icono: '🔬',
    variables: ['irca_municipal'],
  },
  {
    titulo: 'Indicadores de Salud',
    icono: '🏥',
    variables: ['tasa_mortalidad_infantil_menores5', 'incidencia_dengue', 'mortalidad_desnutricion_menores5'],
  },
  {
    titulo: 'Desempeño Fiscal',
    icono: '📊',
    variables: ['idf', 'ingresos_tributarios_pc'],
  },
  {
    titulo: 'Economía y Demografía',
    icono: '💰',
    variables: ['pib_pc*millon', 'pob_total'],
  },
];

function FichaTecnica({ varKey, meta }) {
  const [abierta, setAbierta] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
        onClick={() => setAbierta((a) => !a)}
      >
        <div>
          <span className="text-sm font-semibold text-slate-800">{meta.label}</span>
          <span className="ml-2 text-xs text-slate-400 font-mono">{varKey}</span>
        </div>
        <span className="text-slate-400 text-lg">{abierta ? '−' : '+'}</span>
      </button>

      {abierta && (
        <div className="px-5 pb-5 border-t border-slate-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Descripción</p>
              <p className="text-sm text-slate-700">{meta.descripcion}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Fuente</p>
              <p className="text-sm text-slate-700">{meta.fuente}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Unidad</p>
              <p className="text-sm text-slate-700">{meta.unidad}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Documento metodológico
            </p>
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
              <span className="text-2xl">📄</span>
              <div>
                <p className="text-sm font-medium text-slate-600">Documento próximamente</p>
                <p className="text-xs text-slate-400">
                  Aquí se vinculará el PDF con la ficha técnica completa de construcción e interpolación de esta variable.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Metodologia() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Notas metodológicas</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Este panel presenta indicadores municipales para los once municipios de la subregión de Urabá
          (Antioquia, Colombia) para el periodo 2014–2024. Las variables fueron construidas a partir de
          fuentes oficiales (DANE, DNP, INS, SSPD) y, en algunos casos, interpoladas o completadas mediante
          métodos estadísticos para años sin reporte explícito. A continuación se detallan las fichas técnicas
          por variable.
        </p>
      </div>

      {GRUPOS.map((grupo) => (
        <section key={grupo.titulo}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{grupo.icono}</span>
            <h3 className="text-base font-bold text-slate-700">{grupo.titulo}</h3>
          </div>
          <div className="space-y-3">
            {grupo.variables.map((v) =>
              VARIABLES_METADATA[v] ? (
                <FichaTecnica key={v} varKey={v} meta={VARIABLES_METADATA[v]} />
              ) : null
            )}
          </div>
        </section>
      ))}

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h4 className="font-semibold text-blue-800 mb-2">Documentos metodológicos completos</h4>
        <p className="text-sm text-blue-700">
          Los PDFs con las fichas técnicas extendidas (procedimientos de construcción, imputación,
          y validación) se agregarán en la carpeta <code className="bg-blue-100 px-1 rounded">docs/</code> del repositorio.
        </p>
      </div>
    </div>
  );
}
