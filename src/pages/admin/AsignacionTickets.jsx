import { useState } from "react";
import  Form  from "react-bootstrap/Form"
import Table from "react-bootstrap/Table"
import ModalAsignarTicket from "../../components/ModalAsignarTicket";

const AsignacionTickets = () => {
    const [modalShow, setModalShow] = useState(false);
  return (
    <main className='container my-4'>
       <h4>Asignacion de Tickets</h4>
       <div className='p-2 border rounded my-2'>
            <Form.Control
                type="buscarID"
                id="inputbuscarID"
                aria-describedby="buscarIDHelpBlock"
                placeholder="Buscar por Id"
                className="buscar"
            />
            <Table responsive="md" className="my-3 mx-2">
            <thead>
                <tr>
                    <th >
                        ID
                    </th >
                    <th  >
                       Servicio
                    </th>
                    <th  >
                        Cliente
                    </th>
                    <th  >
                        Correo
                    </th>
                    <th  >
                        Fecha de Ingreso
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>12</td>
                    <td>Tecnisismo</td>
                    <td>Pedro</td>
                    <td>pedro@correo.com</td>
                    <td>dd/mm/yyyy</td>
                    <td>
                        <button className="border-0 bg-none d-flex gap-2 txt_azul"  onClick={() => setModalShow(true)}>
                            <p>Asignar</p> <i className="bi bi-arrow-right mt-1"></i>
                        </button>
                        <ModalAsignarTicket
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        />
                    </td>                    
                </tr>
            </tbody>
        </Table>
       </div>
    </main>
  )
}

export default AsignacionTickets