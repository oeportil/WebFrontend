import { Col, Container, Row, Table } from "react-bootstrap";
import imgDashborad from "../images/imgdashboard.png";

import { Link } from "react-router-dom";
import { useState } from "react";
import ModalCrearTicket from "../components/modales/ModalCrearTicket";

const Dashboard = () => {
  const [modalShow, setModalShow] = useState(false);
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
            <Table striped bordered hover className="text-center">
              <thead>
                <tr className="">
                  {theadContent.map((content) => (
                    <th key={content} style={{ backgroundColor: "#99ACFF" }}>
                      {content}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <section className=""></section>
    </>
  );
};

export default Dashboard;
