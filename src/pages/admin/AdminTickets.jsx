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
  const { id_usuario, tipo } = JSON.parse(localStorage.getItem("userData"));
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
      const tick = await getTicketsComoSoporte(id_usuario, 1);
      setTickets(tick);
    };
    datatick();
    const datatar = async () => {
      const tar = await getTareasComoSoporte(id_usuario, 1);
      setTareas(tar);
    };
    datatar();
  }, []);
  useEffect(() => {
    const datatick = async () => {
      const tick = await getTicketsComoSoporte(id_usuario, tipoTicket);
      setTickets(tick);
    };
    datatick();
  }, [tipoTicket]);
  useEffect(() => {
    const datatar = async () => {
      const tar = await getTareasComoSoporte(
        id_usuario,
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
  console.log(detalleTicket);

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
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.servicio}</td>
                <td>{ticket.cliente}</td>
                <td>{ticket.correo}</td>
                <td>
                  <Link
                    className="txt_azul"
                    to={`/dashboard/admin/tickets/${ticket.id}`}
                  >
                    Editar Ticket
                  </Link>
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

      <h4 className="text-center text-uppercase txt_azul fw-normal">
        Tareas Asignadas
      </h4>
      <div className="d-md-flex gap-2">
        <Form.Control
          type="number"
          id="idtickettarea"
          aria-describedby="buscarIDHelpBlock"
          onChange={(e) => cambiarIdTickTarea(e.target.value)}
          placeholder="Buscar por Id"
          className="buscar mt-2"
        />
        <Form.Control
          type="text"
          id="nombreTarea"
          aria-describedby="buscarIDHelpBlock"
          onChange={(e) => setNombreTarea(e.target.value)}
          value={nombreTarea}
          placeholder="Buscar por Nombre"
          className="buscar mt-2"
        />
        <Form.Select
          className="select mt-2"
          aria-label="Default select example"
          onChange={(e) => setTipoTarea(e.target.value)}
          value={tipoTarea}
          defaultValue={1}
        >
          <option value="1">Sin Resolver</option>
          <option value="2">Resueltos</option>
          <option value="3">Todos</option>
        </Form.Select>
      </div>
      {tareas.length != 0 ? (
        <>
          <Table responsive="md" className="my-3">
            <thead>
              <tr>
                <th className="bg-azulMedio text-white">ID de Ticket</th>
                <th className="bg-azulMedio text-white">Servicio</th>
                <th className="bg-azulMedio text-white">Cliente</th>
                <th className="bg-azulMedio text-white">Nombre Tarea</th>
                <th className="bg-azulMedio"></th>
              </tr>
            </thead>
            <tbody>
              {tareas.map((tarea, i) => (
                <tr key={i}>
                  <td>{tarea.id_ticket}</td>
                  <td>{tarea.servicio}</td>
                  <td>{tarea.cliente}</td>
                  <td>{tarea.nombre}</td>
                  <td>
                    <button
                      className="border-0 bg-none txt_azul"
                      onClick={() => {
                        setModalDetalle(true);
                        setTicketID(tarea.id_ticket);
                      }}
                    >
                      Ver Ticket
                    </button>
                    {!tarea.completada ? (
                      <button
                        className="border-0 bg-none txt_azul"
                        onClick={() => EditarTarea(tarea)}
                      >
                        Editar Tarea
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ModalDetalleTicket
            show={modalDetalle}
            idTicket={ticketID}
            tipo={tipo}
            onHide={() => setModalDetalle(false)}
          />
        </>
      ) : (
        <div>
          <h5 className="text-center txt_azul fw-normal">
            No Hay Tareas Asignadas
          </h5>
        </div>
      )}
      <ModalEditarTarea
        show={modalShow}
        onHide={() => setModalShow(false)}
        tarea={idTarea}
      />
    </main>
  );
  function EditarTarea(tarea) {
    setModalShow(true);
    setIdTarea(tarea);
  }
};

export default AdminTickets;
