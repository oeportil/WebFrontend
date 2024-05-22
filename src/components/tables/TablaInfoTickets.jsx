import Table from 'react-bootstrap/Table';

const TablaInfoTickets = () => {
  return (
    <Table responsive="lg" className="my-3 mx-2">
            <thead>
                <tr>
                    <th className='bg-celeste'>
                        ID
                    </th >
                    <th  className='bg-celeste'>
                       Servicio
                    </th>
                    <th  className='bg-celeste'>
                        Cliente
                    </th>
                    <th className='bg-celeste' >
                        Correo
                    </th>
                    <th  className='bg-celeste'>
                        Fecha
                    </th>
                    <th className='bg-celeste'>
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
                        <button className="border-0 bg-none txt_azul">
                            Ver detalle
                        </button>
                    </td>                    
                </tr>
            </tbody>
        </Table>
  )
}

export default TablaInfoTickets