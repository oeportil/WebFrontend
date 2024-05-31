import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const ModalCrearUsuario = (props) => {
  const[usuario, setUsuario] = useState({})
  useEffect(() => {
    if(Object.keys(props.usuario).length != 0){
      setUsuario(props.usuario)
    } else {
      setUsuario({
        nom: "",
        ape: "",
        telefono: "",
        contacto: "",
        email: "",
        id_rol: ""
      })

    }
  }, [props.usuario])

  const handleChange = e =>{
   setUsuario({...usuario, [e.target.name]: e.target.value})
  }

  return (
    <Modal
    {...props}
    size="xl"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    
    <Modal.Header className='flex justify-content-between align-items-center'>
      <Modal.Title id="contained-modal-title-vcenter">
        <h4 className='text-center'>{Object.keys(props.usuario).length == 0 ? " Crear Usuario": "Editar Usuario" }</h4>
      </Modal.Title>
      <p className='fs-3 font-monospace text-dark-emphasis' type="button" onClick={cerrarModal}>x</p>
    </Modal.Header>
    <Modal.Body>
        <Form>
           <div className='grid_modal_3'>
            <div className='mb-3'>
                <Form.Label htmlFor="Nombre">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  id="Nombre"
                  value={usuario.nom}
                  onChange={handleChange}
                  name = "nom"
                  aria-describedby="nombreHelpBlock"
                  className='rounded-5 border-dark'
                  disabled={Object.keys(props.usuario).length != 0}
                />
              </div>
              <div className='mb-3'> 
                <Form.Label htmlFor="Apellido">Apellido</Form.Label>
                <Form.Control
                  type="text"
                  id="Apellido"
                  name = "ape"
                  value={usuario.ape}
                  onChange={handleChange}
                  aria-describedby="apellidoHelpBlock"
                  className='rounded-5 border-dark'
                  disabled={Object.keys(props.usuario).length != 0}
                />
              </div>
              <div className='mb-3'>
                <Form.Label htmlFor="Telefono">Telefono</Form.Label>
                <Form.Control
                  type="tel"
                  id="Telefono"
                  name = "telefono"
                  value={usuario.telefono}
                  onChange={handleChange}
                  aria-describedby="telefonoHelpBlock"
                  className='rounded-5 border-dark'
                />
              </div>
           </div>
           <div className='grid_modal_2'>
              <div className='mb-3'>
              <Form.Label htmlFor="Rol">Rol</Form.Label>
              <Form.Select className='rounded-5 border-dark' aria-label="Default select example" name="id_rol" onChange={handleChange}>
                  <option disabled selected>-- Seleccione Rol --</option>
                  <option value={1}>Cliente</option>
                  <option value={2}>Soporte</option>
                  <option value={3}>Administrador</option>
              </Form.Select>
              </div>
              <div className='mb-3'>
                <Form.Label htmlFor="telContact">Telefono Contacto</Form.Label>
                <Form.Control
                  type="tel"
                  id="telContact"
                  name = "contacto"
                  value={usuario.contacto}
                  onChange={handleChange}
                  aria-describedby="telContactHelpBlock"
                  className='rounded-5 border-dark'
                />
              </div>
              <div className='mb-3'>
                <Form.Label htmlFor="Correo">Correo</Form.Label>
                <Form.Control
                  type="email"
                  id="Correo"
                  value={usuario.email}
                  onChange={handleChange}
                  name = "email"
                  aria-describedby="CorreoHelpBlock"
                  className='rounded-5 border-dark'
                />
              </div>
              <div className='mb-3'> 
                <Form.Label htmlFor="Password">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  id="Password"
                  name = "password"
                  onChange={handleChange}
                  aria-describedby="PasswordHelpBlock"
                  className='rounded-5 border-dark'
                />
              </div>
           </div>
        </Form>
        <ToastContainer
              autoClose={2000}
              transition:Slide
              
              theme="colored"
            />
    </Modal.Body>
    <Modal.Footer>
     {Object.keys(props.usuario).length == 0 ? 
     <Button onClick={crearUsuario}>Crear Usuario</Button>
    : <Button onClick={editarUsuario}>Editar Usuario</Button>}
    </Modal.Footer>
  </Modal>

  )
  function crearUsuario() {
    console.log(usuario)
    for (let index = 0; index < Object.keys(usuario).length; index++) {
      if(Object.values(usuario)[index].length == ''){
        console.log("almenos un campo esta vacio")
        toast.error("Debe de llenar Todos los Campos");
        return
      }      
    }
    props.onHide()
  }
  function editarUsuario() {
    props.onHide()
  }
  function cerrarModal() {
    props.onHide()
  }
}


export default ModalCrearUsuario