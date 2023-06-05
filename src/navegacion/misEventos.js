import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Sidebar from "./SidebarT";
import Layout from "./Layout";
import moment from 'moment';

const EventsPanel = () => {
  const [data, setApiData] = useState([]);
  const idUser = localStorage.getItem('idUsuario');


  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apePat, setApePat] = useState("");
  const [apeMat, setApeMat] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaNac, SetfechaNac] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("idUsuario"));
    setNombre(localStorage.getItem("nombre"));
    setApePat(localStorage.getItem("apePat"));
    setApeMat(localStorage.getItem("apeMat"));
    setCorreo(localStorage.getItem("correo"));
    SetfechaNac(localStorage.getItem("fechaNac"));
    setTelefono(localStorage.getItem("telefono"));
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`https://ticketback.herokuapp.com/eventos/usuario/${idUser}`)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  };

  const formatDate = (date) => {
    return moment(date).format('DD-MM-YYYY'); // Formatear la fecha usando moment.js
  };

  if (
    nombre == null ||
    apePat == null ||
    apeMat == null ||
    correo == null ||
    fechaNac == null
  ) {
    navigate("*");
  } 

  return (
    <>
      <Layout />
      <Sidebar />
      <Container fluid>
        <Row>
          <Col sm={3}></Col>
          <Col sm={9}>
            <br />
            <Typography variant="h3" gutterBottom>
              Mis eventos
            </Typography>
            <Row>
              {data.map((event, index) => (
                <Col key={index} lg={4} md={6} sm={12} className="mb-4">
                  <Card>
                    <CardHeader title={event.nombre} subheader={formatDate(event.fecha)} />
                    <CardContent>
                      <Typography variant="body3" component="h6">
                        {'Ciudad del evento: '}{event.ciudad}
                      </Typography>
                    </CardContent>
                    {/* <CardActions>
                      <Button size="small">Ver detalles</Button>
                    </CardActions> */}
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
