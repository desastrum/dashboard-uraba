# Dashboard Urabá

Panel interactivo de indicadores municipales para la subregión de Urabá, Antioquia (Colombia), período 2014–2024.

## Stack

- **React 18** + **Vite**
- **Recharts** — visualizaciones interactivas
- **TailwindCSS v4** — estilos
- **xlsx** — lectura del archivo Excel desde `public/data/`

## Estructura del proyecto

```
dashboard-uraba/
├── public/data/           # Archivo Excel de datos
├── src/
│   ├── components/        # KPICard, Filtros, Tabla, gráficas
│   ├── pages/             # Dashboard, Metodologia
│   ├── hooks/             # useData, useFiltros
│   ├── utils/             # Formateo de números y colores
│   └── data/              # Metadatos y constantes de variables
└── docs/                  # PDFs metodológicos (se agregan después)
```

## Instalación y uso local

```bash
npm install
npm run dev
```

Abrir en el navegador: `http://localhost:5173`

## Despliegue en Vercel

1. Subir el repositorio a GitHub.
2. En vercel.com, importar el repositorio.
3. Framework preset: **Vite**.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

## Datos

El archivo `public/data/uraba_datos_junio1.xlsx` contiene el panel de indicadores municipales.
Las columnas clave están documentadas en `src/data/variables.js` y en `docs/`.

## Variables incluidas

| Variable | Descripción |
|---|---|
| cobertura_acueducto | Cobertura total acueducto (%) |
| cobertura_acueducto_urbano | Cobertura urbana acueducto (%) |
| cobertura_acueducto_rural | Cobertura rural acueducto (%) |
| alcantarillado_municipal | Cobertura alcantarillado (%) |
| irca_municipal | Índice de riesgo calidad del agua |
| tasa_mortalidad_infantil_menores5 | Mortalidad infantil <5 años (x1000 NV) |
| incidencia_dengue | Incidencia dengue (x100.000 hab.) |
| mortalidad_desnutricion_menores5 | Mortalidad desnutrición <5 años |
| idf | Índice desempeño fiscal |
| ingresos_tributarios_pc | Ingresos tributarios per cápita (COP) |
| pib_pc*millon | PIB per cápita (millones COP) |
| pob_total | Población total |
