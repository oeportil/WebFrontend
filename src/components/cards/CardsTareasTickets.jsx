import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ModalAsignarTarea from '../modales/ModalAsignarTarea';
import { AsignarTarea } from '../../controllers/TicketsController';

import {  toast } from "react-toastify";


const CardsTareasTickets = ({tarea}) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Card className='my-3' style={{ width: '100%' }}>
    <Card.Body>
      <Card.Title>{tarea.nombre}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Prioridad {tarea.prioridad}</Card.Subtitle>
        <div className='grid_modal_2'>
            <div className='mb-1'>
                <Card.Subtitle>Descripcion: </Card.Subtitle>
                <Card.Text>
                  {tarea.info}
                </Card.Text>    
            </div>
            <hr className='d-md-none'/>
            <div className='mb-1'>
                <Card.Subtitle>Estado: </Card.Subtitle>
                <Card.Text>
                  {tarea.estado}
                </Card.Text>
            </div>
        </div> 
    </Card.Body>
    <Card.Footer>
        {tarea.encargado != null ? `Asignada a: ${tarea.encargado} `: 
          <button onClick={() =>setModalShow(true)} className="border-0 bg-none txt_azul">
              Asignar
          </button>} 
    </Card.Footer>
    <ModalAsignarTarea
             show={modalShow}
             onHide={() => setModalShow(false)}
             tarea={handleAsignar}
        />

  </Card>
  )

  async function handleAsignar(user){

    const exito = await AsignarTarea(tarea.id_tarea, {id_encargado: user})
    if(exito == 200){
      toast.success("Tarea Asignada con Exito")
      setTimeout(() => {
        window.location.reload()
      }, 1500);
    } else {
      toast.error("Error al asignar tarea, intentelo mas tarde")
    }
  }
}

export default CardsTareasTickets