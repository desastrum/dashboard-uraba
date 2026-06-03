import { useMemo, useState } from 'react';
import { useData }    from '../hooks/useData';
import { useFiltros } from '../hooks/useFiltros';
import Filtros           from '../components/Filtros';
import KPICard           from '../components/KPICard';
import GraficaLinea      from '../components/GraficaLinea';
import GraficaBarras     from '../components/GraficaBarras';
import GraficaDispersion from '../components/GraficaDispersion';
import GraficaSalud      from '../components/GraficaSalud';
import Tabla             from '../components/Tabla';
import { VARIABLES_METADATA, KPI_CONFIG } from '../data/variables';
import { ANIO_MIN, ANIO_MAX } from '../data/variables';

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600" />
    </div>
  );
}

function SeccionTitulo({ titulo, subtitulo }) {
  return (
    <div className="mb-2">
      <h2 className="text-lg font-semibold text-slate-800">{titulo}</h2>
      {subtitulo && <p className="text-xs text-slate-400">{subtitulo}</p>}
    </div>
  );
}

export default function Dashboard() {
  const { datos, cargando, error } = useData();
  const {
    municipiosSeleccionados,
    setMunicipiosSeleccionados,
    anioMin, setAnioMin,
    anioMax, setAnioMax,
    anioComparacion, setAnioComparacion,
    municipiosDisponibles,
    datosFiltrados,
    datosMasFrecientes,
    datosAnioComparacion,
  } = useFiltros(datos);

  const municipiosMostrar = useMemo(
    () => municipiosSeleccionados.length > 0 ? municipiosSeleccionados : municipiosDisponibles,
    [municipiosSeleccionados, municipiosDisponibles]
  );

  const anioMaxReal = useMemo(
    () => datos.length ? Math.max(...datos.map((d) => Number(d.anio)).filter(Boolean)) : ANIO_MAX,
    [datos]
  );

  const kpiPromedios = useMemo(() => {
    if (!datosMasFrecientes.length) return {};
    const result = {};
    for (const cfg of KPI_CONFIG) {
      const vals = datosMasFrecientes
        .map((d) => Number(d[cfg.key]))
        .filter((v) => !isNaN(v));
      result[cfg.key] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
    }
    return result;
  }, [datosMasFrecientes]);

  const aniosComparacion = useMemo(() => {
    return Array.from({ length: ANIO_MAX - ANIO_MIN + 1 }, (_, i) => ANIO_MIN + i);
  }, []);

  if (cargando) return <Spinner />;
  if (error) return (
    <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-red-700 text-sm">
      Error al cargar datos: {error}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <section>
        <Filtros
          municipiosDisponibles={municipiosDisponibles}
          municipiosSeleccionados={municipiosSeleccionados}
          setMunicipiosSeleccionados={setMunicipiosSeleccionados}
          anioMin={anioMin}
          setAnioMin={setAnioMin}
          anioMax={anioMax}
          setAnioMax={setAnioMax}
        />
      </section>

      {/* KPIs */}
      <section>
        <p className="text-xs text-slate-400 mb-3">
          Promedios regionales — año más reciente con datos ({anioMaxReal})
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {KPI_CONFIG.map((cfg) => (
            <KPICard
              key={cfg.key}
              label={cfg.label}
              valor={kpiPromedios[cfg.key]}
              sufijo={cfg.sufijo}
              color={cfg.color}
              icono={cfg.icono}
              invert={cfg.invert}
              subtitulo={`Promedio ${municipiosMostrar.length} municipios`}
            />
          ))}
        </div>
      </section>

      {/* Gráficas — fila 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <SeccionTitulo
            titulo="Evolución cobertura de acueducto"
            subtitulo="Porcentaje de hogares con acceso al servicio"
          />
          <GraficaLinea
            datos={datosFiltrados}
            municipios={municipiosMostrar}
            variable="cobertura_acueducto"
            titulo="Cobertura de Acueducto (%)"
            sufijo="%"
            nota={VARIABLES_METADATA.cobertura_acueducto.nota_tooltip}
          />
        </div>

        <div>
          <SeccionTitulo
            titulo="Alcantarillado: urbano vs rural"
            subtitulo={`Comparación por municipio — año ${anioComparacion}`}
          />
          <div className="flex items-center gap-3 mb-3">
            <label className="text-xs text-slate-600 font-medium">Año:</label>
            <select
              value={anioComparacion}
              onChange={(e) => setAnioComparacion(Number(e.target.value))}
              className="border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {aniosComparacion.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <GraficaBarras
            datos={datosAnioComparacion.filter(
              (d) => municipiosMostrar.includes(d.municipio)
            )}
            titulo="Cobertura Acueducto Urbano vs Rural"
            nota={VARIABLES_METADATA.cobertura_acueducto_rural.nota_tooltip}
          />
        </div>
      </div>

      {/* Gráficas — fila 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <SeccionTitulo
            titulo="PIB per cápita vs Desempeño Fiscal"
            subtitulo={`Año más reciente — cada punto es un municipio`}
          />
          <GraficaDispersion
            datos={datosMasFrecientes.filter(
              (d) => municipiosMostrar.includes(d.municipio)
            )}
            titulo="Relación PIB PC — IDF"
            nota={`${VARIABLES_METADATA['pib_pc*millon'].nota_tooltip} | ${VARIABLES_METADATA.idf.nota_tooltip}`}
          />
        </div>

        <div>
          <SeccionTitulo
            titulo="Salud: mortalidad infantil e incidencia de dengue"
            subtitulo="Evolución temporal por municipio"
          />
          <GraficaSalud
            datos={datosFiltrados}
            municipios={municipiosMostrar.slice(0, 5)}
            titulo="Mortalidad <5 años y Dengue"
            nota={`${VARIABLES_METADATA.tasa_mortalidad_infantil_menores5.nota_tooltip} | ${VARIABLES_METADATA.incidencia_dengue.nota_tooltip}`}
          />
        </div>
      </div>

      {/* Tabla resumen */}
      <section>
        <SeccionTitulo
          titulo="Tabla resumen — indicadores recientes"
          subtitulo={`Año ${anioMaxReal} · Haz clic en el encabezado para ordenar`}
        />
        <Tabla
          datos={datosMasFrecientes.filter(
            (d) => municipiosMostrar.includes(d.municipio)
          )}
        />
      </section>
    </div>
  );
}
