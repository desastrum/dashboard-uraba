import { useState } from 'react';
import Dashboard   from './pages/Dashboard';
import Metodologia from './pages/Metodologia';

const TABS = [
  { id: 'dashboard',   label: 'Dashboard' },
  { id: 'metodologia', label: 'Metodología' },
];

export default function App() {
  const [tab, setTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">U</span>
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-800 leading-tight">
                  Dashboard Urabá
                </h1>
                <p className="text-xs text-slate-400 leading-tight">
                  Indicadores municipales · Antioquia, Colombia · 2014–2024
                </p>
              </div>
            </div>

            <nav className="flex gap-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tab === t.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {tab === 'dashboard'   && <Dashboard />}
        {tab === 'metodologia' && <Metodologia />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-xs text-slate-400">
            Datos: DANE · DNP · INS · SSPD &nbsp;|&nbsp; Panel de indicadores municipales — Urabá, Antioquia
          </p>
        </div>
      </footer>
    </div>
  );
}
