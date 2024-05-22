import React from 'react'
import Card from 'react-bootstrap/Card'

//, num, tipo, link
const CardsAdminInfo = ({clase, num, tipo}) => {
  return (
    <Card className='m-2 w-100'>
        <Card.Body className='d-flex justify-content-between align-items-center  '>
            <p className={`${clase} fs-1 mx-4`}></p>
            <div className='d-flex flex-column align-items-center'>
                <h4>{num}</h4>
                <h5>Tickets {tipo}</h5>
                //Aqui agregas el boton del modal
                
            </div>
        </Card.Body>
    </Card>
  )
}

export default CardsAdminInfo