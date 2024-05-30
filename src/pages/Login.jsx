import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Image } from "react-bootstrap";
import Logo from "../images/Potologo.png";
import Button from "react-bootstrap/Button";
import "../styles/login.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    correo: "",
    contrasena: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // Configuración de la solicitud POST
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correo: user.correo,
        contrasena: user.contrasena,
      }),
    };

    // Envío de los datos del usuario al servidor
    const url = `${import.meta.env.VITE_API_URL}/Usuarios/Login`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/dashboard/user");
      })
      .catch((error) => {
        toast.error("Error al enviar los datos:", error);
      });
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login_layout">
      <Card className="login_card p-4">
        <ToastContainer
          autoClose={1500}
          transition:Slide
          hideProgressBar
          theme="colored"
        />
        <Image src={Logo} width={150} className="mx-auto" />
        <h3 className="text-center">Soporte Tecnico</h3>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="correo"
              placeholder="name@example.com"
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              name="contrasena"
              placeholder="Password"
              onChange={handleChange}
            />
          </FloatingLabel>
          <Button type="submit" className="mt-3 w-100">
            Entrar
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
