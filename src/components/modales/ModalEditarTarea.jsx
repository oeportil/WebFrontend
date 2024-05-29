import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ModalEditarTarea = (props) => {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar Tarea
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <div className="grid_modal_2">
            <div className="mb-3">
              <Form.Label htmlFor="Encargado">Encargado</Form.Label>
              <Form.Control
                type="text"
                id="Encargado"
                aria-describedby="EncargadoHelpBlock"
                className="rounded-5 border-dark"
              />
            </div>
            <div className="mb-3">
              <Form.Label htmlFor="PrioridadTarea">Prioridad</Form.Label>
              <Form.Select
                className="rounded-5 border-dark"
                aria-label="Default select example"
              >
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="DescripcionTarea">Descripcion</Form.Label>
            <Form.Control
              as="textarea"
              id="DescripcionTarea"
              aria-describedby="DescripcionTareaHelpBlock"
              className="rounded-5 border-dark"
              style={{ height: "100px" }}
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="EstadoTarea">Estado</Form.Label>
            <Form.Control
              as="textarea"
              id="EstadoTarea"
              aria-describedby="EstadoTareaHelpBlock"
              className="rounded-5 border-dark"
              style={{ height: "100px" }}
            />
          </div>
          <div className="grid_modal_3">
            <Button className="mt-3 bg-cafe border-0 rounded-5 w-100">
              Rechazar Tarea
            </Button>
            <Button className="mt-3 bg-verde text-dark border-0 rounded-5 w-100">
              Finalizar Tarea
            </Button>
            <Button className="mt-3 bg-azulOscuro border-0 rounded-5 w-100">
              Editar Tarea
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditarTarea;
