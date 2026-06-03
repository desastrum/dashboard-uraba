export function fmtNum(valor, decimales = 1) {
  if (valor == null || isNaN(valor)) return '—';
  return Number(valor).toLocaleString('es-CO', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}

export function fmtPct(valor) {
  if (valor == null || isNaN(valor)) return '—';
  return `${fmtNum(valor, 1)}%`;
}

export function fmtMillon(valor) {
  if (valor == null || isNaN(valor)) return '—';
  return `$${fmtNum(valor, 2)} M`;
}

export function fmtPob(valor) {
  if (valor == null || isNaN(valor)) return '—';
  return Number(valor).toLocaleString('es-CO', { maximumFractionDigits: 0 });
}

export function colorPorIndice(idx) {
  const colores = [
    '#1d4ed8', '#0891b2', '#059669', '#7c3aed', '#db2777',
    '#ea580c', '#ca8a04', '#16a34a', '#0284c7', '#9333ea', '#be123c',
  ];
  return colores[idx % colores.length];
}

export function getColorIRCA(irca) {
  if (irca == null || isNaN(irca)) return '#94a3b8';
  if (irca <= 5) return '#16a34a';
  if (irca <= 14) return '#ca8a04';
  if (irca <= 35) return '#ea580c';
  if (irca <= 80) return '#dc2626';
  return '#7f1d1d';
}

export function tendencia(valores) {
  if (!valores || valores.length < 2) return 'neutral';
  const ultimo = valores[valores.length - 1];
  const penultimo = valores[valores.length - 2];
  if (ultimo > penultimo) return 'up';
  if (ultimo < penultimo) return 'down';
  return 'neutral';
}
