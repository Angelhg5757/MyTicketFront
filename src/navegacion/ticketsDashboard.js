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
      .get(`https://ticketback.herokuapp.com/boletos/listar`)
      .then((getData) => {
        setApiData(getData.data);
      });
  }, []);

  const setData = (
    idBoleto,
          idUsuario,
          idEventos,
          idAsientos,
          idPrecio,
          descripcion,
  ) => {
    localStorage.setItem("IdUsuario", idUsuario);
    localStorage.setItem("IdAsientos", idAsientos);
    localStorage.setItem("idBoleto", idBoleto);
    localStorage.setItem("idPrecio", idPrecio);
    localStorage.setItem("descripcion", descripcion);
    localStorage.setItem("idEventos", idEventos);
  };

  const getData = () => {
    axios
      .get(`https://ticketback.herokuapp.com/boletos/listar`)
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
          .delete(`https://ticketback.herokuapp.com/boletos/eliminar/${id}`)
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

  const [idUsuario, setidUsuario] = useState();
  const [idAsientos, setidAsientos] = useState();
  const [idBoleto, setidBoleto] = useState();
  const [idEventos, setidEventos] = useState();
  const [idPrecio, setidPrecio] = useState();
  const [descripcion, setDescripcion] = useState();

  let registerUsu = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://ticketback.herokuapp.com/boletos/crear", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          idBoleto: idBoleto,
          idUsuario: idUsuario,
          idEventos: idEventos,
          idAsientos: idAsientos,
          idprecio: idPrecio,
          descripcion: descripcion,
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
                        {/* <TableCell>Id Boleto</TableCell> */}
                        <TableCell>Id Evento</TableCell>
                        <TableCell>Id Usuario</TableCell>
                        <TableCell>Id Asiento</TableCell>
                        <TableCell>Id Precio</TableCell>
                        <TableCell>Descripción</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {apiData.map((data) => {
                        return (
                          <TableRow>
                            {/* <TableCell>{data.idBoleto}</TableCell> */}
                            <TableCell>{data.idEventos}</TableCell>
                            <TableCell>{data.idUsuario}</TableCell>
                            <TableCell>{data.idAsientos}</TableCell>
                            <TableCell>{data.idPrecio}</TableCell>
                            <TableCell>{data.descripcion}</TableCell>
                            <TableCell>
                              <Link to="/Dashboard/usuarios/actualizar">
                                <Button
                                  className="btn1Usu"
                                  onClick={() =>
                                    setData(
                                      /* data.idBoleto, */
                                      data.idEventos,
                                      data.idUsuario,
                                      data.idAsientos,
                                      data.idPrecio,
                                      data.descripcion
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
                {/* <div className>
                  <label for="" style={{ fontFamily: "Verdana" }} className="">
                    id Boleto
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setidBoleto(e.target.value)}
                    required
                  />
                </div> */}
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }} className="">
                    id Evento
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setidEventos(e.target.value)}
                    required
                  />
                </div>
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }} className="">
                    id Usuario
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setidUsuario(e.target.value)}
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
                    id Precio
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setidPrecio(e.target.value)}
                    required
                  />
                </div>
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Descripción
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setDescripcion(e.target.value)}
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
