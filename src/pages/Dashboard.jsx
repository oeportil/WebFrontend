import { Col, Container, Row } from "react-bootstrap";
import imgDashborad from "../images/imgdashboard.png";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <img src={imgDashborad} alt="imagen principal" />
          </Col>
          <Col>
            {" "}
            <h1>Soporte Técnico</h1>
            <p>
              Bienvenido a nuestra empresa de soporte técnico de IT, donde nos
              comprometemos a ser tu aliado confiable en el complejo mundo de la
              tecnología. Nuestro equipo de expertos está aquí para resolver tus
              desafíos informáticos con soluciones rápidas y efectivas.
            </p>
            <div>
              <Link to={"/"}>Crear nuevo ticket other </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
        </Row>
      </Container>
      <section className=""></section>
    </>
  );
};

export default Dashboard;
