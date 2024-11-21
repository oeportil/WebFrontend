import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../images/Potologo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  let tipo = 0;
  let nombre = "";
  if (localStorage.getItem("userData") != null) {
    const usuario = JSON.parse(localStorage.getItem("userData"));
    tipo = usuario.rol.idRol;
    nombre = usuario.nombre;
  }

  const handleCloseSesion = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-azulOscuro navbar">
        <Container>
          <Navbar.Brand className="text-white">
            <img src={Logo} alt="" height={70} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="navbar__flex">
              <Nav.Item className="text-white">
                <Link to={"/dashboard/user"} className="text-decoration-none">
                  Crear Ticket
                </Link>
              </Nav.Item>
              {tipo != 1 && (
                <Nav.Item className="text-white">
                  <Link
                    to={"/dashboard/employee/tickets"}
                    className="text-decoration-none"
                  >
                    Tickets
                  </Link>
                </Nav.Item>
              )}
              {tipo == 3 && (
                <Nav.Item className="text-white">
                  <Link
                    to={"/dashboard/admin/usuarios"}
                    className="text-decoration-none"
                  >
                    Usuarios
                  </Link>
                </Nav.Item>
              )}
              {tipo === 3 && (
                <Nav.Item className="text-white">
                  <Link
                    to={"/dashboard/admin/asignacion"}
                    className="text-decoration-none"
                  >
                    Asignacion de Tickets
                  </Link>
                </Nav.Item>
              )}
              {tipo === 3 && (
                <Nav.Item className="text-white">
                  <Link
                    to={"/dashboard/admin/seguimiento"}
                    className="text-decoration-none"
                  >
                    Seguimiento
                  </Link>
                </Nav.Item>
              )}
              <NavDropdown
                title={nombre}
                id="basic-nav-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item onClick={handleCloseSesion}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
