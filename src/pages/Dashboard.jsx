import { Col, Container, Row, Table } from "react-bootstrap";
import imgDashborad from "../images/imgdashboard.png";

import { useEffect, useState } from "react";
import ModalCrearTicket from "../components/modales/ModalCrearTicket";
import ModalDetalleTicket from "../components/modales/ModalDetalleTicket";
import { formatDate } from "../helpers/FechaFormater";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketID, setTicketID] = useState("");
  console.log(tickets);
  //aca se llama a la API
  const { idUsuario, tipo } = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    const APIRequest = async () => {
      //ahorita es estatico para probar
      const url = `${
        import.meta.env.VITE_API_URL
      }/tickets/ObtenerPorCliente/${idUsuario}`;
      const APIAnswer = await fetch(url);
      if (APIAnswer.status !== 404) {
        const data = await APIAnswer.json();
        setTickets(data);
      } else {
        setTickets([]);
      }
    };
    //llamando la función
    APIRequest();
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [modalDetalle, setModalDetalle] = useState(false);
  const theadContent = ["ID", "Servicio", "Fecha", "Estado"];
  return (
    <>
      <Container>
        <Row>
          <Col sm={12} md={6} className="text-center">
            <img src={imgDashborad} alt="imagen principal" />
          </Col>
          <Col sm={12} md={6}>
            {" "}
            <h1 className="mt-5 mb-5 text-center">Soporte Técnico</h1>
            <p>
              Bienvenido a nuestra empresa de soporte técnico de IT, donde nos
              comprometemos a ser tu aliado confiable en el complejo mundo de la
              tecnología. Nuestro equipo de expertos está aquí para resolver tus
              desafíos informáticos con soluciones rápidas y efectivas.
            </p>
            <button
              onClick={() => setModalShow(true)}
              style={{
                textDecoration: "none",
                color: "#656C95",
                fontSize: "1.3rem",
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
              }}
            >
              Crear nuevo ticket
              <i className="bi bi-arrow-right fs-1 mx-2"></i>{" "}
            </button>
            <ModalCrearTicket
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <h2 className="text-center mt-5 mb-4">Mis Tickets</h2>
            {tickets.length !== 0 ? (
              <div
                style={{
                  width: "100%",
                  height: "35vh",
                  overflowY: "auto",
                  marginBottom: "1rem",
                }}
              >
                <Table striped bordered hover className="text-center">
                  <thead>
                    <tr className="">
                      {theadContent.map((content) => (
                        <th
                          key={content}
                          style={{ backgroundColor: "#99ACFF" }}
                        >
                          {content}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr
                        key={ticket.Id}
                        onClick={() => {
                          setModalDetalle(true);
                          setTicketID(ticket.id);
                        }}
                      >
                        <td>{ticket.Id}</td>
                        <td>{ticket.Servicio}</td>
                        <td>{formatDate(ticket.FechaDate)}</td>
                        <td>{ticket.Estado}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <ModalDetalleTicket
                  show={modalDetalle}
                  idTicket={ticketID}
                  tipoUser={tipo}
                  onHide={() => setModalDetalle(false)}
                />
              </div>
            ) : (
              <div className="text-center">
                {" "}
                <h4 className="text-dark-emphasis">
                  No hay Tickets que mostrar
                </h4>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <section className=""></section>
    </>
  );
};

export default Dashboard;
