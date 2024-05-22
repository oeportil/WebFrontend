import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import ModalInfoTickets from '../modales/ModalInfoTickets';

//, num, tipo, link
const CardsAdminInfo = ({clase, num, tipo}) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Card className='m-2 w-100'>
        <Card.Body className='d-flex justify-content-between align-items-center  '>
            <p className={`${clase} fs-1 mx-4`}></p>
            <div className='d-flex flex-column align-items-center'>
                <h4>{num}</h4>
                <h5>Tickets {tipo}</h5>
                <button className='border-0 bg-none txt_azul' onClick={() => setModalShow(true)}>
                  Ver
                </button> 
                <ModalInfoTickets
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  titulo={tipo}
                />           
            </div>
        </Card.Body>
    </Card>
  )
}

export default CardsAdminInfo