import React, { useState } from 'react'
import { useEffect } from 'react'
import  Table  from 'react-bootstrap/Table'
import { getTicketsDasAdmin } from '../../controllers/TicketsController'

const HistorialTablaAdmin = () => {
    const [Tickets, setTickets] = useState([])
    useEffect(() => {
        const data = async() =>{
            const ticket = await getTicketsDasAdmin()
            await setTickets(ticket)
        }   
        data()
    }, [])
    console.log(Tickets)
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
                        <td>{ticket.empleado}</td>
                    </tr>
                ))}
            </tbody>
        </Table> : <div>No hay Tickets Creados</div>}       
    </div>
  )
}

export default HistorialTablaAdmin