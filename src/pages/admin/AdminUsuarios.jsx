import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useState } from 'react';
import ModalCrearUsuario from '../../components/modales/ModalCrearUsuario';
import '../../styles/userAdmin.css';
import  Table  from 'react-bootstrap/Table'
import { getTecnicos } from '../../controllers/UsuariosControllers';

const Usuarios = () => {
  const [modalShow, setModalShow] = useState(false);
  const[Tecnicos, setTecnicos] = useState([])
  const[selected, setSelected] = useState({})
  useEffect(() => {
    const data = async()=>{
      const tec = await getTecnicos()
      setTecnicos(tec)
    } 
    data()
  }, [])
  function crearUser() {
    setSelected({})
    setModalShow(true)
  }
 
  return (
    <main className='container my-4'>
        <Form.Select className='select' aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>

        <div className='p-2 border rounded my-2'>
          <div className='my-3 d-md-flex justify-content-between align-items-center'>
              <InputGroup className="mb-3 buscar">
                <Form.Control
                  placeholder="Buscar por correo"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                  Filtrar <i className="bi bi-arrow-right"></i>
                </Button>
              </InputGroup>

            <Button className='Au__boton' onClick={() => crearUser()}>
              Agregar Usuario
            </Button>
            <ModalCrearUsuario
              show={modalShow}
              onHide={() => setModalShow(false)}
              usuario={selected}
            />
          </div>
          {Tecnicos.length != 0 ? <Table responsive="md">
            <thead>
                <tr>
                    <th >
                        Nombre
                    </th >
                    <th  >
                        Telefono
                    </th>
                    <th  >
                        Correo
                    </th>
                </tr>
            </thead>
            <tbody>
              {Tecnicos.map(tecnico => (
                <tr key={tecnico.id_usuario}>
                    <td>{tecnico.nombre}</td>
                    <td>{tecnico.telefono}</td>
                    <td>{tecnico.email}</td>
                    <td>
                      <button onClick={() => editarUsuario(tecnico)} className='nada'>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </td>
                </tr>
                
              ))}   
            </tbody>
          </Table>: <div>No Hay Usuarios Disponibles</div>}
        </div>
    </main>
  )
  function editarUsuario(tecnico){
    setModalShow(true)
    setSelected(tecnico)
  }
}

export default Usuarios