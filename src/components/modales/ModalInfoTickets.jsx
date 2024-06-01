
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TablaInfoTickets from '../tables/TablaInfoTickets';
import { useState } from 'react';


const ModalInfoTickets = (props) => {
  const[fechas, setFechas] = useState({inicio: "", fin: ""})
  const[tickets, setTickets] = useState([])
  console.log(props.tipo)

  const handleChange = e =>{
    setFechas({...fechas, [e.target.name]: e.target.value })
  }
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Tickets {props.titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-md-flex gap-2 align-items-center mx-auto'>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Inicio:</InputGroup.Text>
                <Form.Control
                placeholder="fecha_ini"
                aria-label="fecha_ini"
                type='date'
                name="inicio"
                value={fechas.inicio}
                onChange={handleChange}
                aria-describedby="basic-addon1"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Fin:</InputGroup.Text>
                <Form.Control
                placeholder="fecha_fin"
                aria-label="fecha_fin"
                type='date'
                name='fin'
                value={fechas.fin}
                onChange={handleChange}
                aria-describedby="basic-addon1"
                />
            </InputGroup>
            <button onClick={filtrar} className="border-0 bg-none d-flex gap-2 txt_azul w-100"  >
                <p>Filtrar</p> <i className="bi bi-arrow-right mt-1"></i>
            </button>
        </div>
        {tickets.length != 0 ? <TablaInfoTickets/>: <div>Debe de Seleccionar Fechas o No hay Tickets {props.titulo} aún</div>}
      </Modal.Body>
    </Modal>
  )

  function filtrar(){
    console.log(fechas)
  }
}

export default ModalInfoTickets