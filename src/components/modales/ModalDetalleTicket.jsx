import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardsTareasTickets from "../cards/CardsTareasTickets";
import CardsNotiTickets from "../cards/CardsNotiTickets";

const ModalDetalleTicket = (props) => {
  const userDataString = JSON.parse(localStorage.getItem("userData"));
  const [fullscreen, setFullscreen] = useState(true);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen={fullscreen}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <p className="text-uppercase">Ticket N° {}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="grid_modal_3">
          <div className="mb-3">
            <Form.Label htmlFor="Nombre">Nombre</Form.Label>
            <Form.Control
              type="text"
              id="Nombre"
              aria-describedby="nombreHelpBlock"
              className="rounded-5 border-dark"
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="Apellido">Apellido</Form.Label>
            <Form.Control
              type="text"
              id="Apellido"
              aria-describedby="apellidoHelpBlock"
              className="rounded-5 border-dark"
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="Telefono">Telefono</Form.Label>
            <Form.Control
              type="tel"
              id="Telefono"
              aria-describedby="telefonoHelpBlock"
              className="rounded-5 border-dark"
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
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="Estado">Estado</Form.Label>
            <Form.Control
              type="text"
              id="Estado"
              aria-describedby="EstadoHelpBlock"
              className="rounded-5 border-dark"
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="Prioridad">Prioridad</Form.Label>
            <Form.Control
              type="text"
              id="Prioridad"
              aria-describedby="PrioridadHelpBlock"
              className="rounded-5 border-dark"
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="Fecha">Fecha de Creacion</Form.Label>
            <Form.Control
              type="date"
              id="Fecha"
              aria-describedby="FechaHelpBlock"
              className="rounded-5 border-dark"
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
              />
            </div>
            <div className="mb-3">
              {FormData.tipo == 1 ? (
                <p>Hola</p>
              ) : (
                <>
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
            <Button className="mt-3 bg-azulOscuro border-0 rounded-5">
              Cambiar Estado
            </Button>
          </div>
        </Form>
        <Form.Label htmlFor="Tareas">Tareas:</Form.Label>
        <CardsTareasTickets />
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
              <Form.Check inline label="Notificar al Cliente" />
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
