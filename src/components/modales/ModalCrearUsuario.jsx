import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUsuario, getRoles, updateUsuario } from '../../controllers/UsuariosControllers';



const ModalCrearUsuario = (props) => {
  const[usuario, setUsuario] = useState({})
  const[rol, setRol] = useState([])
  useEffect(() => {
    const data = async() => {
      const rickrol = await getRoles()
      setRol(rickrol)
    }
    data()
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
                  <option disabled selected defaultValue={""}>-- Seleccione Rol --</option>
                  {rol.map( r => (
                     <option key={r.id_rol} value={r.id_rol} selected={Object.keys(props.usuario).length != 0 && props.usuario.id_rol == r.id_rol}>{r.nombre}</option>
                  ))}
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
  async function crearUsuario() {
    for (let index = 0; index < Object.keys(usuario).length; index++) {
      if(Object.values(usuario)[index].length == ''){
        toast.error("Debe de llenar Todos los Campos");
        return
      }      
    }
    const newUser = {
      Nombre: usuario.nom,
      Apellido: usuario.ape,
      Telefono: usuario.telefono,
      Email: usuario.email,
      Contrasena: usuario.password,
      TelContacto: usuario.contacto,
      IdRol: parseInt(usuario.id_rol)
    }
    if(newUser.Telefono === newUser.TelContacto){
      toast.error("Los telefonos deben de ser distintos");
      return
    }
    const exito = await createUsuario(newUser)
    if(typeof exito != 'number' ){
      toast.success("Usuario Creado");
      setTimeout(() => {
        props.onHide();
        window.location.reload()
      }, 1500);
    } else {
      toast.error("Error Inesperado, Intente mas tarde");
      return
    }   
  }

  async function editarUsuario() {
    console.log(usuario)
    if(usuario.telefono === usuario.contacto){
      toast.error("Los telefonos deben de ser distintos");
      return
    }
    const EditUser = {
      Nombre: usuario.nom,
      Apellido: usuario.ape,
      Telefono: usuario.telefono,
      Email: usuario.email,
      Contrasena: "",
      TelContacto: usuario.contacto,
      IdRol: usuario.id_rol
    }
    if(usuario.password == undefined){
      EditUser.Contrasena = null
    } else {
      EditUser.Contrasena = usuario.password
    }

    const exito = await updateUsuario(EditUser, usuario.id_usuario)
    if(exito == 200 ){
      toast.success("Usuario Editado Correctamente");
      setTimeout(() => {
        props.onHide();
        window.location.reload()
      }, 1500);
    } else {
      toast.error("Error Inesperado, Intente mas tarde");
      return
    }   
  }
  function cerrarModal() {
    props.onHide()
  }
}


export default ModalCrearUsuario