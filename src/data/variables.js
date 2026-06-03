export const MUNICIPIOS_URABA = [
  'Apartadó',
  'Arboletes',
  'Carepa',
  'Chigorodó',
  'Murindó',
  'Mutatá',
  'Necoclí',
  'San Juan de Urabá',
  'San Pedro de Urabá',
  'Turbo',
  'Vigía del Fuerte',
];

export const ANIO_MIN = 2014;
export const ANIO_MAX = 2024;

export const COLORES_MUNICIPIOS = [
  '#1d4ed8', '#0891b2', '#059669', '#7c3aed', '#db2777',
  '#ea580c', '#ca8a04', '#16a34a', '#0284c7', '#9333ea', '#be123c',
];

export const VARIABLES_METADATA = {
  cobertura_acueducto: {
    label: 'Cobertura Acueducto',
    descripcion: 'Porcentaje de hogares con acceso al servicio de acueducto (urbano + rural combinado) a nivel municipal.',
    fuente: 'Superintendencia de Servicios Públicos Domiciliarios (SSPD) — Sistema Único de Información (SUI)',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI. Dato construido como promedio ponderado urbano/rural.',
  },
  cobertura_acueducto_rural: {
    label: 'Cobertura Acueducto Rural',
    descripcion: 'Porcentaje de hogares rurales con acceso al servicio de acueducto.',
    fuente: 'SSPD-SUI / DANE - Encuesta Nacional de Calidad de Vida (ECV)',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI / DANE-ECV. Puede contener valores interpolados para años sin reporte.',
  },
  cobertura_acueducto_urbano: {
    label: 'Cobertura Acueducto Urbano',
    descripcion: 'Porcentaje de hogares urbanos con acceso al servicio de acueducto.',
    fuente: 'SSPD-SUI / DANE - Encuesta Nacional de Calidad de Vida (ECV)',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI / DANE-ECV.',
  },
  alcantarillado_municipal: {
    label: 'Cobertura Alcantarillado',
    descripcion: 'Porcentaje de hogares con acceso al servicio de alcantarillado a nivel municipal.',
    fuente: 'SSPD-SUI / DANE-ECV',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI. Incluye redes de alcantarillado convencional.',
  },
  irca_municipal: {
    label: 'IRCA Municipal',
    descripcion: 'Índice de Riesgo de la Calidad del Agua para consumo humano. Escala 0–100; menor valor indica mejor calidad.',
    fuente: 'Instituto Nacional de Salud (INS) — Sistema de Vigilancia de la Calidad del Agua (SIVICAP)',
    unidad: 'índice (0–100)',
    nota_tooltip: 'Fuente: INS-SIVICAP. 0 = sin riesgo, 100 = inviable sanitariamente.',
  },
  tasa_mortalidad_infantil_menores5: {
    label: 'Mortalidad <5 años',
    descripcion: 'Tasa de mortalidad infantil en menores de 5 años por 1.000 nacidos vivos.',
    fuente: 'DANE — Estadísticas Vitales / SISPRO',
    unidad: 'por 1.000 NV',
    nota_tooltip: 'Fuente: DANE-SISPRO. Tasa por 1.000 nacidos vivos.',
  },
  incidencia_dengue: {
    label: 'Incidencia Dengue',
    descripcion: 'Tasa de incidencia de dengue por 100.000 habitantes.',
    fuente: 'Instituto Nacional de Salud (INS) — SIVIGILA',
    unidad: 'por 100.000 hab.',
    nota_tooltip: 'Fuente: INS-SIVIGILA. Incluye dengue y dengue grave.',
  },
  mortalidad_desnutricion_menores5: {
    label: 'Mortalidad Desnutrición <5',
    descripcion: 'Tasa de mortalidad por desnutrición en menores de 5 años por 100.000 menores.',
    fuente: 'DANE — Estadísticas Vitales / SISPRO',
    unidad: 'por 100.000 menores',
    nota_tooltip: 'Fuente: DANE. Puede presentar ceros cuando no se reportaron casos.',
  },
  idf: {
    label: 'IDF',
    descripcion: 'Índice de Desempeño Fiscal. Escala 0–100; mayor valor indica mejor gestión fiscal.',
    fuente: 'Departamento Nacional de Planeación (DNP) — Evaluación del Desempeño Integral Municipal',
    unidad: 'índice (0–100)',
    nota_tooltip: 'Fuente: DNP. Mayor puntaje = mejor desempeño fiscal municipal.',
  },
  ingresos_tributarios_pc: {
    label: 'Ingresos Tributarios PC',
    descripcion: 'Ingresos tributarios per cápita del municipio (COP corrientes).',
    fuente: 'DNP — Formulario Único Territorial (FUT) / Ministerio de Hacienda',
    unidad: 'COP',
    nota_tooltip: 'Fuente: DNP-FUT. Valores en pesos corrientes del año.',
  },
  'pib_pc*millon': {
    label: 'PIB per cápita',
    descripcion: 'Producto Interno Bruto per cápita municipal en millones de pesos corrientes.',
    fuente: 'DANE — Cuentas Nacionales Departamentales / estimaciones municipales',
    unidad: 'millones COP',
    nota_tooltip: 'Fuente: DANE. Estimación a nivel municipal con base en cuentas departamentales.',
  },
  pob_total: {
    label: 'Población Total',
    descripcion: 'Población total municipal según proyecciones del DANE.',
    fuente: 'DANE — Proyecciones de Población',
    unidad: 'habitantes',
    nota_tooltip: 'Fuente: DANE. Proyecciones postcenso 2018.',
  },
};

export const KPI_CONFIG = [
  { key: 'cobertura_acueducto', label: 'Cobertura Acueducto', sufijo: '%', color: 'blue', icono: '💧' },
  { key: 'irca_municipal', label: 'IRCA Municipal', sufijo: '', color: 'teal', icono: '🔬', invert: true },
  { key: 'idf', label: 'Desempeño Fiscal', sufijo: '', color: 'green', icono: '📊' },
  { key: 'pib_pc*millon', label: 'PIB per cápita', sufijo: 'M', color: 'indigo', icono: '💰' },
];
