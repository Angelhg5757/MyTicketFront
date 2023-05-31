import "../navegacion/css/misBoletos.scss";
import { Container, Row, Col } from "react-bootstrap";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Sidebar from "./SidebarT";
import Layout from "./Layout";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

// estilos modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const MisBoletos = () => {
  let navigate = useNavigate();
  const [id, setId] = useState("");
  const [data, setApiData] = useState([]);
  const idUser = localStorage.getItem("idUsuario");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getData();
  }, []);

  
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

  const getData = () => {
    axios
      .get(`http://localhost:4000/boletosUsuario/${idUser}`)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  };

  const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY"); // Formatear la fecha usando moment.js
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
          <Col sm={7}>
            <br />
            <Typography variant="h3" gutterBottom>
              Mis Boletos
            </Typography>
            <Row>
              {data.map((event, index) => (
                <div className="ticket">
                  <div className="stub">
                    <div className="top">
                      <span className="admit">Boleto</span>
                      <span className="line"></span>
                      <span className="num">
                        Asiento: {event.numero}
                        {event.seccion}
                      </span>
                    </div>
                    <div className="number">
                      <img
                        src={event.imagen}
                        width={150}
                        style={{ borderRadius: 8 }}
                      />
                    </div>
                  </div>
                  <div className="check">
                    <div className="big">{event.eventos_nombre}</div>
                    {/* <div className="number">#1</div> */}
                    <div className="info">
                      <section>
                        <div className="title">Fecha:</div>
                        <div>{formatDate(event.fecha)}</div>
                      </section>
                      <section>
                        <div className="title">Lugar:</div>
                        <div>
                          {event.inmueble_nombre}
                          {", "}
                          {event.ciudad}
                        </div>
                      </section>
                      <section>
                        <div className="title">Precio:</div>
                        <div>
                          {"$"}
                          {event.precio}
                        </div>
                      </section>
                      <section>
                        <div className="title">
                          <button className="but" onClick={handleOpen}>
                            Detalle
                          </button>
                        </div>
                      </section>
                    </div>
                  </div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h4"
                        component="h2"
                      >
                        {event.eventos_nombre}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {event.descripcion}
                      </Typography>
                    </Box>
                  </Modal>
                </div>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MisBoletos;
