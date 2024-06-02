import { useState } from "react";
import Table from "react-bootstrap/Table";
import ModalDetalleTicket from "../modales/ModalDetalleTicket";

const TablaInfoTickets = ({ tickets }) => {
  const [ticketID, setTicketID] = useState("");
  const [modalDetalle, setModalDetalle] = useState(false);
  const { tipo } = JSON.parse(localStorage.getItem("userData"));
  return (
    <Table responsive="lg" className="my-3 mx-2">
      <thead>
        <tr>
          <th className="bg-celeste">ID</th>
          <th className="bg-celeste">Servicio</th>
          <th className="bg-celeste">Cliente</th>
          <th className="bg-celeste">Correo</th>
          <th className="bg-celeste">Fecha</th>
          <th className="bg-celeste"></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket, i) => (
          <tr key={i}>
            <td>{ticket.id}</td>
            <td>{ticket.servicio}</td>
            <td>{ticket.cliente}</td>
            <td>{ticket.correo}</td>
            <td>{ticket.fecha}</td>
            <td>
              <button
                className="border-0 bg-none txt_azul"
                onClick={() => {
                  setModalDetalle(true);
                  setTicketID(ticket.id);
                }}
              >
                Ver detalle
              </button>
              <ModalDetalleTicket
                show={modalDetalle}
                idTicket={ticketID}
                tipo={tipo}
                onHide={() => setModalDetalle(false)}
                num={12}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaInfoTickets;
