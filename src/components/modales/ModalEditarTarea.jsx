import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditTarea, RechazarTarea } from "../../controllers/TicketsController";

const ModalEditarTarea = (props) => {
  const[estado, setEstado] = useState("")
  const {tarea} = props
  useEffect(() => {
    setEstado(tarea.estado)
  }, [tarea])
    
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar Tarea
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={tarea.nombre} disabled/>
          </Form.Group>
          <div className="grid_modal_2">
            <div className="mb-3">
              <Form.Label htmlFor="Encargado">Encargado</Form.Label>
              <Form.Control
                type="text"
                id="Encargado"
                aria-describedby="EncargadoHelpBlock"
                className="rounded-5 border-dark"
                value={tarea.encargado}
                disabled
              />
            </div>
            <div className="mb-3">
              <Form.Label htmlFor="PrioridadTarea">Prioridad</Form.Label>
              <Form.Control type="text" value={tarea.prioridad} disabled/>
            </div>
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="DescripcionTarea">Descripcion</Form.Label>
            <Form.Control
              as="textarea"
              id="DescripcionTarea"
              aria-describedby="DescripcionTareaHelpBlock"
              className="rounded-5 border-dark"
              style={{ height: "100px" }}
              value={tarea.info}
              disabled
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="EstadoTarea">Estado</Form.Label>
            <Form.Control
              as="textarea"
              id="EstadoTarea"
              aria-describedby="EstadoTareaHelpBlock"
              className="rounded-5 border-dark"
              style={{ height: "100px" }}
              value={estado}
              onChange={e=> setEstado(e.target.value)}
            />
          </div>
          <div className="grid_modal_3">
            <Button onClick={RechaTarea} className="mt-3 bg-cafe border-0 rounded-5 w-100">
              Rechazar Tarea
            </Button>
            <Button onClick={FinalizarTarea} className="mt-3 bg-verde text-dark border-0 rounded-5 w-100">
              Finalizar Tarea
            </Button>
            <Button onClick={()=> EditarTarea()} className="mt-3 bg-azulOscuro border-0 rounded-5 w-100">
              Editar Tarea
            </Button>
          </div>
        </Form>
        <ToastContainer
              autoClose={2000}
              transition:Slide
              
              theme="colored"
            />
      </Modal.Body>
    </Modal>
  );

  async function FinalizarTarea() {
    if(estado.length != 0){
      const tEd = {
        completada: true,
        estado
      }
      const exito = await EditTarea(tarea.id_tarea, tEd)
    if(exito == 200){
      toast.success("La Tarea se finalizó con exito")
      setTimeout(() => {
        window.location.reload();
      }, 1500);
     } else {
      toast.error("Error al Finalizar Tarea, Intente Nuevamente")
     }
    } else {
      toast.error("Debe de dar un estado Final")
      return 
    }
  }

  async function EditarTarea(){
      if(estado.length != 0){
        const tEd = {
          completada: false,
          estado
        }
       const exito = await EditTarea(tarea.id_tarea, tEd)
       if(exito == 200){
        toast.success("La Tarea fue editada con exito")
        setTimeout(() => {
          window.location.reload();
        }, 1500);
       } else {
        toast.error("Error al Editar Tarea, Intente Nuevamente")
       }
      } else {
        toast.error("Debe de Llenar los Campos Correspondientes")
        return 
      }
  }

  async function RechaTarea(){
    if(tarea.estado != estado){
      if(estado.length != 0){
        const tEd = {
          completada: false,
          estado
        }
        await EditTarea(tarea.id_tarea, tEd)        
      }
    }
    const exito = await RechazarTarea(tarea.id_tarea)
    if(exito == 200){
      toast.success("La Tarea fue rechazada con exito")
      setTimeout(() => {
        window.location.reload();
      }, 1500);
     } else {
      toast.error("Error al Rechazar Tarea, Intente Nuevamente")
     }

  }
};

export default ModalEditarTarea;
