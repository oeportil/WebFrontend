import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ModalAsignarTicket from "../../components/modales/ModalAsignarTicket";
import { getTicketsSinAsignar } from "../../controllers/TicketsController";

const AsignacionTickets = () => {
  const [modalShow, setModalShow] = useState(false);
  const [tsAsginar, setTsAsignar] = useState([]);
  const [asignado, setAsignado] = useState(0);

  useEffect(() => {
    const tickets = async () => {
      const tick = await getTicketsSinAsignar();
      setTsAsignar(tick);
    };
    tickets();
  }, []);
  console.log(tsAsginar);
  return (
    <main className="container my-4">
      <h4>Asignacion de Tickets</h4>
      <div className="p-2 border rounded my-2">
        {tsAsginar.length != 0 ? (
          <Table responsive="md" className="my-3 mx-2">
            <thead>
              <tr>
                <th>ID</th>
                <th>Servicio</th>
                <th>Cliente</th>
                <th>Correo</th>
                <th>Fecha de Ingreso</th>
              </tr>
            </thead>
            <tbody>
              {tsAsginar.map((ticket) => (
                <tr key={ticket.Id}>
                  <td>{ticket.Id}</td>
                  <td>{ticket.Servicio}</td>
                  <td>{ticket.Cliente}</td>
                  <td>{ticket.Correo}</td>
                  <td>{ticket.Fecha}</td>
                  <td>
                    <button
                      className="border-0 bg-none d-flex gap-2 txt_azul"
                      onClick={() => asignarTicket(ticket.Id)}
                    >
                      <p>Asignar</p> <i className="bi bi-arrow-right mt-1"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <ModalAsignarTicket
              show={modalShow}
              onHide={() => setModalShow(false)}
              id={asignado}
            />
          </Table>
        ) : (
          <div>No hay Tickets Para Asignar</div>
        )}
      </div>
    </main>
  );
  function asignarTicket(num) {
    setAsignado(num);
    setModalShow(true);
  }
};

export default AsignacionTickets;
