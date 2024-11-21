import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardsTareasTickets from "../cards/CardsTareasTickets";
import CardsNotiTickets from "../cards/CardsNotiTickets";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  EnviarNotificaciones,
  changeEstado,
} from "../../controllers/TicketsController";
import { obtenerDetalle } from "../../helpers/ObtenerDetalleTicket";
import { getEstados } from "../../controllers/TicketsController";
const ModalDetalleTicket = ({ show, idTicket, onHide }) => {
  const navigate = useNavigate();
  const userDataString = JSON.parse(localStorage.getItem("userData"));
  const [fullscreen, setFullscreen] = useState(true);
  const [detalleTicket, setDetalleTicket] = useState([]);
  const [estados, setEstados] = useState([]);
  const tipo = JSON.parse(localStorage.getItem("userData")).rol.idRol;
  //condición de los 2 ternarios de cambio estado
  const puedeCambio = useEffect(() => {
    const est = async () => {
      const e = await getEstados();
      setEstados(e);
    };
    est();
  }, []);
  const handleCambiarEstado = async (e) => {
    e.preventDefault();
    const { idUsuario } = JSON.parse(localStorage.getItem("userData"));
    const cambiarEstado = e.target[1].value;
    console.log(idUsuario);
    const exito = await changeEstado(idTicket, cambiarEstado, idUsuario);
    if (exito == 200) {
      toast.success("Se cambio el estado con exito");
      setTimeout(() => {
        if (cambiarEstado.estado === "RESUELTO") {
          navigate("/dashboard/admin/tickets");
        } else {
          window.location.reload();
        }
      }, 1500);
    } else {
      toast.error("Error al cambiar estado, intentelo mas tarde");
    }
  };
  const isFirstRender = useRef(true);
  //aca se toma el ticekt
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Marca como no primer render después de la primera ejecución
      return; // Salir del useEffect en el primer render
    }
    const fetchDetalle = async () => {
      setDetalleTicket({});
      const detalle = await obtenerDetalle({ idTicket });
      setDetalleTicket(detalle);
    };

    fetchDetalle();
  }, [idTicket]);

  const archivoExiste =
    detalleTicket?.archivos?.length > 0
      ? detalleTicket.archivos[0]
      : "No se enviaron archivos para este ticket";
  const asignadoExiste = !detalleTicket?.encargado
    ? "No hay un encargado"
    : detalleTicket?.encargado;

  if (detalleTicket && Object.keys(detalleTicket).length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center ">
        <div></div>
      </div>
    );
  }
  const handleSendNotification = async (e) => {
    e.preventDefault();

    const { idUsuario } = JSON.parse(localStorage.getItem("userData"));

    const form = new FormData();

    form.append("dato", e.target.elements.Informacion.value);
    form.append("id_remitente", parseInt(idUsuario));
    form.append("notificar_cliente", e.target.elements.notifyClient.checked);
    form.append("archivo", e.target.elements.file.files[0]);

    // Verificar que los campos requeridos estén presentes
    const camposRequeridos = ["dato", "id_remitente", "notificar_cliente"];
    const faltanCampos = [];
    camposRequeridos.forEach((campo) => {
      if (!form.has(campo) || form.get(campo) === "") {
        faltanCampos.push(campo);
      }
    });
    if (faltanCampos.length > 0) {
      toast.error("Faltan Campos que Llenar");
      return;
    }

    // Enviar la notificación
    const exito = await EnviarNotificaciones(idTicket, form);
    if (exito === 200) {
      toast.success("Notificación Enviada con Exito");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error(`Error al Enviar una Notificación, intente más tarde`);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen={fullscreen}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <p className="text-uppercase">Ticket N° {idTicket}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="grid_modal_3">
          <div className="mb-3">
            <Form.Label htmlFor="Nombre">Nombre</Form.Label>
            <Form.Control
              type="text"
              disabled={true}
              id="Nombre"
              aria-describedby="nombreHelpBlock"
              className="rounded-5 border-dark"
              defaultValue={detalleTicket?.clientenombre}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="Apellido">Apellido</Form.Label>
            <Form.Control
              type="text"
              id="Apellido"
              aria-describedby="apellidoHelpBlock"
              className="rounded-5 border-dark"
              disabled={true}
              defaultValue={detalleTicket?.clienteapellido}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="Telefono">Telefono</Form.Label>
            <Form.Control
              type="tel"
              id="Telefono"
              aria-describedby="telefonoHelpBlock"
              className="rounded-5 border-dark"
              disabled={true}
              defaultValue={detalleTicket?.clientetelefono}
            />
          </div>
        </div>
        <div className="grid_modal_4">
          <div className="mb-3">
            <Form.Label htmlFor="NombreApp">
              Nombre de Aplicacion o Servicio
            </Form.Label>
            <Form.Control
              type="text"
              id="NombreApp"
              aria-describedby="nombreAppHelpBlock"
              className="rounded-5 border-dark"
              disabled={true}
              defaultValue={detalleTicket?.servicio}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="Estado">Estado</Form.Label>
            <Form.Control
              type="text"
              id="Estado"
              aria-describedby="EstadoHelpBlock"
              className="rounded-5 border-dark"
              disabled={true}
              defaultValue={detalleTicket?.estado}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="Prioridad">Prioridad</Form.Label>
            <Form.Control
              type="text"
              id="Prioridad"
              aria-describedby="PrioridadHelpBlock"
              className="rounded-5 border-dark"
              disabled={true}
              defaultValue={detalleTicket?.prioridad}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="Fecha">Fecha de Creacion</Form.Label>
            <Form.Control
              type="text"
              id="Fecha"
              aria-describedby="FechaHelpBlock"
              className="rounded-5 border-dark"
              disabled={true}
              defaultValue={detalleTicket?.fecha}
            />
          </div>
        </div>
        <div className="grid_modal_2">
          <div className="mb-3">
            <Form.Label htmlFor="descript">Descripcion del Problema</Form.Label>
            <Form.Control
              as="textarea"
              id="descript"
              aria-describedby="descriptHelpBlock"
              className="rounded-5 border-dark"
              style={{ height: "100px" }}
              disabled={true}
              defaultValue={detalleTicket?.descripcion}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="archivos">Archivos enviados:</Form.Label>
            {archivoExiste != "No se enviaron archivos para este ticket" && (
              <a href={archivoExiste} target="_blank">
                Presiona para ver archivo
              </a>
            )}

            <Form.Control
              as="textarea"
              id="archivos"
              aria-describedby="archivosHelpBlock"
              className="rounded-5 border-dark"
              style={{ height: "100px" }}
              disabled={true}
              defaultValue={archivoExiste}
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
                disabled={true}
                defaultValue={asignadoExiste}
              />
            </div>
            <div className="mb-3">
              {tipo != 1 && detalleTicket?.estado !== "RESUELTO" && (
                <>
                  {" "}
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
                </>
              )}
            </div>
            {tipo != 1 && detalleTicket?.estado !== "RESUELTO" && (
              <Button
                type="submit"
                className="mt-3 bg-azulOscuro border-0 rounded-5"
              >
                Cambiar Estado
              </Button>
            )}
          </div>
        </Form>
        {/* <Form.Label htmlFor="Tareas">Tareas:</Form.Label>
        {detalleTicket?.tareas &&
          detalleTicket?.tareas.map((tarea, i) => (
            <CardsTareasTickets key={i} tarea={tarea} />
          ))} */}

        <Form.Label htmlFor="Notificaciones">Notificaciones:</Form.Label>
        {detalleTicket?.notificaciones &&
          detalleTicket?.notificaciones.map((noti, i) => (
            <CardsNotiTickets key={i} notificacion={noti} />
          ))}
        <h3>Enviar Notificacion</h3>
        <Form onSubmit={handleSendNotification}>
          <div className="d-md-flex justify-content-between gap-4">
            <div className="mb-2 buscar">
              <Form.Label htmlFor="Informacion">Informacion:</Form.Label>
              <Form.Control
                as="textarea"
                id="Informacion"
                aria-describedby="InformacionHelpBlock"
                className="rounded-5 border-dark"
                style={{ height: "100px" }}
                name="information"
                // value={notificationFormData.information}
                // onChange={handleChangeNoti}
              />
            </div>
            <div className="buscar">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Envio de Archivo (Opcional)</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  //  value={notificationFormData.file}
                  //  onChange={handleChangeNoti}
                />
              </Form.Group>
              <Form.Check
                id="notifyClient"
                name="notifyClient"
                // value={notificationFormData.notifyClient}
                // onChange={handleChangeNoti}
                inline
                label="Notificar al Cliente"
              />
              <div>
                <Button
                  type="submit"
                  className="mt-3 bg-azulOscuro border-0 rounded-5 w-100"
                >
                  Enviar Notificacion
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDetalleTicket;
