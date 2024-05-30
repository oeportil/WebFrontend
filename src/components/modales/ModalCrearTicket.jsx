import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalCrearTicket = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (true) {
      toast.success("Ticket Creado Con exito");
      setTimeout(() => {
        props.onHide();
      }, 1500);
    } else {
      toast.error("El Ticket No pudo Crearse");
    }
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
        <Form className="row" onSubmit={handleSubmit}>
          <div className="col-lg">
            <h5 className="text-uppercase fw-semibold">
              Descripcion del Ticket
            </h5>
            <Form.Group className="mb-3" controlId="servicio">
              <Form.Label>Nombre de la Aplicacion o Servicio</Form.Label>
              <Form.Control placeholder="..." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="descripcion">
              <Form.Label>Descripcion del Problema</Form.Label>
              <Form.Control as="textarea" height={50} placeholder="..." />
            </Form.Group>
            <div>
              <Form.Group className="mb-3" controlId="archivo">
                <Form.Control type="file" placeholder="..." />
              </Form.Group>
              <Form.Group className="mb-3" controlId="prioridad">
                <Form.Select className="w-100" defaultValue="Choose...">
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
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control placeholder="..." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="correo">
              <Form.Label>Correo</Form.Label>
              <Form.Control placeholder="..." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="telefono">
              <Form.Label>Telefono</Form.Label>
              <Form.Control placeholder="..." />
            </Form.Group>
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
