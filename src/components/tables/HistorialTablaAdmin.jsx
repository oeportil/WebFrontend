import React, { useState } from 'react'
import { useEffect } from 'react'
import  Table  from 'react-bootstrap/Table'
import { getTicketsDasAdmin } from '../../controllers/TicketsController'
import ModalAsignarTicket from '../modales/ModalAsignarTicket'

const HistorialTablaAdmin = () => {
    const [Tickets, setTickets] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const[asignado, setAsignado] = useState(0);
    useEffect(() => {
        const data = async() =>{
            const ticket = await getTicketsDasAdmin()
            await setTickets(ticket)
        }   
        data()
    }, [])
  return (
    <div  className="w-100 mx-1 p-4 bo  rder border-black rounded mb-2"> 
        <h4 className="fw-light">Historial de ultmimos Tickets creados</h4>
        {Tickets.length != 0 ? <Table responsive="md">
            <thead>
                <tr>
                    <th className='bg-celeste fw-medium'>
                        Servicio
                    </th >
                    <th  className='bg-celeste fw-medium'>
                        Fecha
                    </th>
                    <th  className='bg-celeste fw-medium'>
                        Encargado
                    </th>
                </tr>
            </thead>
            <tbody>
                {Tickets.map((ticket, i) => (
                    <tr key={i}>
                        <td>{ticket.servicio}</td>
                        <td>{ticket.fecha}</td>
                        <td>{ticket.empleado != null ? ticket.empleado : 
                        <div>
                            <button className="border-0 bg-none d-flex gap-2 txt_azul"  onClick={() => asignarTicket(ticket.id)}>
                                <p>Asignar</p>
                            </button>
                                
                        </div>
                        }</td>
                        
                    </tr>
                ))}
            </tbody>
            <ModalAsignarTicket
            show={modalShow}
            onHide={() => setModalShow(false)}
            id={asignado}                       
            />
        </Table> : <div>No hay Tickets Creados</div>}       
    </div>
  )
  function asignarTicket(num){
    setAsignado(num)
    setModalShow(true)
  }
}

export default HistorialTablaAdmin