import React from 'react'
import CardsAdminInfo from '../components/cards/CardsAdminInfo'
import EmpleadosTablaAdmin from '../components/tables/EmpleadosTablaAdmin'
import HistorialTablaAdmin from '../components/tables/HistorialTablaAdmin'

const AdminDashboard = () => {
  return (
    <main className='container-md mt-5 mb-5'>
        <div className='d-md-flex justify-content-between '>
            <CardsAdminInfo 
            clase={"bi bi-check-circle"} 
            num={23} 
            tipo={"Resueltos"} />
            <CardsAdminInfo 
            clase={"bi bi-clock-history"} 
            num={50} 
            tipo={"En progreso"} />
            <CardsAdminInfo 
            clase={"bi bi-chat-right-text"} 
            num={23} 
            tipo={"Abiertos"}/>
        </div>
        <div className='d-lg-flex gap-3 mt-5'>
            <EmpleadosTablaAdmin/>
            <HistorialTablaAdmin/>
        </div>
    </main>
  )
}

export default AdminDashboard