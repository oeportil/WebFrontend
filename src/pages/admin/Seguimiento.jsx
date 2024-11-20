// src/pages/admin/Seguimiento.jsx

import { Container, Row, Col, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/seguimineto.css";
import AdminDashboard from "../AdminDashboard";
import { useEffect, useState } from "react";
import ModalDetalleTicket from "../../components/modales/ModalDetalleTicket";

const Seguimiento = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketID, setTicketID] = useState("");
  const [modalDetalle, setModalDetalle] = useState(false);
  const datosTHead = [
    "Id",
    "Servicio",
    "Cliente",
    "Empleado",
    "Correo",
    "Fecha",
    "Acciones",
  ];
  const [selectedFilter, setSelectedFilter] = useState(1);
  const { tipo } = JSON.parse(localStorage.getItem("userData"));

  // Manejador para cuando cambia el valor del radio button
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };
  //llamando los tickets filtrados
  useEffect(() => {
    const url = `${
      import.meta.env.VITE_API_URL
    }/tickets/ObtenerPorFiltro/${selectedFilter}`;
    try {
      const FilteredTicektsCall = async () => {
        const result = await fetch(url);
        const filteredResult = await result.json();
        setTickets(filteredResult);
      };
      FilteredTicektsCall();
    } catch (error) {
      console.error("Ocurrio el siguiente error:" + error);
    }
  }, [selectedFilter]);

  return (
    <>
      <AdminDashboard />
      <Container>
        <Row className="my-4">
          <Col>
            <div className="filters-header">INFORMES</div>
            <div className="filters-container">
              <div className="filters-subheader">FILTROS:</div>
              <div className="filters-options">
                <div className="form-check">
                  <Form.Check
                    inline
                    label="Categoria"
                    name="filterGroup"
                    type="radio"
                    id="filter-category"
                    value={1}
                    onChange={handleFilterChange}
                    checked={selectedFilter === 1 ? true : false}
                  />
                </div>
                <div className="form-check">
                  <Form.Check
                    inline
                    label="Fechas"
                    name="filterGroup"
                    type="radio"
                    id="filter-dates"
                    value={2}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="form-check">
                  <Form.Check
                    inline
                    label="Encargado"
                    name="filterGroup"
                    type="radio"
                    id="filter-employee"
                    value={3}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="form-check">
                  <Form.Check
                    inline
                    label="Cliente"
                    name="filterGroup"
                    type="radio"
                    id="filter-client"
                    value={4}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="table-container">
            <div
              style={{
                width: "100%",
                height: "45vh",
                overflowY: "auto",
                marginBottom: "1rem",
              }}
            >
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    {datosTHead.map((dato, i) => (
                      <th key={i}>{dato}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.id}</td>
                      <td>{ticket.servicio}</td>
                      <td>{ticket.cliente}</td>
                      <td>{ticket.empleado}</td>
                      <td>{ticket.correo}</td>
                      <td>{ticket.fecha}</td>
                      <td>{ticket.estado}</td>
                      <button
                        className="border-0 bg-none d-flex gap-2 txt_azul"
                        onClick={() => {
                          setModalDetalle(true);
                          setTicketID(ticket.id);
                        }}
                      >
                        {" "}
                        Ver ticket
                      </button>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <ModalDetalleTicket
              show={modalDetalle}
              idTicket={ticketID}
              tipo={tipo}
              onHide={() => setModalDetalle(false)}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Seguimiento;
