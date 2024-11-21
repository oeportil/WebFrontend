import Card from "react-bootstrap/Card";
import { convertirUrlFirebase } from "../../helpers/Fireurl";

const CardsNotiTickets = ({ notificacion }) => {
  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          {notificacion.remitente} - {notificacion.fecha}
        </Card.Subtitle>
        <div className="d-md-flex justify-content-between ">
          <Card.Text>{notificacion.dato}</Card.Text>
          <Card.Text>
            {notificacion.urlArchivo != null ? (
              <a
                href={convertirUrlFirebase(notificacion.urlArchivo)}
                target="_blank"
              >
                Ver Archivo Enviado
              </a>
            ) : (
              ""
            )}
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardsNotiTickets;
