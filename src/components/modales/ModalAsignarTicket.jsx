import Table from "react-bootstrap/Table"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import  Form  from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { getTecnicosforTicket } from "../../controllers/UsuariosControllers";
import { asginarTicketBD } from "../../controllers/TicketsController"

const ModalAsignarTicket = (props) => {
  const[tecnicos, setTecnicos] = useState([])
  const[email, setEmail] = useState("")
  useEffect(() => {
    const tech = async() => {
      const tecnic = await getTecnicosforTicket()
      setTecnicos(tecnic)
    } 
    tech()
  }, [])
  const Filtrar =async() =>{   
    const tecnic = await getTecnicosforTicket(email)
    setTecnicos(tecnic)
  }

  const asignarTicket = async(tecnico) =>{
    const asignacion = {
      id_soporte: parseInt(tecnico)
    }
    const exito = await asginarTicketBD(props.id, asignacion)
    if(exito == 200){
      toast.success("Ticket Asignado Correctamente");
      setTimeout(() => {
        props.onHide();
        window.location.reload()
      }, 1500);
    } else {
      toast.error("Error Inesperado, Intente mas tarde");
      return
    }   
  }
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Asignar Ticket
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='p-2 border rounded my-2'>
      <InputGroup className="mb-3 buscar">
      <Form.Control
                type="buscarID"
                id="inputbuscarID"
                aria-describedby="buscarIDHelpBlock"
                placeholder="Buscar por Correo"
                className="w-25"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={Filtrar}
              variant="outline-secondary"
              id="button-addon2"
            >
              Filtrar <i className="bi bi-arrow-right"></i>
            </Button>
      </InputGroup>

            {tecnicos.length != 0 ? <Table responsive="md" className="my-3 mx-2">
            <thead>
                <tr>
                    <th >
                        Nombre
                    </th >
                    <th  >
                       Telefono
                    </th>
                    <th  >
                        Correo
                    </th>
                </tr>
            </thead>
            <tbody>
              {tecnicos.map((tecnico, i) => (
                  <tr key={i}>
                  <td>{tecnico.nombre}</td>
                  <td>{tecnico.telefono}</td>
                  <td>{tecnico.email}</td>
                  <td>
                      <button onClick={() =>asignarTicket(tecnico.id_usuario)} className="border-0 bg-none txt_azul">
                          Asignar
                      </button>
                  </td>        
              </tr>
              ))}                
            </tbody>
            </Table>: <div>No Hay Tecnicos Aun</div>}
       </div>
       <ToastContainer
              autoClose={2000}
              transition:Slide
              
              theme="colored"
            />
      </Modal.Body>
    </Modal>
  )
}

export default ModalAsignarTicket