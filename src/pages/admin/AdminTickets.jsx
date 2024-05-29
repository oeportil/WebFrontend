import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Table from "react-bootstrap/Table"
import { Link } from 'react-router-dom'
import ModalEditarTarea from '../../components/modales/ModalEditarTarea';

const AdminTickets = () => {
    const [modalShow, setModalShow] = useState(false);
  return (
    <main className='container my-3'>
        <h4 className='text-center text-uppercase txt_azul fw-normal'>Tickets Asignados</h4>
        <div className='d-md-flex justify-content-between'>
        <Form.Control
                type="buscarID"
                id="inputbuscarID"
                aria-describedby="buscarIDHelpBlock"
                placeholder="Buscar por Id"
                className="buscar mt-2"
            />
        <Form.Select className='select mt-2' aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>
        </div>
        <Table responsive="md" className='my-3'>
            <thead>
                <tr>
                    <th  className='bg-azulMedio text-white'>
                        ID
                    </th>
                    <th className='bg-azulMedio text-white'>
                        Servicio
                    </th>
                    <th className='bg-azulMedio text-white'>
                        Cliente
                    </th >
                    <th  className='bg-azulMedio text-white'>
                        Correo
                    </th>
                    <th className='bg-azulMedio'>

                    </th>
                   
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>12</td>
                    <td>Service</td>
                    <td>Pedro</td>
                    <td>correo@correo.com</td>
                    <td>
                        <Link className="txt_azul" to={`/dashboard/admin/tickets/${12}`}>
                                Editar Ticket
                        </Link>    
                    </td>
                </tr>
            </tbody>
        </Table>
        <h4 className='text-center text-uppercase txt_azul fw-normal'>Tareas Asignadas</h4>
        <div className='d-md-flex gap-2'>
            <Form.Control
                    type="buscarID"
                    id="inputbuscarID"
                    aria-describedby="buscarIDHelpBlock"
                    placeholder="Buscar por Id"
                    className="buscar mt-2"
                />
            <Form.Control
                type="buscarID"
                id="inputbuscarID"
                aria-describedby="buscarIDHelpBlock"
                placeholder="Buscar por Nombre"
                className="buscar mt-2"
            />
            <Form.Select className='select mt-2' aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
        </div>
        <Table responsive="md" className='my-3'>
            <thead>
                <tr>
                    <th  className='bg-azulMedio text-white'>
                        ID de Ticket
                    </th>
                    <th className='bg-azulMedio text-white'>
                        Servicio
                    </th>
                    <th className='bg-azulMedio text-white'>
                        Cliente
                    </th >
                    <th  className='bg-azulMedio text-white'>
                        Nombre Tarea
                    </th>
                    <th className='bg-azulMedio'>

                    </th>
                   
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>12</td>
                    <td>Service</td>
                    <td>Pedro</td>
                    <td>Maquetado</td>
                    <td>
                        <button className="border-0 bg-none txt_azul">
                                Ver Ticket
                        </button>
                        <button className="border-0 bg-none txt_azul" onClick={() => setModalShow(true)}>
                                Editar Tarea
                        </button>
                        <ModalEditarTarea
                         show={modalShow}
                         onHide={() => setModalShow(false)}
                         />
                    </td>
                </tr>
            </tbody>
        </Table>
    </main>
  )
}

export default AdminTickets