export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Devuelve la fecha en formato 'YYYY-MM-DD'
}
