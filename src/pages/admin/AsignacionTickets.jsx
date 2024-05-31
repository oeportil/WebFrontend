import { useState, useEffect } from "react";
import  Form  from "react-bootstrap/Form"
import Table from "react-bootstrap/Table"
import ModalAsignarTicket from "../../components/modales/ModalAsignarTicket";
import { getTicketsSinAsignar } from "../../controllers/TicketsController";

const AsignacionTickets = () => {
    const [modalShow, setModalShow] = useState(false);
    const [tsAsginar, setTsAsignar] = useState([]);
    

    useEffect(() => {
        const tickets = async() => {
            const tick = await getTicketsSinAsignar()
            setTsAsignar(tick)
        }
        tickets()
    }, [])
  return (
    <main className='container my-4'>
       <h4>Asignacion de Tickets</h4>
       <div className='p-2 border rounded my-2'>
           {tsAsginar.length != 0 ?  <Table responsive="md" className="my-3 mx-2">
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
                {tsAsginar.map(ticket => (
                    <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.servicio}</td>
                    <td>{ticket.cliente}</td>
                    <td>{ticket.correo}</td>
                    <td>{ticket.fecha}</td>
                    <td>
                        <button className="border-0 bg-none d-flex gap-2 txt_azul"  onClick={() => setModalShow(true)}>
                            <p>Asignar</p> <i className="bi bi-arrow-right mt-1"></i>
                        </button>
                        <ModalAsignarTicket
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        id={ticket.id}                       
                        />
                    </td>                    
                </tr>
                ))}
            </tbody>
             </Table>: <div>No hay Tickets Para Asignar</div>}
       </div>
    </main>
  )
}

export default AsignacionTickets