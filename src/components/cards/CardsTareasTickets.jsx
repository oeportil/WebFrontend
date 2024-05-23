import Card from 'react-bootstrap/Card';

const CardsTareasTickets = () => {
  return (
    <Card className='my-3' style={{ width: '100%' }}>
    <Card.Body>
      <Card.Title>Titulo de Tarea</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Prioridad Normal</Card.Subtitle>
        <div className='grid_modal_2'>
            <div className='mb-1'>
                <Card.Subtitle>Descripcion: </Card.Subtitle>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>    
            </div>
            <hr className='d-md-none'/>
            <div className='mb-1'>
                <Card.Subtitle>Estado: </Card.Subtitle>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
            </div>
        </div> 
    </Card.Body>
    <Card.Footer>
        Asignada a: 
    </Card.Footer>
  </Card>
  )
}

export default CardsTareasTickets