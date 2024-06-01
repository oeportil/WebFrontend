import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardsTareasTickets from "../../components/cards/CardsTareasTickets";
import CardsNotiTickets from "../../components/cards/CardsNotiTickets";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalAsignarTarea from "../../components/modales/ModalAsignarTarea";
import { getDetalleTicket, getEstados } from "../../controllers/TicketsController";
import { crearTarea, getPrioridades } from "../../controllers/TareasController";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDetalleTicket = () => {
  const { id } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [ticket, setTicket] = useState({})
  const[estados, setEstados] = useState([])
  const[prioridades, setPrioridades] = useState([])
  const [taskFormData, setTaskFormData] = useState({
    nombre: "",
    prioridad: "",
    info: ""
  });
  const [notificationFormData, setNotificationFormData] = useState({
    information: "",
    file: null,
    notifyClient: false
  });
  
  useEffect(() => {
    const data = async() =>{
      const tas = await getDetalleTicket(id)
      setTicket(tas)
    }
    data()
    const est = async()  =>{
      const e = await getEstados()
      setEstados(e)
    }
    est()
    const priori = async() =>{
      const pr = await getPrioridades()
      setPrioridades(pr)
    }
    priori()
  }, [])
 
  const handleChangeTarea = e =>{
    setTaskFormData({...taskFormData, [e.target.name]: e.target.value})
  } 

  const handleValidation = async(encargado) => {
    for (let index = 0; index < Object.keys(taskFormData).length; index++) {
      if(Object.values(taskFormData)[index].length == 0){
        toast.error("Hay Campos Vacios")
        return  
      }     
    } 
    const nuevaTarea = {...taskFormData, id_encargado: parseInt(encargado), id_ticket: parseInt(id)}
    const exito = await crearTarea(nuevaTarea)
    if(exito == 200){
      toast.success("Tarea Creada con Exito")
      setTimeout(() => {
        window.location.reload()
      }, 1500);
    } else {
      toast.error("Error al crear tarea, intentelo mas tarde")
    }
  };

  const handleSendNotification = (e) => {
    e.preventDefault();
    console.log("Enviando notificación:", notificationFormData);
  };
  if(Object.keys(ticket).length == 0){
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="loader"></div>
      </div>
    )
  }
  return (
    <main className="container my-3">
      <h2 className="text-center txt_azul">TICKET Nº {id}</h2>
      <div className="grid_modal_3">
        <div className="mb-3">
          <Form.Label htmlFor="Nombre">Nombre</Form.Label>
          <Form.Control
            type="text"
            id="Nombre"
            value={ticket.clienteNombre}
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
            value={ticket.clienteApellido}
          />
        </div>
        <div className="mb-3">
          <Form.Label htmlFor="Telefono">Telefono</Form.Label>
          <Form.Control
            type="tel"
            id="Telefono"
            aria-describedby="telefonoHelpBlock"
            className="rounded-5 border-dark"
            disabled
            value={ticket.clienteTelefono}
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
          <Form.Label htmlFor="Fecha">Fecha de Creacion</Form.Label>
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
          <Form.Label htmlFor="descript">Descripcion del Problema</Form.Label>
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
            value={ticket.archivos[0]}
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
                  <option key={i} value={estado}>{estado}</option>
              ))}
            </Form.Select>
          </div>
          <Button className="mt-3 bg-azulOscuro border-0 rounded-5">
            Cambiar Estado
          </Button>
        </div>
      </Form>
      <Form.Label htmlFor="Tareas">Tareas:</Form.Label>
      {ticket.tareas.map((tarea, i) =>(
        <CardsTareasTickets tarea={tarea} key={i}/>
      ))}
      <h3>Crear Tarea</h3>
      <Form onSubmit={(e) => e.preventDefault()} className="mb-3">
        <div className="grid_modal_2">
          <div className="mb-3">
            <Form.Label htmlFor="tareNombre">Nombre</Form.Label>
            <Form.Control
              type="text"
              id="tareNombre"
              name="nombre"
              aria-describedby="tareNombreHelpBlock"
              className="rounded-5 border-dark"
              value={taskFormData.nombre}
              onChange={handleChangeTarea}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="PrioridadTarea">Prioridad</Form.Label>
            <Form.Select
              className="rounded-5 border-dark"
              aria-label="Default select example"
              name="prioridad"
              value={taskFormData.prioridad}
              onChange={handleChangeTarea}
            >
              <option disabled value={""}>--Seleccione Una Opcion--</option>
              {prioridades.map((prioridad, i) => (
                  <option key={i} value={prioridad}>{prioridad}</option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className="">
          <Form.Label htmlFor="DescripcionTarea">Descripcion</Form.Label>
          <Form.Control
            as="textarea"
            id="DescripcionTarea"
            aria-describedby="DescripcionTareaHelpBlock"
            className="rounded-5 border-dark"
            style={{ height: "100px" }}
            name="info"
            value={taskFormData.info}
            onChange={handleChangeTarea}
          />
        </div>
        <Button onClick={() => setModalShow(true)} className="mt-3 bg-azulOscuro border-0 rounded-5 boton-25">
            Crear y Asignar Tarea
        </Button>
        <ModalAsignarTarea
             show={modalShow}
             onHide={() => setModalShow(false)}
             tarea={handleValidation}
        />
      </Form>
      <Form.Label htmlFor="Notificaciones">Notificaciones:</Form.Label>
      <CardsNotiTickets />
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
            />
          </div>
          <div className="buscar">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Envio de Archivo (Opcional)</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Check inline label="Notificar al Cliente" />
            <div>
              <Button type="submit" className="mt-3 bg-azulOscuro border-0 rounded-5 w-100">
                Enviar Notificacion
              </Button>
            </div>
          </div>
        </div>
      </Form>
      <ToastContainer
              autoClose={2000}
              transition:Slide
              
              theme="colored"
            />
    </main>
  );
};

export default AdminDetalleTicket;
