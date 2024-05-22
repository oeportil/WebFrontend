import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import ModalCrearUsuario from '../../components/ModalCrearUsuario';
import '../../styles/userAdmin.css';
import  Table  from 'react-bootstrap/Table'

const Usuarios = () => {
  const [modalShow, setModalShow] = useState(false);
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
                  Filtrar <i class="bi bi-arrow-right"></i>
                </Button>
              </InputGroup>

            <Button className='Au__boton' onClick={() => setModalShow(true)}>
              Agregar Usuario
            </Button>
            <ModalCrearUsuario
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
          <Table responsive="md">
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
                <tr>
                    <td>Pedro</td>
                    <td>4856982</td>
                    <td>correo@correo.com</td>
                    <td>
                      <button className='nada'>
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button className='nada'>
                        <i class="bi bi-trash3"></i>
                      </button>
                    </td>
                </tr>
            </tbody>
        </Table>
        </div>
    </main>
  )
}

export default Usuarios