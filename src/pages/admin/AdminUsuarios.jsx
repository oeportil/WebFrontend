import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";
import ModalCrearUsuario from "../../components/modales/ModalCrearUsuario";
import "../../styles/userAdmin.css";
import Table from "react-bootstrap/Table";
import {
  getRoles,
  getTecnicos,
  getTecnicosByEmail,
} from "../../controllers/UsuariosControllers";

const Usuarios = () => {
  const [modalShow, setModalShow] = useState(false);
  const [Tecnicos, setTecnicos] = useState([]);
  const [selected, setSelected] = useState({});
  const [rol, setRol] = useState([]);
  const [email, setEmail] = useState("");
  const[rselected, setRselected] = useState(2);
  useEffect(() => {
    const data = async () => {
      const tec = await getTecnicos(2);
      setTecnicos(tec);
    };
    data();

    const datar = async () => {
      const rickrol = await getRoles();
      setRol(rickrol);
    };
    datar();
  }, []);

  function crearUser() {
    setSelected({});
    setModalShow(true);
  }
  async function filtrarEmail() {
    console.log(rselected)
    const tec = await getTecnicos(rselected, email);
    setTecnicos(tec);
  }
  async function handleChange(e) {
    setRselected(parseInt(e.target.value))
    const tec = await getTecnicos(parseInt(e.target.value))
    setTecnicos(tec)
  }
  return (
    <main className="container my-4">
      <Form.Select
        className="select"
        aria-label="Default select example"
        name="id_rol"
        onChange={handleChange}
        defaultValue={2}
      >
        {rol.map((r) => (
          <option key={r.id_rol} value={r.id_rol} selected={ 2 == r.id_rol}>
            {r.nombre}
          </option>
        ))}
      </Form.Select>

      <div className="p-2 border rounded my-2">
        <div className="my-3 d-md-flex justify-content-between align-items-center">
          <InputGroup className="mb-3 buscar">
            <Form.Control
              type="email"
              placeholder="Buscar por correo"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={filtrarEmail}
              variant="outline-secondary"
              id="button-addon2"
            >
              Filtrar <i className="bi bi-arrow-right"></i>
            </Button>
          </InputGroup>

          <Button className="Au__boton" onClick={() => crearUser()}>
            Agregar Usuario
          </Button>
          <ModalCrearUsuario
            show={modalShow}
            onHide={() => setModalShow(false)}
            usuario={selected}
          />
        </div>
        {Tecnicos.length != 0 ? (
          <Table responsive="md">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              {Tecnicos.map((tecnico) => (
                <tr key={tecnico.id_usuario}>
                  <td>{tecnico.nombre}</td>
                  <td>{tecnico.telefono}</td>
                  <td>{tecnico.email}</td>
                  <td>
                    <button
                      onClick={() => editarUsuario(tecnico)}
                      className="nada"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div>No Hay Usuarios Disponibles</div>
        )}
      </div>
    </main>
  );
  function editarUsuario(tecnico) {
    setModalShow(true);
    setSelected(tecnico);
  }
};

export default Usuarios;
