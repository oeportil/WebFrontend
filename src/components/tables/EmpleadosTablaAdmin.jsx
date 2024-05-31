import { useEffect, useState } from "react"
import  Table  from "react-bootstrap/Table"
import { getEmpleados } from "../../controllers/UsuariosControllers"

const EmpleadosTablaAdmin = () => {
    const[empleados, setEmpleados] = useState([])
    useEffect(() => {
        const empleados = async() => {
                const emp = await getEmpleados()
                await setEmpleados(emp)
        }
        empleados()
    }, [])
  return (
    <div className="w-100 mx-1 p-4 border border-black rounded mb-2">
        <h4 className="fw-light">Empleados</h4>
        {empleados.length != 0 ? <Table responsive="md">
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
                {empleados.map((empleado, i )=> (
                    <tr key={i}>
                        <td>{empleado.nombre}</td>
                        <td>{empleado.no_tickets}</td>
                    </tr>
                ))}
            </tbody>
        </Table> : <div>No hay Usuarios Registrados</div>}
    </div>
  )
}

export default EmpleadosTablaAdmin