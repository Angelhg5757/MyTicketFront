import React, { useEffect, useState } from "react";
import NavbarDashboard from '../navegacion/NavbarDashboard';
import Slidebar from '../navegacion/SidebarDashboard';
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import swal from "sweetalert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./css/usuariosT.css";

const Usuarios = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [apiData, setApiData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get(`http://localhost:9595/administrador/boletos/listar`)
      .then((getData) => {
        setApiData(getData.data);
      });
  }, []);

  const setData = (
    idUsuario,
    idAsientos,
    idSecciones,
    cantidad,
    costo_servicio,
    precioBoleto,
    total,
    idEventos
  ) => {
    localStorage.setItem("IdUsuario", idUsuario);
    localStorage.setItem("IdAsientos", idAsientos);
    localStorage.setItem("idSecciones", idSecciones);
    localStorage.setItem("cantidad", cantidad);
    localStorage.setItem("costo_servicio", costo_servicio);
    localStorage.setItem("precioBoleto", precioBoleto);
    localStorage.setItem("total", total);
    localStorage.setItem("idEventos", idEventos);
  };

  const getData = () => {
    axios
      .get(`http://localhost:9595/administrador/boletos/listar`)
      .then((getData) => {
        setApiData(getData.data);
      });
  };

  const onDelete = (id) => {
    swal({
      title: "Eliminar boleto",
      text: "¿Está seguro que desea eliminar el boleto?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((elimina) => {
      if (elimina) {
        axios
          .delete(`http://localhost:9595/administrador/boletos/eliminar/${id}`)
          .then(() => {
            getData();
          });
        swal({
          text: "El boleto ha sido eliminado con éxito",
          icon: "success",
        });
      }
    });
  };

  const [idUsuario, setIdUsuario] = useState();
  const [idAsientos, setidAsientos] = useState();
  const [idSecciones, setidSecciones] = useState();
  const [cantidad, setCantidad] = useState();
  const [costo_servicio, setCostoServicio] = useState();
  const [precioBoleto, setPrecioBoleto] = useState();
  const [total, setTotal] = useState();
  const [idEventos, setIdEventos] = useState();

  let registerUsu = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:9595/administrador/boletos/crear", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          idUsuario: idUsuario,
          idEventos: idEventos,
          idAsientos: idAsientos,
          idSecciones: idSecciones,
          cantidad: cantidad,
          precioBoleto: precioBoleto,
          total: total,
        }),
      });
      swal({
        title: "Boleto creado con éxito!",
        text: "El boleto ha sido guardado",
        icon: "success",
        button: "Aceptar",
      }).then((respuesta) => {
        if (respuesta) {
          window.location.reload();
        }
      });
    } catch (error) {
      swal({
        title: "Error",
        text: "Ocurrio un error al guardar :(",
        icon: "error",
        button: "Aceptar",
      });
    }
  };

  return (
    <>
      <NavbarDashboard/>
      <Slidebar/>
      <div className="Boletos">
        <div className="main2" style={{ width: "80%",height:"100vh",marginLeft: "20%" }}>
          <div id="media">
            <h3 className="head">
              <FaIcons.FaHouseUser className="me-2" /> Tickets
            </h3>
            <div className="container">
              <br></br>
              <div className="tab2">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Usuario</TableCell>
                        <TableCell>Evento</TableCell>
                        <TableCell>Asiento</TableCell>
                        <TableCell>Sección</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Costo del Servicio</TableCell>
                        <TableCell>Precio del Boleto</TableCell>
                        <TableCell>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {apiData.map((data) => {
                        return (
                          <TableRow>
                            <TableCell>{data.idUsuario}</TableCell>
                            <TableCell>{data.idEventos}</TableCell>
                            <TableCell>{data.idAsientos}</TableCell>
                            <TableCell>{data.idSecciones}</TableCell>
                            <TableCell>{data.cantidad}</TableCell>
                            <TableCell>{data.costo_servicio}</TableCell>
                            <TableCell>{data.precioBoleto}</TableCell>
                            <TableCell>{data.total}</TableCell>
                            <TableCell>
                              <Link to="/Dashboard/usuarios/actualizar">
                                <Button
                                  className="btn1Usu"
                                  onClick={() =>
                                    setData(
                                      data.idUsuario,
                                      data.idEventos,
                                      data.idAsientos,
                                      data.idSecciones,
                                      data.cantidad,
                                      data.costo_servicio,
                                      data.precioBoleto,
                                      data.total
                                    )
                                  }
                                >
                                  <img />
                                </Button>
                              </Link>
                              <Button
                                className="btn1Usu"
                                onClick={() => onDelete(data.id)}
                              >
                                <img />
                                &nbsp;
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            <br />
          </div>
        </div>
        <Button
          className="btnUsu"
          onClick={handleOpen}
          style={{
            float: "right",
            margin: "40px",
            marginTop: "20px",
            fontSize: "20px",
            fontFamily: "Verdana",
            backgroundColor: "#3CB371",
            borderRadius: "5px",
            marginTop: "-150px"
          }}
        >
          Agregar
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              Nuevo Boleto
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form method="POST" className="formula33" onSubmit={registerUsu}>
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }} className="">
                    id Usuario
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setIdUsuario(e.target.value)}
                    required
                  />
                </div>
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }} className="">
                    id Evento
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setIdEventos(e.target.value)}
                    required
                  />
                </div>
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }} className="">
                    id Asiento
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setidAsientos(e.target.value)}
                    required
                  />
                </div>
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }} className="">
                    id Sección
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setidSecciones(e.target.value)}
                    required
                  />
                </div>
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }} className="">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setCantidad(e.target.value)}
                    required
                  />
                </div>
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Costo de Servicio
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setCostoServicio(e.target.value)}
                    required
                  />
                </div>

                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Precio de Boleto
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setPrecioBoleto(e.target.value)}
                    required
                  />
                </div>
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Total
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setTotal(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="submit"
                  className="btnUsu"
                  style={{ float: "right" }}
                  value="Crear"
                />
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Usuarios;
