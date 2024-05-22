import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



const ModalCrearUsuario = (props) => {
  return (
    <Modal
    {...props}
    size="xl"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        <h4 className='text-center'> Creacion de Usuario</h4>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
           <div className='grid_modal_3'>
            <div className='mb-3'>
                <Form.Label htmlFor="Nombre">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  id="Nombre"
                  aria-describedby="nombreHelpBlock"
                  className='rounded-5 border-dark'
                />
              </div>
              <div className='mb-3'> 
                <Form.Label htmlFor="Apellido">Apellido</Form.Label>
                <Form.Control
                  type="text"
                  id="Apellido"
                  aria-describedby="apellidoHelpBlock"
                  className='rounded-5 border-dark'
                />
              </div>
              <div className='mb-3'>
                <Form.Label htmlFor="Telefono">Telefono</Form.Label>
                <Form.Control
                  type="tel"
                  id="Telefono"
                  aria-describedby="telefonoHelpBlock"
                  className='rounded-5 border-dark'
                />
              </div>
           </div>
           <div className='grid_modal_2'>
              <div className='mb-3'>
              <Form.Label htmlFor="Rol">Rol</Form.Label>
              <Form.Select className='rounded-5 border-dark' aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
              </Form.Select>
              </div>
              <div className='mb-3'>
                <Form.Label htmlFor="telContact">Telefono Contacto</Form.Label>
                <Form.Control
                  type="tel"
                  id="telContact"
                  aria-describedby="telContactHelpBlock"
                  className='rounded-5 border-dark'
                />
              </div>
              <div className='mb-3'>
                <Form.Label htmlFor="Correo">Correo</Form.Label>
                <Form.Control
                  type="email"
                  id="Correo"
                  aria-describedby="CorreoHelpBlock"
                  className='rounded-5 border-dark'
                />
              </div>
              <div className='mb-3'> 
                <Form.Label htmlFor="Password">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  id="Password"
                  aria-describedby="PasswordHelpBlock"
                  className='rounded-5 border-dark'
                />
              </div>
           </div>
        </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Crear Usuario</Button>
    </Modal.Footer>
  </Modal>

  )
}

export default ModalCrearUsuario