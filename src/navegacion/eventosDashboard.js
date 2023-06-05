import React, { useEffect, useState } from "react";
import NavbarDashboard from '../navegacion/NavbarDashboard';
import Slidebar from '../navegacion/SidebarDashboard';
import axios from "axios";
import moment from "moment";
import Footer from "./footer";
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
import editarIcon from '../assets/img/pencil.png';
import borrarIcon from '../assets/img/trash.png';
import aceptarIcon from '../assets/img/accept.png';
import cancelarIcon from '../assets/img/cancel.png';
import Modal from "@mui/material/Modal";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setEditedData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name]: value,
      },
    }));
  };


  useEffect(() => {
    axios
      .get(`https://ticketback.herokuapp.com/eventos/listar`)
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
      .get(`https://ticketback.herokuapp.com/eventos/listar`)
      .then((getData) => {
        setApiData(getData.data);
      });
  };

  const formatDateInput = (date) => {
    return moment(date).format("YYYY-MM-DD"); // Formatear la fecha usando moment.js
  };
  const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY");
  }

  const onDelete = (id) => {
    swal({
      title: "Eliminar evento",
      text: "¿Está seguro que desea eliminar el evento?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((elimina) => {
      if (elimina) {
        axios
          .delete(`https://ticketback.herokuapp.com/eventos/eliminar/${id}`)
          .then(() => {
            getData();
            swal({
              text: "El evento ha sido eliminado con éxito",
              icon: "success",
            });
          })
          .catch((error) => {
            if (error.response && error.response.status === 500) {
              swal("Error", "El evento tiene boletos registrados. Primero elimine los boletos asociados al evento", "error");
            } else {
              swal("Error", "Ocurrió un error al eliminar el usuario", "error");
            }
          });
      }
    });
  };
  const [descripcion, setDescripcion] = useState();
  const [nombre, setNombre] = useState();
  const [fecha, setFecha] = useState();
  const [ciudad, setCiudad] = useState();
  const [idInmueble, setIdInmueble] = useState();

  const onEdit = (id) => {
    setEditMode(true);
    setEditUserId(id);
    // Realizar cualquier otra acción necesaria para habilitar la edición de campos en la tabla
  };

  const onCancel = () => {
    setEditMode(false);
    setEditUserId(null);
    // Realizar cualquier otra acción necesaria para cancelar la edición de campos en la tabla
  };

  const onSave = () => {
    console.log(editUserId);
    if (editedData[editUserId]) {
      const newData = {
        ...apiData.find((data) => data.idEventos === editUserId),
        ...editedData[editUserId],

      };
      console.log(newData);
      axios
        .put(`https://ticketback.herokuapp.com/eventos/actualizar/${editUserId}`, newData)
        .then(() => {
          getData();
          handleClose();
          setEditMode(false);
          swal({
            text: "El evento ha sido actualizado con éxito",
            icon: "success",
          });
        })
        .catch((error) => {
          swal("Error", "Ocurrió un error al actualizar el evento", "error");
        });
    }
  };

  const agregarBoton = () => {
    window.location.href = "http://localhost:3000/agregarEvento";
  }

  return (
    <>
      <NavbarDashboard />
      <Slidebar />
      <div className="Usuarios">
        <div className="main2" style={{ width: "100%", height: "100vh" }}>
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
                        <TableCell>Descripción</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Ciudad</TableCell>
                        <TableCell>Inmueble</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {apiData.map((data) => {
                        return (
                          <TableRow>
                            {/* <TableCell>{data.idUsuario}</TableCell> */}
                            <TableCell>
                              {editMode && editUserId === data.idEventos ? (
                                <input
                                  type="text"
                                  name="descripcion"
                                  value={editedData[data.idEventos]?.descripcion || data.descripcion}
                                  onChange={(e) => handleInputChange(e, data.idEventos)}
                                />
                              ) : (
                                data.descripcion
                              )}
                            </TableCell>
                            {/* <TableCell>{data.password}</TableCell> */}
                            <TableCell>
                              {editMode && editUserId === data.idEventos ? (
                                <input
                                  type="text"
                                  name="eventos_nombre"
                                  value={editedData[data.idEventos]?.eventos_nombre || data.eventos_nombre}
                                  onChange={(e) => handleInputChange(e, data.idEventos)}
                                />
                              ) : (
                                data.eventos_nombre
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode && editUserId === data.idEventos ? (
                                <input
                                  type="date"
                                  name="fecha"
                                  value={formatDateInput(editedData[data.idEventos]?.fecha || data.fecha)}
                                  onChange={(e) => handleInputChange(e, data.idEventos)}
                                />
                              ) : (
                                formatDate(data.fechaNac)
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode && editUserId === data.idEventos ? (
                                <input
                                  type="text"
                                  name="ciudad"
                                  value={editedData[data.idEventos]?.ciudad || data.ciudad}
                                  onChange={(e) => handleInputChange(e, data.idEventos)}
                                />
                              ) : (
                                data.ciudad
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode && editUserId === data.idEventos ? (
                                <input
                                  type="text"
                                  name="inmueble_nombre"
                                  value={editedData[data.idEventos]?.inmueble_nombre || data.inmueble_nombre}
                                  onChange={(e) => handleInputChange(e, data.idEventos)}
                                />
                              ) : (
                                data.inmueble_nombre
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode && editUserId === data.idEventos ? (
                                <>
                                  <img src={aceptarIcon} style={{ paddingRight: '30%' }} onClick={() => onSave(data.idEventos)} />
                                  <img src={cancelarIcon} onClick={() => onCancel()} />
                                </>
                              ) : (
                                <>
                                  <img src={editarIcon} style={{ paddingRight: '30%' }} onClick={() => onEdit(data.idEventos)} />
                                  <img src={borrarIcon} onClick={() => onDelete(data.idEventos)} />
                                </>
                              )}
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
          // onClick={handleOpen}
          style={{
            // "right",
            position: "absolute",
            top: "-5%",
            right: "0",
            margin: "40px",
            fontSize: "20px",
            fontFamily: "Verdana",
            backgroundColor: "#3CB371",
            borderRadius: "5px",
            marginTop: "120px",
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
              Nuevo usuario
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form method="POST" className="formula33" /* onSubmit={registerUsu} */>
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }} className="">
                    Correo electronico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    // onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    // onChange={(e) => setContrasenia(e.target.value)}
                    required
                  />
                </div>

                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Fecha de registro
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    // onChange={(e) => setRegistro(e.target.value)}
                    required
                  />
                </div>

                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Fecha de vigencia
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    // onChange={(e) => setVigencia(e.target.value)}
                    required
                  />
                </div>

                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Rol Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    // onChange={(e) => setRol(e.target.value)}
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
      <Footer />

    </>
  );
};

export default Usuarios;