import React, { useEffect, useState } from 'react'
import CardsAdminInfo from '../components/cards/CardsAdminInfo'
import EmpleadosTablaAdmin from '../components/tables/EmpleadosTablaAdmin'
import HistorialTablaAdmin from '../components/tables/HistorialTablaAdmin'
import { getEstadisticas } from '../controllers/TicketsController'

const AdminDashboard = () => {
  const[estadisticas, setEstadisticas] = useState({noabiertos: 0,
  noprogreso: 0,
  nocerrados: 0})

  useEffect(() => {
    const data = async() => {
      const esta = await getEstadisticas()
      setEstadisticas(esta)
    }
    data()
  }, [])
  console.log(estadisticas)
  return (
    <main className='container-md mt-5 mb-5'>
        <div className='d-md-flex justify-content-between '>
            <CardsAdminInfo 
            clase={"bi bi-check-circle"} 
            num={estadisticas.nocerrados} 
            tipo={"Resueltos"} 
            id={1}
            />
            <CardsAdminInfo 
            clase={"bi bi-clock-history"} 
            num={estadisticas.noprogreso} 
            tipo={"En progreso"} 
            id={2}
            />
            <CardsAdminInfo 
            clase={"bi bi-chat-right-text"} 
            num={estadisticas.noabiertos} 
            tipo={"Abiertos"}
            id={3}
            />
        </div>
        <div className='d-lg-flex gap-3 mt-5'>
            <EmpleadosTablaAdmin/>
            <HistorialTablaAdmin/>
        </div>
    </main>
  )
}

export default AdminDashboard