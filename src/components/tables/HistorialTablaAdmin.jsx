import React from 'react'
import  Table  from 'react-bootstrap/Table'

const HistorialTablaAdmin = () => {
  return (
    <div  className="w-100 mx-1 p-4 border border-black rounded mb-2"> 
        <h4 className="fw-light">Historial de ultmimos Tickets creados</h4>
        <Table responsive="md">
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
                <tr>
                    <td>Lorem</td>
                    <td>00/00/00</td>
                    <td>Pedro</td>
                </tr>
                <tr>
                    <td>Lorem</td>
                    <td>00/00/00</td>
                    <td>Xavier</td>
                </tr>
            </tbody>
        </Table>        
    </div>
  )
}

export default HistorialTablaAdmin