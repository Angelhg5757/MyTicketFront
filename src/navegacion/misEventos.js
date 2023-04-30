import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Sidebar from "./SidebarT";
import Layout from "./Layout";

const EventsPanel = () => {
  const events = [
    { name: "Evento 1", date: "12/05/2023", location: "Ciudad 1" },
    { name: "Evento 2", date: "15/06/2023", location: "Ciudad 2" },
    { name: "Evento 3", date: "22/07/2023", location: "Ciudad 3" },
    { name: "Evento 4", date: "10/08/2023", location: "Ciudad 4" },
    { name: "Evento 5", date: "18/09/2023", location: "Ciudad 5" },
  ];

  return (
    <>
      <Layout />
      <Sidebar />
      <Container fluid>
        <Row>
          <Col sm={2}></Col>
          <Col sm={9}>
            <br/>
            <Typography variant="h3" gutterBottom>
              Mis eventos
            </Typography>
            <Row>
              {events.map((event, index) => (
                <Col key={index} lg={4} md={6} sm={12} className="mb-4">
                  <Card>
                    <CardHeader title={event.name} subheader={event.date} />
                    <CardContent>
                      <Typography variant="body2" component="p">
                        {event.location}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">
                        Ver detalles
                      </Button>
                    </CardActions>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EventsPanel;