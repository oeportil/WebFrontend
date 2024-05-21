import React from 'react'
import CardsAdminInfo from '../components/CardsAdminInfo'

const AdminDashboard = () => {
  return (
    <main className='container-md mt-5 mb-5'>
        <div className='d-md-flex justify-content-between '>
            <CardsAdminInfo 
            clase={"bi bi-check-circle"} 
            num={23} 
            tipo={"Resuelto"} />
            <CardsAdminInfo 
            clase={"bi bi-clock-history"} 
            num={50} 
            tipo={"En progreso"} />
            <CardsAdminInfo 
            clase={"bi bi-chat-right-text"} 
            num={23} 
            tipo={"Resuelto"} />
        </div>
    </main>
  )
}

export default AdminDashboard