// src/pages/admin/Seguimiento.jsx

import React from 'react';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/seguimineto.css';

const Seguimiento = () => {
  return (
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
                />
              </div>
              <div className="form-check">
                <Form.Check
                  inline
                  label="Fechas"
                  name="filterGroup"
                  type="radio"
                  id="filter-dates"
                />
              </div>
              <div className="form-check">
                <Form.Check
                  inline
                  label="Encargado"
                  name="filterGroup"
                  type="radio"
                  id="filter-employee"
                />
              </div>
              <div className="form-check">
                <Form.Check
                  inline
                  label="Cliente"
                  name="filterGroup"
                  type="radio"
                  id="filter-client"
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="table-container">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Servicio</th>
                <th>Cliente</th>
                <th>Empleado</th>
                <th>Correo</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>103</td>
                <td>Pot1 Blackgarden</td>
                <td>Carlos Fuentes</td>
                <td>Bryan Cortez</td>
                <td>carfuen@gmail.com</td>
                <td>14/5/2024</td>
                <td><a href="#">Ver ticket</a></td>
              </tr>
              <tr>
                <td>105</td>
                <td>Pot1 Sunphower</td>
                <td>Carlos Fuentes</td>
                <td>Oscar Tejada</td>
                <td>carfuen@gmail.com</td>
                <td>16/5/2024</td>
                <td><a href="#">Ver ticket</a></td>
              </tr>
              <tr>
                <td>111</td>
                <td>Pot1 Roserender</td>
                <td>Carlos Fuentes</td>
                <td>José Portillo</td>
                <td>carfuen@gmail.com</td>
                <td>19/5/2024</td>
                <td><a href="#">Ver ticket</a></td>
              </tr>
              <tr>
                <td>112</td>
                <td>Pot1 Roserender</td>
                <td>Carlos Fuentes</td>
                <td>Andy Saravia</td>
                <td>carfuen@gmail.com</td>
                <td>19/5/2024</td>
                <td><a href="#">Ver ticket</a></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Seguimiento;
