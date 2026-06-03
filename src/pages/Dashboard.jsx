import { useMemo, useState } from 'react';
import { useData }    from '../hooks/useData';
import { useFiltros } from '../hooks/useFiltros';
import Filtros                  from '../components/Filtros';
import KPICard                  from '../components/KPICard';
import GraficaLinea             from '../components/GraficaLinea';
import GraficaBarras            from '../components/GraficaBarras';
import GraficaDispersion        from '../components/GraficaDispersion';
import GraficaSalud             from '../components/GraficaSalud';
import GraficaLineaDoble        from '../components/GraficaLineaDoble';
import GraficaUsuariosServicios from '../components/GraficaUsuariosServicios';
import Tabla                    from '../components/Tabla';
import { VARIABLES_METADATA, KPI_CONFIG, ANIO_MIN, ANIO_MAX } from '../data/variables';

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600" />
    </div>
  );
}

function SeccionHeader({ titulo, descripcion }) {
  return (
    <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-200">
      <h2 className="text-lg font-bold text-slate-800">{titulo}</h2>
      {descripcion && <span className="text-xs text-slate-400">{descripcion}</span>}
    </div>
  );
}

function SelectorAnio({ label, valor, onChange }) {
  const anios = Array.from({ length: ANIO_MAX - ANIO_MIN + 1 }, (_, i) => ANIO_MIN + i);
  return (
    <div className="flex items-center gap-2 mb-3">
      <label className="text-xs text-slate-600 font-medium">{label}:</label>
      <select
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {anios.map((a) => <option key={a} value={a}>{a}</option>)}
      </select>
    </div>
  );
}

export default function Dashboard() {
  const { datos, cargando, error } = useData();
  const {
    municipiosSeleccionados, setMunicipiosSeleccionados,
    anioMin, setAnioMin,
    anioMax, setAnioMax,
    anioComparacion, setAnioComparacion,
    municipiosDisponibles,
    datosFiltrados,
    datosMasFrecientes,
    datosAnioComparacion,
  } = useFiltros(datos);

  const [anioComparacion2, setAnioComparacion2] = useState(ANIO_MAX);
  const [anioComparacion3, setAnioComparacion3] = useState(ANIO_MAX);
  const [anioComparacion4, setAnioComparacion4] = useState(ANIO_MAX);

  const municipiosMostrar = useMemo(
    () => municipiosSeleccionados.length > 0 ? municipiosSeleccionados : municipiosDisponibles,
    [municipiosSeleccionados, municipiosDisponibles]
  );

  const anioMaxReal = useMemo(
    () => datos.length ? Math.max(...datos.map((d) => Number(d.anio)).filter(Boolean)) : ANIO_MAX,
    [datos]
  );

  const datosComp2 = useMemo(
    () => datos.filter((d) => Number(d.anio) === anioComparacion2),
    [datos, anioComparacion2]
  );
  const datosComp3 = useMemo(
    () => datos.filter((d) => Number(d.anio) === anioComparacion3),
    [datos, anioComparacion3]
  );
  const datosComp4 = useMemo(
    () => datos.filter((d) => Number(d.anio) === anioComparacion4),
    [datos, anioComparacion4]
  );

  const kpiPromedios = useMemo(() => {
    if (!datosMasFrecientes.length) return {};
    const result = {};
    for (const cfg of KPI_CONFIG) {
      const vals = datosMasFrecientes.map((d) => Number(d[cfg.key])).filter((v) => !isNaN(v));
      result[cfg.key] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
    }
    return result;
  }, [datosMasFrecientes]);

  if (cargando) return <Spinner />;
  if (error) return (
    <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-red-700 text-sm">
      Error al cargar datos: {error}
    </div>
  );

  const filtradosPorMunicipio = (arr) =>
    arr.filter((d) => municipiosMostrar.includes(d.municipio));

  return (
    <div className="space-y-8">

      {/* ── Filtros ─────────────────────────────────────────────── */}
      <section>
        <Filtros
          municipiosDisponibles={municipiosDisponibles}
          municipiosSeleccionados={municipiosSeleccionados}
          setMunicipiosSeleccionados={setMunicipiosSeleccionados}
          anioMin={anioMin} setAnioMin={setAnioMin}
          anioMax={anioMax} setAnioMax={setAnioMax}
        />
      </section>

      {/* ── KPIs ────────────────────────────────────────────────── */}
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
              subtitulo={`Promedio ${municipiosMostrar.length} mun.`}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 1. COBERTURA DE AGUA Y ALCANTARILLADO                     */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section>
        <SeccionHeader titulo="1. Cobertura de Agua y Alcantarillado" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GraficaLinea
            datos={datosFiltrados}
            municipios={municipiosMostrar}
            variable="cobertura_acueducto"
            titulo="Evolución cobertura de acueducto (%)"
            sufijo="%"
            nota={VARIABLES_METADATA.cobertura_acueducto.nota_tooltip}
          />
          <div>
            <SelectorAnio label="Año" valor={anioComparacion} onChange={setAnioComparacion} />
            <GraficaBarras
              datos={filtradosPorMunicipio(datosAnioComparacion)}
              titulo={`Acueducto urbano vs rural — ${anioComparacion}`}
              varA="cobertura_acueducto_urbano"
              varB="cobertura_acueducto_rural"
              labelA="Urbano" labelB="Rural"
              colorA="#1d4ed8" colorB="#059669"
              sufijo="%" domainMax={100}
              nota={VARIABLES_METADATA.cobertura_acueducto_urbano.nota_tooltip}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <GraficaLinea
            datos={datosFiltrados}
            municipios={municipiosMostrar}
            variable="alcantarillado_municipal"
            titulo="Evolución cobertura de alcantarillado (%)"
            sufijo="%"
            nota={VARIABLES_METADATA.alcantarillado_municipal.nota_tooltip}
          />
          <div>
            <SelectorAnio label="Año" valor={anioComparacion2} onChange={setAnioComparacion2} />
            <GraficaBarras
              datos={filtradosPorMunicipio(datosComp2)}
              titulo={`Alcantarillado urbano vs rural — ${anioComparacion2}`}
              varA="alcantarillado_urbano"
              varB="alcantarillado_rural"
              labelA="Urbano" labelB="Rural"
              colorA="#1d4ed8" colorB="#059669"
              sufijo="%" domainMax={100}
              nota={VARIABLES_METADATA.alcantarillado_urbano.nota_tooltip}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 2. CALIDAD DEL AGUA (IRCA)                                */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section>
        <SeccionHeader
          titulo="2. Calidad del Agua — IRCA"
          descripcion="Índice de Riesgo de la Calidad del Agua (0 = sin riesgo · 100 = inviable)"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GraficaLinea
            datos={datosFiltrados}
            municipios={municipiosMostrar}
            variable="irca_municipal"
            titulo="IRCA Municipal — evolución temporal"
            nota={VARIABLES_METADATA.irca_municipal.nota_tooltip}
          />
          <div>
            <SelectorAnio label="Año" valor={anioComparacion3} onChange={setAnioComparacion3} />
            <GraficaBarras
              datos={filtradosPorMunicipio(datosComp3)}
              titulo={`IRCA urbano vs rural — ${anioComparacion3}`}
              varA="irca_urbano"
              varB="irca_rural"
              labelA="Urbano" labelB="Rural"
              colorA="#0891b2" colorB="#7c3aed"
              sufijo=""
              nota="Fuente: INS-SIVICAP. Baja cobertura para IRCA rural."
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 3. INVERSIÓN EN AGUA POTABLE                              */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section>
        <SeccionHeader
          titulo="3. Inversión en Agua Potable y Saneamiento"
          descripcion="Gasto municipal reportado al FUT (COP corrientes)"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GraficaLinea
            datos={datosFiltrados}
            municipios={municipiosMostrar}
            variable="agua_potable"
            titulo="Inversión en agua potable (COP)"
            nota={VARIABLES_METADATA.agua_potable.nota_tooltip}
          />
          <GraficaLinea
            datos={datosFiltrados}
            municipios={municipiosMostrar}
            variable="ingresos_tributarios_pc"
            titulo="Ingresos tributarios per cápita (COP)"
            nota={VARIABLES_METADATA.ingresos_tributarios_pc.nota_tooltip}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 4. USUARIOS DE SERVICIOS PÚBLICOS                         */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section>
        <SeccionHeader
          titulo="4. Usuarios de Servicios Públicos"
          descripcion="Datos disponibles para algunos municipios a partir de 2018"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <SelectorAnio label="Año" valor={anioComparacion4} onChange={setAnioComparacion4} />
            <GraficaUsuariosServicios
              datos={filtradosPorMunicipio(datosComp4)}
              titulo={`% Usuarios activos por servicio — ${anioComparacion4}`}
              subtitulo="Acueducto, Alcantarillado y Energía"
              nota="Fuente: SSPD-SUI. Solo municipios con datos reportados."
            />
          </div>
          <div className="space-y-4">
            <GraficaLinea
              datos={datosFiltrados}
              municipios={municipiosMostrar}
              variable="usuarios_activos_pct"
              titulo="% Usuarios activos acueducto"
              sufijo="%"
              nota={VARIABLES_METADATA.usuarios_activos_pct.nota_tooltip}
            />
            <GraficaLinea
              datos={datosFiltrados}
              municipios={municipiosMostrar}
              variable="en_usuarios_activos_pct"
              titulo="% Usuarios activos energía"
              sufijo="%"
              nota={VARIABLES_METADATA.en_usuarios_activos_pct.nota_tooltip}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <GraficaLinea
            datos={datosFiltrados}
            municipios={municipiosMostrar}
            variable="en_usuarios_activos_pct_urb"
            titulo="% Usuarios activos energía — zona urbana"
            sufijo="%"
            nota={VARIABLES_METADATA.en_usuarios_activos_pct_urb.nota_tooltip}
          />
          <GraficaLinea
            datos={datosFiltrados}
            municipios={municipiosMostrar}
            variable="en_usuarios_activos_pct_rur"
            titulo="% Usuarios activos energía — zona rural"
            sufijo="%"
            nota={VARIABLES_METADATA.en_usuarios_activos_pct_rur.nota_tooltip}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 5. SALUD                                                  */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section>
        <SeccionHeader titulo="5. Indicadores de Salud" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GraficaSalud
            datos={datosFiltrados}
            municipios={municipiosMostrar.slice(0, 5)}
            titulo="Mortalidad <5 años y dengue"
            nota={`${VARIABLES_METADATA.tasa_mortalidad_infantil_menores5.nota_tooltip} | ${VARIABLES_METADATA.incidencia_dengue.nota_tooltip}`}
          />
          <div className="space-y-4">
            <GraficaLinea
              datos={datosFiltrados}
              municipios={municipiosMostrar}
              variable="mortalidad_eda_menores5"
              titulo="Mortalidad por EDA en <5 años (por 100.000)"
              nota={VARIABLES_METADATA.mortalidad_eda_menores5.nota_tooltip}
            />
            <GraficaLinea
              datos={datosFiltrados}
              municipios={municipiosMostrar}
              variable="mortalidad_desnutricion_menores5"
              titulo="Mortalidad por desnutrición en <5 años"
              nota={VARIABLES_METADATA.mortalidad_desnutricion_menores5.nota_tooltip}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 6. ECONOMÍA Y FINANZAS MUNICIPALES                        */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section>
        <SeccionHeader titulo="6. Economía y Finanzas Municipales" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GraficaLinea
            datos={datosFiltrados}
            municipios={municipiosMostrar}
            variable="pib_pc*millon"
            titulo="PIB per cápita (millones COP)"
            nota={VARIABLES_METADATA['pib_pc*millon'].nota_tooltip}
          />
          <GraficaLinea
            datos={datosFiltrados}
            municipios={municipiosMostrar}
            variable="pib"
            titulo="PIB total municipal (miles de millones COP)"
            nota={VARIABLES_METADATA.pib.nota_tooltip}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <GraficaLineaDoble
            datos={datosFiltrados}
            municipios={municipiosMostrar.slice(0, 3)}
            varA="ingresos_tributarios_pc"
            varB="ingresos_ind_com_pc"
            labelA="Trib. PC"
            labelB="ICA PC"
            titulo="Ingresos tributarios e ICA per cápita (COP)"
            subtitulo="Línea sólida = tributarios · Línea punteada = industria y comercio"
            nota="Fuente: DNP-FUT. Máximo 3 municipios para legibilidad."
          />
          <GraficaDispersion
            datos={filtradosPorMunicipio(datosMasFrecientes)}
            titulo="PIB per cápita vs Desempeño Fiscal (año más reciente)"
            nota={`${VARIABLES_METADATA['pib_pc*millon'].nota_tooltip} | ${VARIABLES_METADATA.idf.nota_tooltip}`}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <GraficaLinea
            datos={datosFiltrados}
            municipios={municipiosMostrar}
            variable="avaluo_catastral_total"
            titulo="Avalúo catastral total (millones COP)"
            nota={VARIABLES_METADATA.avaluo_catastral_total.nota_tooltip}
          />
          <GraficaBarras
            datos={filtradosPorMunicipio(datosMasFrecientes)}
            titulo={`Avalúo catastral urbano vs rural — ${anioMaxReal}`}
            varA="avaluo_catastral_urbano"
            varB="avaluo_catastral_rural"
            labelA="Urbano" labelB="Rural"
            colorA="#7c3aed" colorB="#ca8a04"
            sufijo=""
            nota={VARIABLES_METADATA.avaluo_catastral_urbano.nota_tooltip}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <GraficaLinea
            datos={datosFiltrados}
            municipios={municipiosMostrar}
            variable="idf"
            titulo="Índice de Desempeño Fiscal (IDF)"
            nota={VARIABLES_METADATA.idf.nota_tooltip}
          />
          <GraficaLinea
            datos={datosFiltrados}
            municipios={municipiosMostrar}
            variable="ingresos_ind_com_pc"
            titulo="Impuesto ICA per cápita (COP)"
            nota={VARIABLES_METADATA.ingresos_ind_com_pc.nota_tooltip}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 7. TABLA RESUMEN COMPLETA                                  */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section>
        <SeccionHeader
          titulo="7. Tabla resumen — todos los indicadores"
          descripcion={`Año ${anioMaxReal} · Clic en encabezado para ordenar · Desplaza horizontalmente para ver todas las columnas`}
        />
        <Tabla datos={filtradosPorMunicipio(datosMasFrecientes)} />
      </section>

    </div>
  );
}
