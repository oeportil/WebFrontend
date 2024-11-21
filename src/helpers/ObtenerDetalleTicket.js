export const obtenerDetalle = async ({ idTicket, tipo }) => {
  let url = "";
  if (tipo === 1) {
    url = `${
      import.meta.env.VITE_API_URL
    }/tickets/ObtenerDetalleCliente/${idTicket}`;
  } else {
    url = `${import.meta.env.VITE_API_URL}/tickets/ObtenerDetalle/${idTicket}`;
  }

  if (idTicket) {
    const LlamadoDetalle = await fetch(url);
    if (LlamadoDetalle.status !== 404) {
      const detalle = await LlamadoDetalle.json();
      return detalle;
    } else {
      console.warn("Esperando Elección de ticket");
    }
  }
  return;
};
