import { useState, useMemo } from 'react';
import { ANIO_MIN, ANIO_MAX } from '../data/variables';

export function useFiltros(datos) {
  const [municipiosSeleccionados, setMunicipiosSeleccionados] = useState([]);
  const [anioMin, setAnioMin] = useState(ANIO_MIN);
  const [anioMax, setAnioMax] = useState(ANIO_MAX);
  const [anioComparacion, setAnioComparacion] = useState(ANIO_MAX);

  const municipiosDisponibles = useMemo(() => {
    const set = new Set(datos.map((d) => d.municipio).filter(Boolean));
    return Array.from(set).sort();
  }, [datos]);

  const datosFiltrados = useMemo(() => {
    return datos.filter((d) => {
      const anio = Number(d.anio);
      const enRango = anio >= anioMin && anio <= anioMax;
      const enMunicipio =
        municipiosSeleccionados.length === 0 ||
        municipiosSeleccionados.includes(d.municipio);
      return enRango && enMunicipio;
    });
  }, [datos, municipiosSeleccionados, anioMin, anioMax]);

  const datosMasFrecientes = useMemo(() => {
    const anioMaxReal = Math.max(...datos.map((d) => Number(d.anio)).filter(Boolean));
    return datos.filter((d) => Number(d.anio) === anioMaxReal);
  }, [datos]);

  const datosAnioComparacion = useMemo(() => {
    return datos.filter((d) => Number(d.anio) === anioComparacion);
  }, [datos, anioComparacion]);

  return {
    municipiosSeleccionados,
    setMunicipiosSeleccionados,
    anioMin,
    setAnioMin,
    anioMax,
    setAnioMax,
    anioComparacion,
    setAnioComparacion,
    municipiosDisponibles,
    datosFiltrados,
    datosMasFrecientes,
    datosAnioComparacion,
  };
}
