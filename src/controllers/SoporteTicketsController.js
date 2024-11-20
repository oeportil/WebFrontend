export async function getTicketsComoSoporte(id, tipo) {
  const tickets = await fetch(
    `${import.meta.env.VITE_API_URL}/tickets/ObtenerPorEncargado/${id}/${tipo}`
  );
  if (tickets.status !== 404) {
    return tickets.json();
  } else {
    return [];
  }
}

export async function getTareasComoSoporte(
  id,
  tipo,
  busqueda = -1,
  nombre = ""
) {
  var dato =
    busqueda == -1
      ? "" + (nombre == "" ? "" : `?nombre=${nombre}`)
      : `?idticket=${busqueda}` + (nombre == "" ? "" : `&nombre=${nombre}`);
  const tickets = await fetch(
    `${import.meta.env.VITE_API_URL}/misc/ObtenerTareas/${id}/${tipo}`
  );
  if (tickets.status !== 404) {
    return tickets.json();
  } else {
    return [];
  }
}
