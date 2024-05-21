import  Table  from "react-bootstrap/Table"

const EmpleadosTablaAdmin = () => {
  return (
    <div className="w-100 mx-1 p-4 border border-black rounded mb-2">
        <h4 className="fw-light">Empleados</h4>
        <Table responsive="md">
            <thead>
                <tr>
                    <th  className='bg-celeste fw-medium'>
                        Nombre
                    </th>
                    <th  className='bg-celeste fw-medium'>
                        Tickets Asignados
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Jose Lui</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>Bryan Farfan</td>
                    <td>1</td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}

export default EmpleadosTablaAdmin