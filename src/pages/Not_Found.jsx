import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col, Alert, Badge } from "react-bootstrap";

const Not_Found = () => {
  const { pathname } = useLocation();
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1>
            Error <Badge bg="danger">404</Badge>
          </h1>
          <Alert variant="danger" className="text-center mt-5 mb-5">
            <h2>¿Acaso Intentas Buscar Algo?</h2>
            <p>
              Página no encontrada: <code>{pathname}</code>
            </p>
          </Alert>
          <Link to={"/"}>Regresar a Login</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Not_Found;
