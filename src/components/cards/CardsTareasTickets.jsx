import Card from 'react-bootstrap/Card';

const CardsTareasTickets = ({tarea}) => {
  return (
    <Card className='my-3' style={{ width: '100%' }}>
    <Card.Body>
      <Card.Title>{tarea.nombre}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Prioridad {tarea.prioridad}</Card.Subtitle>
        <div className='grid_modal_2'>
            <div className='mb-1'>
                <Card.Subtitle>Descripcion: </Card.Subtitle>
                <Card.Text>
                  {tarea.info}
                </Card.Text>    
            </div>
            <hr className='d-md-none'/>
            <div className='mb-1'>
                <Card.Subtitle>Estado: </Card.Subtitle>
                <Card.Text>
                  {tarea.estado}
                </Card.Text>
            </div>
        </div> 
    </Card.Body>
    <Card.Footer>
        Asignada a: {tarea.encargado} 
    </Card.Footer>
  </Card>
  )
}

export default CardsTareasTickets