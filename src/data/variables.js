export const MUNICIPIOS_URABA = [
  'Apartadó', 'Arboletes', 'Carepa', 'Chigorodó', 'Murindó', 'Mutatá',
  'Necoclí', 'San Juan de Urabá', 'San Pedro de Urabá', 'Turbo', 'Vigía del Fuerte',
];

export const ANIO_MIN = 2014;
export const ANIO_MAX = 2024;

export const COLORES_MUNICIPIOS = [
  '#1d4ed8', '#0891b2', '#059669', '#7c3aed', '#db2777',
  '#ea580c', '#ca8a04', '#16a34a', '#0284c7', '#9333ea', '#be123c',
];

export const VARIABLES_METADATA = {
  // ── Cobertura acueducto ─────────────────────────────────────────
  cobertura_acueducto: {
    label: 'Cobertura Acueducto',
    descripcion: 'Porcentaje de hogares con acceso al servicio de acueducto (urbano + rural) a nivel municipal.',
    fuente: 'SSPD — SUI',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI. Promedio ponderado urbano/rural.',
  },
  cobertura_acueducto_rural: {
    label: 'Cobertura Acueducto Rural',
    descripcion: 'Porcentaje de hogares rurales con acceso al servicio de acueducto.',
    fuente: 'SSPD-SUI / DANE-ECV',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI / DANE-ECV. Puede contener valores interpolados.',
  },
  cobertura_acueducto_urbano: {
    label: 'Cobertura Acueducto Urbano',
    descripcion: 'Porcentaje de hogares urbanos con acceso al servicio de acueducto.',
    fuente: 'SSPD-SUI / DANE-ECV',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI / DANE-ECV.',
  },
  // ── Cobertura alcantarillado ────────────────────────────────────
  alcantarillado_municipal: {
    label: 'Cobertura Alcantarillado',
    descripcion: 'Porcentaje de hogares con acceso al servicio de alcantarillado a nivel municipal.',
    fuente: 'SSPD-SUI / DANE-ECV',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI. Incluye redes de alcantarillado convencional.',
  },
  alcantarillado_urbano: {
    label: 'Alcantarillado Urbano',
    descripcion: 'Porcentaje de hogares urbanos con acceso al servicio de alcantarillado.',
    fuente: 'SSPD-SUI / DANE-ECV',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI.',
  },
  alcantarillado_rural: {
    label: 'Alcantarillado Rural',
    descripcion: 'Porcentaje de hogares rurales con acceso al servicio de alcantarillado.',
    fuente: 'SSPD-SUI / DANE-ECV',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI.',
  },
  // ── IRCA ────────────────────────────────────────────────────────
  irca_municipal: {
    label: 'IRCA Municipal',
    descripcion: 'Índice de Riesgo de la Calidad del Agua para consumo humano. Escala 0–100; menor valor indica mejor calidad.',
    fuente: 'INS — SIVICAP',
    unidad: 'índice (0–100)',
    nota_tooltip: 'Fuente: INS-SIVICAP. 0 = sin riesgo, 100 = inviable sanitariamente.',
  },
  irca_urbano: {
    label: 'IRCA Urbano',
    descripcion: 'IRCA para la zona urbana del municipio.',
    fuente: 'INS — SIVICAP',
    unidad: 'índice (0–100)',
    nota_tooltip: 'Fuente: INS-SIVICAP. Cobertura parcial; no todos los municipios reportan anualmente.',
  },
  irca_rural: {
    label: 'IRCA Rural',
    descripcion: 'IRCA para la zona rural del municipio. Cobertura de datos limitada.',
    fuente: 'INS — SIVICAP',
    unidad: 'índice (0–100)',
    nota_tooltip: 'Fuente: INS-SIVICAP. Datos disponibles en ~32 observaciones; baja cobertura.',
  },
  // ── Inversión agua ──────────────────────────────────────────────
  agua_potable: {
    label: 'Inversión Agua Potable',
    descripcion: 'Inversión municipal en agua potable y saneamiento básico (pesos corrientes).',
    fuente: 'DNP — FUT / SICEP',
    unidad: 'COP (corrientes)',
    nota_tooltip: 'Fuente: DNP-FUT. Gasto reportado al Formulario Único Territorial.',
  },
  // ── Usuarios acueducto ──────────────────────────────────────────
  usuarios_total: {
    label: 'Usuarios Acueducto Total',
    descripcion: 'Número total de suscriptores al servicio de acueducto en el municipio.',
    fuente: 'SSPD — SUI',
    unidad: 'usuarios',
    nota_tooltip: 'Fuente: SSPD-SUI. Solo municipios con datos reportados (~25 observaciones).',
  },
  usuarios_activos: {
    label: 'Usuarios Acueducto Activos',
    descripcion: 'Número de suscriptores activos (con consumo registrado) al servicio de acueducto.',
    fuente: 'SSPD — SUI',
    unidad: 'usuarios',
    nota_tooltip: 'Fuente: SSPD-SUI.',
  },
  usuarios_activos_pct: {
    label: 'Usuarios Activos Acueducto (%)',
    descripcion: 'Porcentaje de suscriptores activos sobre el total de suscriptores de acueducto.',
    fuente: 'SSPD — SUI',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI. Calculado como activos/total × 100.',
  },
  // ── Usuarios alcantarillado ─────────────────────────────────────
  alc_usuarios_total: {
    label: 'Usuarios Alcantarillado Total',
    descripcion: 'Número total de suscriptores al servicio de alcantarillado.',
    fuente: 'SSPD — SUI',
    unidad: 'usuarios',
    nota_tooltip: 'Fuente: SSPD-SUI.',
  },
  alc_usuarios_activos: {
    label: 'Usuarios Alcantarillado Activos',
    descripcion: 'Número de suscriptores activos al servicio de alcantarillado.',
    fuente: 'SSPD — SUI',
    unidad: 'usuarios',
    nota_tooltip: 'Fuente: SSPD-SUI.',
  },
  alc_usuarios_activos_pct: {
    label: 'Usuarios Activos Alcantarillado (%)',
    descripcion: 'Porcentaje de suscriptores activos sobre el total de suscriptores de alcantarillado.',
    fuente: 'SSPD — SUI',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI.',
  },
  // ── Usuarios energía ────────────────────────────────────────────
  en_usuarios_total: {
    label: 'Usuarios Energía Total',
    descripcion: 'Número total de suscriptores al servicio de energía eléctrica.',
    fuente: 'SSPD — SUI',
    unidad: 'usuarios',
    nota_tooltip: 'Fuente: SSPD-SUI.',
  },
  en_usuarios_activos_pct: {
    label: 'Usuarios Activos Energía (%)',
    descripcion: 'Porcentaje de suscriptores activos sobre el total de suscriptores de energía.',
    fuente: 'SSPD — SUI',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI.',
  },
  en_usuarios_urbano: {
    label: 'Usuarios Energía Urbano',
    descripcion: 'Número de suscriptores urbanos al servicio de energía eléctrica.',
    fuente: 'SSPD — SUI',
    unidad: 'usuarios',
    nota_tooltip: 'Fuente: SSPD-SUI.',
  },
  en_usuarios_activos_pct_urb: {
    label: 'Usuarios Activos Energía Urbano (%)',
    descripcion: 'Porcentaje de suscriptores activos urbanos de energía.',
    fuente: 'SSPD — SUI',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI.',
  },
  en_usuarios_rural: {
    label: 'Usuarios Energía Rural',
    descripcion: 'Número de suscriptores rurales al servicio de energía eléctrica.',
    fuente: 'SSPD — SUI',
    unidad: 'usuarios',
    nota_tooltip: 'Fuente: SSPD-SUI.',
  },
  en_usuarios_activos_pct_rur: {
    label: 'Usuarios Activos Energía Rural (%)',
    descripcion: 'Porcentaje de suscriptores activos rurales de energía.',
    fuente: 'SSPD — SUI',
    unidad: '%',
    nota_tooltip: 'Fuente: SSPD-SUI.',
  },
  // ── Avalúo catastral ────────────────────────────────────────────
  avaluo_catastral_total: {
    label: 'Avalúo Catastral Total',
    descripcion: 'Valor total del avalúo catastral del municipio (millones de pesos).',
    fuente: 'IGAC — Catastro Municipal',
    unidad: 'millones COP',
    nota_tooltip: 'Fuente: IGAC. Valor total de predios registrados en el catastro municipal.',
  },
  avaluo_catastral_urbano: {
    label: 'Avalúo Catastral Urbano',
    descripcion: 'Valor del avalúo catastral de predios en zona urbana (millones de pesos).',
    fuente: 'IGAC — Catastro Municipal',
    unidad: 'millones COP',
    nota_tooltip: 'Fuente: IGAC.',
  },
  avaluo_catastral_rural: {
    label: 'Avalúo Catastral Rural',
    descripcion: 'Valor del avalúo catastral de predios en zona rural (millones de pesos).',
    fuente: 'IGAC — Catastro Municipal',
    unidad: 'millones COP',
    nota_tooltip: 'Fuente: IGAC.',
  },
  // ── Salud ────────────────────────────────────────────────────────
  tasa_mortalidad_infantil_menores5: {
    label: 'Mortalidad <5 años',
    descripcion: 'Tasa de mortalidad infantil en menores de 5 años por 1.000 nacidos vivos.',
    fuente: 'DANE — Estadísticas Vitales / SISPRO',
    unidad: 'por 1.000 NV',
    nota_tooltip: 'Fuente: DANE-SISPRO.',
  },
  mortalidad_eda_menores5: {
    label: 'Mortalidad EDA <5 años',
    descripcion: 'Tasa de mortalidad por Enfermedad Diarreica Aguda (EDA) en menores de 5 años por 100.000 menores.',
    fuente: 'DANE — Estadísticas Vitales / INS-SIVIGILA',
    unidad: 'por 100.000 menores',
    nota_tooltip: 'Fuente: DANE / INS-SIVIGILA. Datos disponibles en ~35 observaciones.',
  },
  incidencia_dengue: {
    label: 'Incidencia Dengue',
    descripcion: 'Tasa de incidencia de dengue por 100.000 habitantes.',
    fuente: 'INS — SIVIGILA',
    unidad: 'por 100.000 hab.',
    nota_tooltip: 'Fuente: INS-SIVIGILA. Incluye dengue y dengue grave.',
  },
  mortalidad_desnutricion_menores5: {
    label: 'Mortalidad Desnutrición <5',
    descripcion: 'Tasa de mortalidad por desnutrición en menores de 5 años por 100.000 menores.',
    fuente: 'DANE — Estadísticas Vitales',
    unidad: 'por 100.000 menores',
    nota_tooltip: 'Fuente: DANE.',
  },
  // ── Fiscal ──────────────────────────────────────────────────────
  idf: {
    label: 'IDF',
    descripcion: 'Índice de Desempeño Fiscal. Escala 0–100; mayor valor indica mejor gestión fiscal.',
    fuente: 'DNP — Evaluación del Desempeño Integral Municipal',
    unidad: 'índice (0–100)',
    nota_tooltip: 'Fuente: DNP. Mayor puntaje = mejor desempeño fiscal.',
  },
  ingresos_tributarios_pc: {
    label: 'Ingresos Tributarios PC',
    descripcion: 'Ingresos tributarios per cápita del municipio (COP corrientes).',
    fuente: 'DNP — FUT / Ministerio de Hacienda',
    unidad: 'COP',
    nota_tooltip: 'Fuente: DNP-FUT.',
  },
  ingresos_ind_com_pc: {
    label: 'Ingresos Ind. y Com. PC',
    descripcion: 'Recaudo de impuesto de industria y comercio per cápita (COP corrientes).',
    fuente: 'DNP — FUT / Ministerio de Hacienda',
    unidad: 'COP',
    nota_tooltip: 'Fuente: DNP-FUT. Impuesto ICA per cápita.',
  },
  // ── Economía ────────────────────────────────────────────────────
  pib: {
    label: 'PIB Municipal',
    descripcion: 'Producto Interno Bruto municipal total en miles de millones de pesos corrientes.',
    fuente: 'DANE — Cuentas Nacionales Departamentales / estimaciones municipales',
    unidad: 'miles de millones COP',
    nota_tooltip: 'Fuente: DANE. Estimación a nivel municipal.',
  },
  'pib_pc*millon': {
    label: 'PIB per cápita',
    descripcion: 'PIB per cápita municipal en millones de pesos corrientes.',
    fuente: 'DANE — Cuentas Nacionales',
    unidad: 'millones COP',
    nota_tooltip: 'Fuente: DANE.',
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
  { key: 'cobertura_acueducto',     label: 'Cobertura Acueducto',  sufijo: '%',  color: 'blue',   icono: '💧' },
  { key: 'irca_municipal',          label: 'IRCA Municipal',        sufijo: '',   color: 'teal',   icono: '🔬', invert: true },
  { key: 'idf',                     label: 'Desempeño Fiscal',      sufijo: '',   color: 'green',  icono: '📊' },
  { key: 'pib_pc*millon',           label: 'PIB per cápita',        sufijo: 'M',  color: 'indigo', icono: '💰' },
  { key: 'alcantarillado_municipal',label: 'Cobertura Alcantarillado', sufijo: '%', color: 'blue', icono: '🚰' },
  { key: 'ingresos_tributarios_pc', label: 'Ing. Tributarios PC',   sufijo: '',   color: 'green',  icono: '🏛️' },
  { key: 'en_usuarios_activos_pct', label: 'Activos Energía',       sufijo: '%',  color: 'indigo', icono: '⚡' },
  { key: 'usuarios_activos_pct',    label: 'Activos Acueducto',     sufijo: '%',  color: 'teal',   icono: '📋' },
];

// Grupos temáticos para Metodología
export const GRUPOS_METODOLOGIA = [
  {
    titulo: 'Cobertura de Agua y Saneamiento',
    icono: '💧',
    variables: ['cobertura_acueducto', 'cobertura_acueducto_urbano', 'cobertura_acueducto_rural',
      'alcantarillado_municipal', 'alcantarillado_urbano', 'alcantarillado_rural'],
  },
  {
    titulo: 'Calidad del Agua (IRCA)',
    icono: '🔬',
    variables: ['irca_municipal', 'irca_urbano', 'irca_rural'],
  },
  {
    titulo: 'Inversión en Servicios Públicos',
    icono: '🏗️',
    variables: ['agua_potable'],
  },
  {
    titulo: 'Usuarios de Servicios Públicos',
    icono: '👥',
    variables: [
      'usuarios_total', 'usuarios_activos', 'usuarios_activos_pct',
      'alc_usuarios_total', 'alc_usuarios_activos', 'alc_usuarios_activos_pct',
      'en_usuarios_total', 'en_usuarios_activos_pct',
      'en_usuarios_urbano', 'en_usuarios_activos_pct_urb',
      'en_usuarios_rural', 'en_usuarios_activos_pct_rur',
    ],
  },
  {
    titulo: 'Indicadores de Salud',
    icono: '🏥',
    variables: ['tasa_mortalidad_infantil_menores5', 'mortalidad_eda_menores5',
      'incidencia_dengue', 'mortalidad_desnutricion_menores5'],
  },
  {
    titulo: 'Desempeño Fiscal e Ingresos',
    icono: '📊',
    variables: ['idf', 'ingresos_tributarios_pc', 'ingresos_ind_com_pc'],
  },
  {
    titulo: 'Economía, Catastro y Demografía',
    icono: '💰',
    variables: ['pib', 'pib_pc*millon', 'avaluo_catastral_total',
      'avaluo_catastral_urbano', 'avaluo_catastral_rural', 'pob_total'],
  },
];
