import React, { useEffect, useState } from "react";
import NavbarDashboard from '../navegacion/NavbarDashboard';
import Slidebar from '../navegacion/SidebarDashboard';
import axios from "axios";
import moment from "moment";
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
import editar from '../assets/img/pencil.png';
import borrar from '../assets/img/trash.png';
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./css/usuariosT.css";

const DashboardEventos = () => {
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
      .get(`http://localhost:4000/eventos/listar`)
      .then((getData) => {
        setApiData(getData.data);
      });
  }, []);

  const setData = (
    idEventos,
    descripcion,
    nombre,
    fecha,
    ciudad,
    idInmueble,
    rol_id
  ) => {
    localStorage.setItem("ID", idEventos);
    localStorage.setItem("Descripción", descripcion);
    localStorage.setItem("Nombre", nombre);
    localStorage.setItem("Fecha", fecha);
    localStorage.setItem("Ciudad", ciudad);
    localStorage.setItem("Id Inmueble", idInmueble);
    localStorage.setItem("rol_id", rol_id);
  };

  const getData = () => {
    axios
      .get(`http://localhost:4000/eventos/listar`)
      .then((getData) => {
        setApiData(getData.data);
      });
  };

  const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY"); // Formatear la fecha usando moment.js
  };

  const onDelete = (id) => {
    swal({
      title: "Eliminar evento",
      text: "¿Está seguro que desea eliminar el evento?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((elimina) => {
      if (elimina) {
        axios
          .delete(`http://localhost:4000/eventos/eliminar/${id}`)
          .then(() => {
            getData();
          });
        swal({
          text: "El evento se ha sido eliminado con éxito",
          icon: "success",
        });
      }
    });
  };

  const [descripcion, setDescripcion] = useState();
  const [nombre, setNombre] = useState();
  const [fecha, setFecha] = useState();
  const [ciudad, setCiudad] = useState();
  const [idInmueble, setIdInmueble] = useState();

  let registerUsu = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:9595/administrador/registrar", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          descripcion: descripcion,
          nombre: nombre,
          fecha: fecha,
          ciudad: ciudad,
          idInmuebele: idInmueble,
        }),
      });
      swal({
        title: "Evento registrado con éxito!",
        text: "El evento " + nombre + " ha sido guardado",
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
      <div className="Usuarios">
        <div className="main2" style={{ width: "100%",height:"100vh"}}>
          <div id="media">
            <h3 className="head">
              <FaIcons.FaHouseUser className="me-2" /> Eventos
            </h3>
            <div className="container">
              <br></br>
              <div className="tab2">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Descripcion</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Ciudad</TableCell>
                        <TableCell>Inmueble</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {apiData.map((data) => {
                        return (
                          <TableRow>
                            <TableCell>{data.idEventos}</TableCell>
                            <TableCell>{data.descripcion}</TableCell>
                            <TableCell>{data.eventos_nombre}</TableCell>
                            <TableCell>{formatDate(data.fecha)}</TableCell>
                            <TableCell>{data.ciudad}</TableCell>
                            <TableCell>{data.inmueble_nombre}</TableCell>
                            <TableCell>
                              <Link to="/Dashboard/eventos/actualizar"
                                  //className="btn1Usu"
                                  style={{paddingRight:'30%'}}
                                  onClick={() =>
                                    setData(
                                      data.id,
                                      data.descripcion,
                                      data.nombre,
                                      data.fecha,
                                      data.ciudad,
                                      data.idInmueble,
                                      data.rol_id
                                    )
                                  }
                                >
                                  <img src={editar}/>
                              </Link>
                              <Link
                                //className="btn1Usu"
                                onClick={() => onDelete(data.idEventos)}
                              >
                                <img src={borrar}/>
                                &nbsp;
                              </Link>
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
              Nuevo evento
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form method="POST" className="formula33" onSubmit={registerUsu}>
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }} className="">
                    Descripcion
                  </label>
                  <input
                    className="form-control"
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                  />
                </div>

                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Nombre 
                  </label>
                  <input
                    className="form-control"
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Fecha
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setFecha(e.target.value)}
                    required
                  />
                </div>

                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Ciudad
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setCiudad(e.target.value)}
                    required
                  />
                </div>
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    IdInmueble
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setIdInmueble(e.target.value)}
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

export default DashboardEventos;
