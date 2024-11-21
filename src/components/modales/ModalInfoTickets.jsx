import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import TablaInfoTickets from "../tables/TablaInfoTickets";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTicketPorEstado } from "../../controllers/TicketsController";

const ModalInfoTickets = (props) => {
  const [fechas, setFechas] = useState({ inicio: Date, fin: Date });
  const [tickets, setTickets] = useState([]);

  const handleChange = (e) => {
    setFechas({ ...fechas, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const data = async () => {
      const exito = await getTicketPorEstado({ tipo: props.tipo });
      if (typeof exito != "number") {
        setTickets(exito);
      } else {
        setTickets([]);
      }
    };
    data();
  }, []);

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
        <div className="d-md-flex gap-2 align-items-center mx-auto">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Inicio:</InputGroup.Text>
            <Form.Control
              placeholder="fecha_ini"
              aria-label="fecha_ini"
              type="date"
              name="inicio"
              value={fechas.inicio}
              onChange={handleChange}
              aria-describedby="basic-addon1"
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Fin:</InputGroup.Text>
            <Form.Control
              placeholder="fecha_fin"
              aria-label="fecha_fin"
              type="date"
              name="fin"
              value={fechas.fin}
              onChange={handleChange}
              aria-describedby="basic-addon1"
              required
            />
          </InputGroup>
          <button
            onClick={filtrar}
            className="border-0 bg-none d-flex gap-2 txt_azul w-100"
          >
            <p>Filtrar</p> <i className="bi bi-arrow-right mt-1"></i>
          </button>
        </div>
        {tickets.length != 0 ? (
          <TablaInfoTickets tickets={tickets} />
        ) : (
          <div>
            Debe de Seleccionar Fechas o No hay Tickets {props.titulo} aún
          </div>
        )}
        <ToastContainer autoClose={2000} transition:Slide theme="colored" />
      </Modal.Body>
    </Modal>
  );

  async function filtrar() {
    let objeto = { tipo: props.tipo };
    if (fechas.inicio.length != 0) {
      const ini = new Date(fechas.inicio);
      objeto = { ...objeto, inicio: ini.toISOString() };
    }
    if (fechas.fin.length != 0) {
      const fi = new Date(fechas.fin);
      objeto = { ...objeto, fin: fi.toISOString() };
    }
    if (Date.parse(fechas.inicio) > Date.parse(fechas.fin)) {
      toast.error("Fecha de Inicio debe de ser menor a Fecha fin");
      return;
    }
    const exito = await getTicketPorEstado(objeto);
    if (typeof exito != "number") {
      setTickets(exito);
    } else {
      setTickets([]);
    }
  }
};

export default ModalInfoTickets;
