import Card from 'react-bootstrap/Card';

const CardsNotiTickets = () => {
  return (
    <Card className='my-3'>
        <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">generado por y fecha</Card.Subtitle>
        <div className='d-md-flex justify-content-between '>
            <Card.Text>Descripcion</Card.Text>
            <Card.Text>Si Hay archivo</Card.Text>
        </div>
        </Card.Body>
    </Card>
  )
}

export default CardsNotiTickets