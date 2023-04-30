import "../navegacion/css/misBoletos.scss";
import { Container, Row, Col } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Sidebar from "./SidebarT";
import Layout from "./Layout";

const misBoletos = () => {
  const events = [
    {
      numero: "1",
      name: "Evento 1",
      date: "12/05/2023",
      location: "Ciudad 1",
      number: "4356",
      hora: "10:00 p.m.",
    },
    {
      numero: "2",
      name: "Evento 2",
      date: "15/06/2023",
      location: "Ciudad 2",
      number: "4356",
      hora: "08:00 p.m.",
    },
    {
      numero: "3",
      name: "Evento 3",
      date: "22/07/2023",
      location: "Ciudad 3",
      number: "4356",
      hora: "01:00 p.m.",
    },
    {
      numero: "4",
      name: "Evento 4",
      date: "10/08/2023",
      location: "Ciudad 4",
      number: "4356",
      hora: "07:00 p.m.",
    },
  ];

  return (
    <>
      <Layout />
      <Sidebar />
      <Container fluid>
        <Row>
          <Col sm={2}></Col>
          <Col sm={9}>
            <br />
            <Typography variant="h3" gutterBottom>
              Mis Boletos
            </Typography>
            <Row>
              {events.map((event, index) => (
                <div className="ticket">
                  <div className="stub">
                    <div className="top">
                      <span className="admit">Boleto</span>
                      <span className="line"></span>
                      <span className="num">Num Boleto: {event.number}</span>
                    </div>
                    <div className="number">{event.numero}</div>
                  </div>
                  <div className="check">
                    <div className="big">{event.name}</div>
                    {/* <div className="number">#1</div> */}
                    <div className="info">
                      <section>
                        <div className="title">Date</div>
                        <div>{event.date}</div>
                      </section>
                      <section>
                        <div className="title">Hora:</div>
                        <div>{event.hora}</div>
                      </section>
                      <section>
                        <div className="title">Lugar:</div>
                        <div>{event.location}</div>
                      </section>
                    </div>
                  </div>
                </div>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default misBoletos;
