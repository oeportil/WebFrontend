import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import {
  getTareasComoSoporte,
  getTicketsComoSoporte,
} from "../../controllers/SoporteTicketsController";
import ModalEditarTarea from "../../components/modales/ModalEditarTarea";
import { obtenerDetalle } from "../../helpers/ObtenerDetalleTicket";
import ModalDetalleTicket from "../../components/modales/ModalDetalleTicket";

const AdminTickets = () => {
  const [modalShow, setModalShow] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [tipoTicket, setTipoTicket] = useState(1);
  const [tipoTarea, setTipoTarea] = useState(1);
  const [idTicketTarea, setIdTicketTarea] = useState(-1);
  const [nombreTarea, setNombreTarea] = useState("");
  const { idUsuario, tipo } = JSON.parse(localStorage.getItem("userData"));
  const [idTarea, setIdTarea] = useState({});
  const [detalleTicket, setDetalleTicket] = useState([]);
  const [modalDetalle, setModalDetalle] = useState(false);
  const [ticketID, setTicketID] = useState("");

  //funciones
  const cambiarIdTickTarea = (val) => {
    if (Number.isInteger(val)) {
      if (val > 0) {
        setIdTicketTarea(val);
      }
    } else {
      let conve = parseInt(val, 10);
      if (!isNaN(conve)) {
        if (val > 0) {
          setIdTicketTarea(val);
        }
      }
    }
  };

  //useeffects
  useEffect(() => {
    const datatick = async () => {
      const tick = await getTicketsComoSoporte(idUsuario, 1);
      setTickets(tick);
    };
    datatick();
    const datatar = async () => {
      const tar = await getTareasComoSoporte(idUsuario, 1);
      setTareas(tar);
    };
    datatar();
  }, []);
  useEffect(() => {
    const datatick = async () => {
      const tick = await getTicketsComoSoporte(idUsuario, tipoTicket);
      setTickets(tick);
    };
    datatick();
  }, [tipoTicket]);
  useEffect(() => {
    const datatar = async () => {
      const tar = await getTareasComoSoporte(
        idUsuario,
        tipoTarea,
        idTicketTarea,
        nombreTarea
      );
      setTareas(tar);
    };
    datatar();
  }, [tipoTarea, nombreTarea, idTicketTarea]);

  const isFirstRender = useRef(true);
  //aca se toma el ticekt
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const fetchDetalle = async () => {
      setDetalleTicket({});
      const detalle = await obtenerDetalle({ ticketID });
      setDetalleTicket(detalle);
    };

    fetchDetalle();
  }, [ticketID]);

  return (
    <main className="container my-3">
      <h4 className="text-center text-uppercase txt_azul fw-normal">
        Tickets Asignados
      </h4>
      <div className="d-md-flex justify-content-between">
        <Form.Select
          className="select mt-2"
          aria-label="Default select example"
          name="tipo_ticket"
          onChange={(e) => setTipoTicket(e.target.value)}
          value={tipoTicket}
          defaultValue={1}
        >
          <option value="1">Sin Resolver</option>
          <option value="2">Resueltos</option>
          <option value="3">Todos</option>
        </Form.Select>
      </div>
      {tickets.length != 0 ? (
        <Table responsive="md" className="my-3">
          <thead>
            <tr>
              <th className="bg-azulMedio text-white">ID</th>
              <th className="bg-azulMedio text-white">Servicio</th>
              <th className="bg-azulMedio text-white">Cliente</th>
              <th className="bg-azulMedio text-white">Correo</th>
              <th className="bg-azulMedio"></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.Id}>
                <td>{ticket.Id}</td>
                <td>{ticket.Servicio}</td>
                <td>{ticket.Cliente}</td>
                <td>{ticket.Correo}</td>
                <td>
                  <p
                    className="txt_azul"
                    style={{cursor: "pointer"}}
                    onClick={() => {
                      setModalDetalle(true);
                      setTicketID(ticket.Id);
                    }}
                  >
                    Editar Ticket
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <h5 className="text-center txt_azul fw-normal">
            No Hay Tickets Asignados
          </h5>
        </div>
      )}
      <ModalDetalleTicket
        show={modalDetalle}
        idTicket={ticketID}
        tipoUser={tipo}
        onHide={() => setModalDetalle(false)}
      />
    </main>
  );
};

export default AdminTickets;
