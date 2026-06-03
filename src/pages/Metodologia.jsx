import { useState } from 'react';
import { VARIABLES_METADATA, GRUPOS_METODOLOGIA } from '../data/variables';

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
          <span className="ml-2 text-xs text-slate-400 font-mono bg-slate-100 px-1.5 py-0.5 rounded">{varKey}</span>
        </div>
        <span className="text-slate-400 text-lg ml-4 flex-shrink-0">{abierta ? '−' : '+'}</span>
      </button>

      {abierta && (
        <div className="px-5 pb-5 border-t border-slate-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Descripción</p>
              <p className="text-sm text-slate-700 leading-relaxed">{meta.descripcion}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Fuente primaria</p>
              <p className="text-sm text-slate-700">{meta.fuente}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Unidad</p>
              <p className="text-sm font-mono text-slate-700 bg-slate-50 px-2 py-1 rounded inline-block">{meta.unidad}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Nota en gráfica</p>
              <p className="text-sm text-slate-500 italic">{meta.nota_tooltip}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Documento metodológico
            </p>
            <div className="flex items-center gap-3 bg-slate-50 border border-dashed border-slate-300 rounded-lg px-4 py-3">
              <span className="text-2xl">📄</span>
              <div>
                <p className="text-sm font-medium text-slate-500">Documento próximamente</p>
                <p className="text-xs text-slate-400">
                  Se vinculará el PDF con la ficha técnica completa de construcción e interpolación de esta variable.
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
      {/* Introducción */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Notas metodológicas</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          Este panel presenta indicadores municipales para los once municipios de la subregión de Urabá
          (Antioquia, Colombia) para el periodo 2014–2024. Las variables fueron construidas a partir de
          fuentes oficiales (DANE, DNP, INS, SSPD, IGAC) y, en algunos casos, interpoladas o completadas
          mediante métodos estadísticos para años sin reporte explícito.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { n: '37', label: 'Variables en el panel' },
            { n: '11', label: 'Municipios' },
            { n: '11', label: 'Años (2014–2024)' },
            { n: '121', label: 'Observaciones' },
          ].map((item) => (
            <div key={item.label} className="bg-blue-50 rounded-lg px-4 py-3 text-center">
              <p className="text-2xl font-bold text-blue-700">{item.n}</p>
              <p className="text-xs text-blue-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fichas por grupo */}
      {GRUPOS_METODOLOGIA.map((grupo) => (
        <section key={grupo.titulo}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{grupo.icono}</span>
            <h3 className="text-base font-bold text-slate-700">{grupo.titulo}</h3>
            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {grupo.variables.length} variables
            </span>
          </div>
          <div className="space-y-3">
            {grupo.variables.map((v) =>
              VARIABLES_METADATA[v] ? (
                <FichaTecnica key={v} varKey={v} meta={VARIABLES_METADATA[v]} />
              ) : (
                <div key={v} className="border border-dashed border-slate-200 rounded-lg px-4 py-3 text-xs text-slate-400">
                  <code>{v}</code> — Ficha pendiente de completar.
                </div>
              )
            )}
          </div>
        </section>
      ))}

      {/* Aviso documentos */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h4 className="font-semibold text-blue-800 mb-2">Documentos metodológicos completos</h4>
        <p className="text-sm text-blue-700">
          Los PDFs con las fichas técnicas extendidas (procedimientos de construcción, imputación
          y validación) se agregarán en la carpeta{' '}
          <code className="bg-blue-100 px-1 rounded">docs/</code> del repositorio.
        </p>
      </div>
    </div>
  );
}
