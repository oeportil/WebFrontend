import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"

const ModalAsignarTarea = (props) => {
  return (
    <Modal
    {...props}
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
                <tr>
                    <td>Pedro</td>
                    <td>12312</td>
                    <td>pedro@correo.com</td>
                    <td>
                        <button className="border-0 bg-none txt_azul">
                            Asignar
                        </button>
                    </td>        
                </tr>
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