export const formatearDinero = dinero => {
  return dinero.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0})
}