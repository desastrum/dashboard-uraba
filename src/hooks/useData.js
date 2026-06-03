import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function normalizarColumna(nombre) {
  return nombre
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

export function useData() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        const respuesta = await fetch('/data/uraba_datos_junio1.xlsx');
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const buffer = await respuesta.arrayBuffer();
        const libro = XLSX.read(buffer, { type: 'array' });
        const hoja = libro.Sheets[libro.SheetNames[0]];
        const filas = XLSX.utils.sheet_to_json(hoja, { defval: null });

        const normalizadas = filas.map((fila) => {
          const obj = {};
          for (const [k, v] of Object.entries(fila)) {
            const clave = normalizarColumna(k);
            obj[clave] =
              typeof v === 'string' && v.trim() === '' ? null : v;
          }
          return obj;
        });

        setDatos(normalizadas);
      } catch (e) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  return { datos, cargando, error };
}
