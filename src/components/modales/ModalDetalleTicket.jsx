import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardsTareasTickets from "../cards/CardsTareasTickets";
import CardsNotiTickets from "../cards/CardsNotiTickets";
import { useState, useEffect, useRef } from "react";

const ModalDetalleTicket = ({ show, idTicket, onHide }) => {
  const userDataString = JSON.parse(localStorage.getItem("userData"));
  const [fullscreen, setFullscreen] = useState(true);
  const [detalleTicket, setDetalleTicket] = useState({});

  const isFirstRender = useRef(true);
  //aca se toma el ticekt
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Marca como no primer render después de la primera ejecución
      return; // Salir del useEffect en el primer render
    }

    let url = "";
    if (userDataString.tipo === 1) {
      url = `${
        import.meta.env.VITE_API_URL
      }/Ticket/ObtenerDetalleCliente/${idTicket}`;
    } else {
      url = `${import.meta.env.VITE_API_URL}/Ticket/ObtenerDetalle/${idTicket}`;
    }

    const obtenerDetalle = async () => {
      setDetalleTicket({});
      if (idTicket) {
        const LlamadoDetalle = await fetch(url);
        if (LlamadoDetalle.status !== 404) {
          const detalle = await LlamadoDetalle.json();
          await setDetalleTicket(detalle);
        } else {
          console.warn("Esperando Elección de ticket");
        }
      }
      return;
    };

    obtenerDetalle();
  }, [idTicket]);
  console.log(detalleTicket);
  const archivoExiste =
    detalleTicket?.archivos?.length > 0
      ? detalleTicket.archivos[0]
      : "No se enviaron archivos para este ticket";
  const asignadoExiste = !detalleTicket?.encargado
    ? "No hay un encargado"
    : detalleTicket?.encargado;

  if (Object.keys(detalleTicket).length == 0) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="loader"></div>
      </div>
    );
  }
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
              defaultValue={detalleTicket?.clienteNombre}
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
              defaultValue={detalleTicket?.clienteApellido}
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
              defaultValue={detalleTicket?.clienteTelefono}
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
        <Form>
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
              {userDataString.tipo == 3 && (
                <>
                  {" "}
                  <Form.Label htmlFor="estadoChange">Cambiar Estado</Form.Label>
                  <Form.Select
                    className="rounded-5 border-dark"
                    aria-label="Default select example"
                  >
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </>
              )}
            </div>
            {userDataString.tipo == 3 && (
              <Button className="mt-3 bg-azulOscuro border-0 rounded-5">
                Cambiar Estado
              </Button>
            )}
          </div>
        </Form>
        <Form.Label htmlFor="Tareas">Tareas:</Form.Label>
        {detalleTicket?.tareas.map((tarea) => (
          <CardsTareasTickets key={tarea} tarea={tarea} />
        ))}

        <Form.Label htmlFor="Notificaciones">Notificaciones:</Form.Label>
        <CardsNotiTickets />
        <h3>Enviar Notificacion</h3>
        <Form>
          <div className="d-md-flex justify-content-between gap-4">
            <div className="mb-2 buscar">
              <Form.Label htmlFor="Informacion">Informacion:</Form.Label>
              <Form.Control
                as="textarea"
                id="Informacion"
                aria-describedby="InformacionHelpBlock"
                className="rounded-5 border-dark"
                style={{ height: "100px" }}
              />
            </div>
            <div className="buscar">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Envio de Archivo (Opcional)</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              {userDataString.tipo != 1 && (
                <Form.Check inline label="Notificar al Cliente" />
              )}

              <div>
                <Button className="mt-3 bg-azulOscuro border-0 rounded-5 w-100">
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
