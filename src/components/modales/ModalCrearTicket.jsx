import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalCrearTicket = (props) => {
  const stylesP = {
    padding: "10px",
    border: "solid rgb(222,226,230) 1px",
    borderRadius: "12px",
  };
  //aca estoy extrayendo los datos del localeStorage
  const userDataString = JSON.parse(localStorage.getItem("userData"));
  const handleSubmit = (e) => {
    e.preventDefault();
    //aca se crea el formData
    const formData = new FormData();

    // Agregando los campos del formulario al objeto FormData
    formData.append("descripcion", e.target.elements.descripcion.value);
    formData.append("servicio", e.target.elements.servicio.value);
    formData.append("archivo", e.target.elements.archivo.files[0]);
    formData.append("prioridad", e.target.elements.prioridad.value);
    formData.append("id_cliente", userDataString.id_usuario);

    const camposRequeridos = [
      "descripcion",
      "servicio",
      "prioridad",
      "id_cliente",
    ];
    const faltanCampos = [];
    camposRequeridos.forEach((campo) => {
      if (!formData.has(campo) || formData.get(campo) === "") {
        faltanCampos.push(campo);
      }
    });
    if (faltanCampos.length > 0) {
      toast.error(`Faltan los siguientes campos: ${faltanCampos.join(", ")}`);

      return;
    }

    const url = `${import.meta.env.VITE_API_URL}/Ticket/CrearTicket`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        toast.success("Ticket creado con éxito");
        setTimeout(() => {
          props.onHide();
          window.location.reload();
        }, 1500);
      })
      .catch(() => {
        toast.error("El ticket no pudo crearse");
      });
  };
  const optionsPrority = ["BAJA", "NORMAL", "IMPORTANTE", "CRÍTICA"];

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Crear de Ticket
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="row"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="col-lg">
            <h5 className="text-uppercase fw-semibold">
              Descripcion del Ticket
            </h5>
            <Form.Group className="mb-3" controlId="servicio">
              <Form.Label>Nombre de la Aplicacion o Servicio</Form.Label>
              <Form.Control placeholder="..." required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="descripcion">
              <Form.Label>Descripcion del Problema</Form.Label>
              <Form.Control
                as="textarea"
                height={50}
                placeholder="..."
                required
              />
            </Form.Group>
            <div>
              <Form.Group className="mb-3" controlId="archivo">
                <Form.Control type="file" placeholder="..." />
              </Form.Group>
              <Form.Group className="mb-3" controlId="prioridad">
                <Form.Select
                  className="w-100"
                  defaultValue="Choose..."
                  required
                >
                  {optionsPrority.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <p>
              Si desea enviar mas de un archivo, seleccione una carpeta
              comprimida
            </p>
          </div>
          <div className="col-lg">
            <h5 className="text-uppercase fw-semibold">Datos de Usuario</h5>
            <p>Nombre:</p>
            <p style={stylesP}>{userDataString.nombre}</p>
            <p>Correo:</p>
            <p style={stylesP}>{userDataString.email}</p>
            <p>Teléfono</p>
            <p style={stylesP}>{userDataString.telefono}</p>
            <Form.Control
              type="submit"
              value={"Enviar Ticket"}
              className="bg-azulOscuro text-white"
            />
            <ToastContainer
              autoClose={1500}
              transition:Slide
              hideProgressBar
              theme="colored"
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCrearTicket;
