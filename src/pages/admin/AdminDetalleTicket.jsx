import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardsTareasTickets from "../../components/cards/CardsTareasTickets";
import CardsNotiTickets from "../../components/cards/CardsNotiTickets";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalAsignarTarea from "../../components/modales/ModalAsignarTarea";
import {
  changeEstado,
  EnviarNotificaciones,
  getDetalleTicket,
  getEstados,
} from "../../controllers/TicketsController";
import { crearTarea, getPrioridades } from "../../controllers/TareasController";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDetalleTicket = () => {
  const { id: Id } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [ticket, setTicket] = useState({});
  const [estados, setEstados] = useState([]);
  const [prioridades, setPrioridades] = useState([]);
  const [taskFormData, setTaskFormData] = useState({
    nombre: "",
    prioridad: "",
    info: "",
  });
  const [notificationFormData, setNotificationFormData] = useState({
    information: "",
    file: null,
    notifyClient: false,
  });

  useEffect(() => {
    const fetchTicketData = async () => {
      const ticketData = await getDetalleTicket(Id);
      setTicket(ticketData);
    };
    fetchTicketData();

    const fetchEstados = async () => {
      const estadosData = await getEstados();
      setEstados(estadosData);
    };
    fetchEstados();

    const fetchPrioridades = async () => {
      const prioridadesData = await getPrioridades();
      setPrioridades(prioridadesData);
    };
    fetchPrioridades();
  }, [Id]);

  const handleChangeTarea = (e) => {
    setTaskFormData({ ...taskFormData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleCambiarEstado = async (e) => {
    e.preventDefault();
    const { idUsuario } = JSON.parse(localStorage.getItem("userData"));
    const cambiarEstado = e.target[1].value;
    const exito = await changeEstado(Id, cambiarEstado, idUsuario);
    if (exito == 200) {
      toast.success("Estado cambiado con éxito");
      setTimeout(() => {
        if (cambiarEstado.estado === "RESUELTO") {
          navigate("/dashboard/admin/tickets");
        } else {
          window.location.reload();
        }
      }, 1500);
    } else {
      toast.error("Error al cambiar estado, intenta más tarde");
    }
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();

    const { id_usuario } = JSON.parse(localStorage.getItem("userData"));

    const form = new FormData();
    form.append("dato", e.target.elements.Informacion.value);
    form.append("id_remitente", parseInt(id_usuario));
    form.append("notificar_cliente", e.target.elements.notifyClient.checked);
    form.append("archivo", e.target.elements.file.files[0]);

    const camposRequeridos = ["dato", "id_remitente", "notificar_cliente"];
    const faltanCampos = [];
    camposRequeridos.forEach((campo) => {
      if (!form.has(campo) || form.get(campo) === "") {
        faltanCampos.push(campo);
      }
    });

    if (faltanCampos.length > 0) {
      toast.error("Faltan campos que llenar");
      return;
    }

    const exito = await EnviarNotificaciones(Id, form);
    if (exito === 200) {
      toast.success("Notificación enviada con éxito");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error("Error al enviar notificación, intenta más tarde");
    }
  };

  // Verificar si un objeto está vacío y mostrar un loader
  if (Object.keys(ticket).length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <main className="container my-3">
      <h2 className="text-center txt_azul">TICKET Nº {Id}</h2>
      <div className="grid_modal_3">
        <div className="mb-3">
          <Form.Label htmlFor="Nombre">Nombre</Form.Label>
          <Form.Control
            type="text"
            id="Nombre"
            value={ticket.clientenombre}
            aria-describedby="nombreHelpBlock"
            className="rounded-5 border-dark"
            disabled
          />
        </div>
        <div className="mb-3">
          <Form.Label htmlFor="Apellido">Apellido</Form.Label>
          <Form.Control
            type="text"
            id="Apellido"
            aria-describedby="apellidoHelpBlock"
            className="rounded-5 border-dark"
            disabled
            value={ticket.clienteapellido}
          />
        </div>
      </div>
      <div className="grid_modal_4">
        <div className="mb-3">
          <Form.Label htmlFor="NombreApp">
            Nombre de Aplicación o Servicio
          </Form.Label>
          <Form.Control
            type="text"
            id="NombreApp"
            aria-describedby="nombreAppHelpBlock"
            className="rounded-5 border-dark"
            disabled
            value={ticket.servicio}
          />
        </div>
        <div className="mb-3">
          <Form.Label htmlFor="Estado">Estado</Form.Label>
          <Form.Control
            type="text"
            id="Estado"
            aria-describedby="EstadoHelpBlock"
            className="rounded-5 border-dark"
            disabled
            value={ticket.estado}
          />
        </div>
        <div className="mb-3">
          <Form.Label htmlFor="Prioridad">Prioridad</Form.Label>
          <Form.Control
            type="text"
            id="Prioridad"
            aria-describedby="PrioridadHelpBlock"
            className="rounded-5 border-dark"
            disabled
            value={ticket.prioridad}
          />
        </div>
        <div className="mb-3">
          <Form.Label htmlFor="Fecha">Fecha de Creación</Form.Label>
          <Form.Control
            type="text"
            id="Fecha"
            aria-describedby="FechaHelpBlock"
            className="rounded-5 border-dark"
            disabled
            value={ticket.fecha}
          />
        </div>
      </div>
      <div className="grid_modal_2">
        <div className="mb-3">
          <Form.Label htmlFor="descript">Descripción del Problema</Form.Label>
          <Form.Control
            as="textarea"
            id="descript"
            aria-describedby="descriptHelpBlock"
            className="rounded-5 border-dark"
            style={{ height: "100px" }}
            disabled
            value={ticket.descripcion}
          />
        </div>
        <div className="mb-3">
          <Form.Label htmlFor="archivos">Archivos enviados:</Form.Label>
          <Form.Control
            as="textarea"
            id="archivos"
            aria-describedby="archivosHelpBlock"
            className="rounded-5 border-dark"
            style={{ height: "100px" }}
            disabled
            value={
              ticket.archivos && ticket.archivos.length > 0
                ? ticket.archivos[0]
                : "No hay archivos disponibles"
            }
          />
        </div>
      </div>
      <Form onSubmit={handleCambiarEstado}>
        <div className="grid_modal_3 align-items-center">
          <div className="mb-3">
            <Form.Label htmlFor="Encargado">Encargado</Form.Label>
            <Form.Control
              type="text"
              id="Encargado"
              aria-describedby="EncargadoHelpBlock"
              className="rounded-5 border-dark"
              disabled
              value={ticket.encargado}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="estadoChange">Cambiar Estado</Form.Label>
            <Form.Select
              className="rounded-5 border-dark"
              aria-label="Default select example"
            >
              {estados.map((estado, i) => (
                <option key={i} value={estado}>
                  {estado}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <Button variant="primary" type="submit" className="rounded-5">
          Cambiar Estado
        </Button>
      </Form>

      <div className="d-flex justify-content-end my-3">
        <Button
          variant="success"
          className="rounded-5"
          onClick={() => setModalShow(true)}
        >
          Asignar Tarea
        </Button>
      </div>

      <ModalAsignarTarea
        show={modalShow}
        id={Id}
        onHide={() => setModalShow(false)}
      />
      <ToastContainer />
    </main>
  );
};

export default AdminDetalleTicket;
