import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
import { useEffect, useState } from 'react';
import { getTecnicosByEmail } from '../../controllers/UsuariosControllers';

const ModalAsignarTarea = (props) => {
  const[tecnicos, setTecnicos] = useState([])

  useEffect(() => {
    const data = async() =>{
      const tec = await getTecnicosByEmail()
      setTecnicos(tec)
    }
    data()
  }, [])

  return (
    <Modal
    show={props.show} onHide={props.onHide}
    size="xl"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Asignar Tarea
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className='p-2 border rounded my-2'>
            <Form.Control
                type="buscarID"
                id="inputbuscarID"
                aria-describedby="buscarIDHelpBlock"
                placeholder="Buscar por Correo"
                className="w-25"
            />
            <Table responsive="md" className="my-3 mx-2">
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
              {tecnicos.map(tecnico =>(
                <tr key={tecnico.id_usuario}>
                  <td>{tecnico.nombre}</td>
                  <td>{tecnico.telefono}</td>
                  <td>{tecnico.email}</td>
                  <td>
                      <button onClick={() => props.tarea(tecnico.id_usuario)} className="border-0 bg-none txt_azul">
                          Asignar
                      </button>
                  </td>        
                </tr>
              ))}                
            </tbody>
        </Table>
       </div>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  )

}

export default ModalAsignarTarea