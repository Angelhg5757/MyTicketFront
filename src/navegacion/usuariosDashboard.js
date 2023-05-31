import React, { useEffect, useState } from "react";
import NavbarDashboard from '../navegacion/NavbarDashboard';
import Slidebar from '../navegacion/SidebarDashboard';
import axios from "axios";
import moment from "moment";
import * as FaIcons from "react-icons/fa";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Footer from "./footer";

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
      .get(`http://localhost:4000/usuario/listar`)
      .then((getData) => {
        setApiData(getData.data);
      });
  }, []);

  const setData = (
    id,
    correo,
    contrasenia,
    estatus,
    fechaRegistro,
    fechaVigencia,
    rol_id
  ) => {
    localStorage.setItem("ID", id);
    localStorage.setItem("correo", correo);
    localStorage.setItem("contrasenia", contrasenia);
    localStorage.setItem("estatus", estatus);
    localStorage.setItem("fechaRegistro", fechaRegistro);
    localStorage.setItem("fechaVigencia", fechaVigencia);
    localStorage.setItem("rol_id", rol_id);
  };

  const agregarBoton = ()=>{
    window.location.href = "http://localhost:3000/agregarUsuario";
  }

  const getData = () => {
    axios
      .get(`http://localhost:4000/usuario/listar`)
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
      title: "Eliminar usuario",
      text: "¿Está seguro que desea eliminar el usuario?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((elimina) => {
      if (elimina) {
        axios
          .delete(`http://localhost:4000/usuario/eliminar/${id}`)
          .then(() => {
            getData();
            swal({
              text: "El usuario ha sido eliminado con éxito",
              icon: "success",
            });
          })
          .catch((error) => {
            if (error.response && error.response.status === 500) {
              swal("Error", "El usuario tiene boletos registrados. Primero elimine los boletos asociados al usuario", "error");
            } else {
              swal("Error", "Ocurrió un error al eliminar el usuario", "error");
            }
          });
      }
    });
  };

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
        ...apiData.find((data) => data.idUsuario === editUserId),
        ...editedData[editUserId],
      };
      axios
        .put(`http://localhost:4000/usuario/actualizar/${editUserId}`, newData)
        .then(() => {
          getData();
          handleClose();
          setEditMode(false);
          swal({
            text: "El usuario ha sido actualizado con éxito",
            icon: "success",
          });
        })
        .catch((error) => {
          swal("Error", "Ocurrió un error al actualizar el usuario", "error");
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
              <FaIcons.FaHouseUser className="me-2" /> Usuarios
            </h3>
            <div className="container">
              <br></br>
              <div className="tab2">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {/* <TableCell>ID</TableCell> */}
                        <TableCell>Correo</TableCell>
                        {/*<TableCell>Contraseña</TableCell>*/} 
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido Paterno</TableCell>
                        <TableCell>Apellido Materno</TableCell>
                        <TableCell>Telefono</TableCell>
                        <TableCell>Fecha Nacimiento</TableCell>
                        <TableCell>Rol</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {apiData.map((data) => {
                        return (
                          <TableRow>
                            {/* <TableCell>{data.idUsuario}</TableCell> */}
                            <TableCell>
                            {editMode && editUserId === data.idUsuario ? (
                                <input
                                  type="text"
                                  name="correo"
                                  value={editedData[data.idUsuario]?.correo || data.correo}
                                  onChange={(e) => handleInputChange(e, data.idUsuario)}
                                />
                              ) : (
                                data.correo
                              )}
                            </TableCell>
                            {/* <TableCell>{data.password}</TableCell> */}
                            <TableCell>
                              {editMode && editUserId === data.idUsuario ? (
                                <input
                                  type="text"
                                  name="nombre"
                                  value={editedData[data.idUsuario]?.nombre || data.nombre}
                                  onChange={(e) => handleInputChange(e, data.idUsuario)}
                                />
                              ) : (
                                data.nombre
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode && editUserId === data.idUsuario ? (
                                <input
                                  type="text"
                                  name="apePat"
                                  value={editedData[data.idUsuario]?.apePat || data.apePat}
                                  onChange={(e) => handleInputChange(e, data.idUsuario)}
                                />
                              ) : (
                                data.apePat
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode && editUserId === data.idUsuario ? (
                                <input
                                  type="text"
                                  name="apeMat"
                                  value={editedData[data.idUsuario]?.apeMat || data.apeMat}
                                  onChange={(e) => handleInputChange(e, data.idUsuario)}
                                />
                              ) : (
                                data.apeMat
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode && editUserId === data.idUsuario ? (
                                <input
                                  type="text"
                                  name="telefono"
                                  value={editedData[data.idUsuario]?.telefono || data.telefono}
                                  onChange={(e) => handleInputChange(e, data.idUsuario)}
                                />
                              ) : (
                                data.telefono
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode && editUserId === data.idUsuario ? (
                                <input
                                  type="date"
                                  name="fechaNac"
                                  value={formatDateInput(editedData[data.idUsuario]?.fechaNac || data.fechaNac)}
                                  onChange={(e) => handleInputChange(e, data.idUsuario)}
                                />
                              ) : (
                                formatDate(data.fechaNac)
                              )}
                            </TableCell>
                            <TableCell>{data.rol_nombre}</TableCell>
                            <TableCell>
                              {editMode && editUserId === data.idUsuario ? (
                                <>
                                  <img src={aceptarIcon} style={{paddingRight:'30%'}} onClick={()=>onSave(data.idUsuario)} />
                                  <img src={cancelarIcon} onClick={()=>onCancel()} />
                                </>
                              ) : (
                                <>
                                  <img src={editarIcon} style={{paddingRight:'30%'}} onClick={() => onEdit(data.idUsuario)} />
                                  <img src={borrarIcon} onClick={() => onDelete(data.idUsuario)} />
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