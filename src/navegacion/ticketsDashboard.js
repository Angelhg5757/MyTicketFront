import React, { useEffect, useState } from "react";
import NavbarDashboard from "../navegacion/NavbarDashboard";
import Slidebar from "../navegacion/SidebarDashboard";
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
  Select,
  MenuItem,
} from "@mui/material";
import editarIcon from "../assets/img/pencil.png";
import borrarIcon from "../assets/img/trash.png";
import aceptarIcon from "../assets/img/accept.png";
import cancelarIcon from "../assets/img/cancel.png";
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
  const [secciones, setSecciones] = useState([]);
  const [seccionSeleccionada, setSeccionSeleccionada] = useState([]);
  const [asientosDisponibles, setAsientosDisponibles] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [precio, setPrecio] = useState([]);

  useEffect(() => {
    // Obtener las secciones desde la API
    axios
      .get("https://ticketbookback.herokuapp.com/asientos/secciones")
      .then((response) => {
        console.log(response.data);
        setSecciones(response.data.rows);
        // Llamar a getAsientosDisponibles con la primera sección seleccionada
        if (response.data.rows.length > 0) {
          setSeccionSeleccionada(response.data.rows[0].nombre);
          getAsientosDisponibles(response.data.rows[0].nombre);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAsientosDisponibles = (seccion) => {
    axios
      .get(`https://ticketbookback.herokuapp.com/asientosseccion/${seccion}`)
      .then((response) => {
        console.log(response.data.rows);
        setAsientosDisponibles(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    //obtener los nombres de usuario de la api
    axios
      .get(`https://ticketbookback.herokuapp.com/usuario/todos`)
      .then((response) => {
        console.log("Holiwis;",response.data.rows);
        setUsuarios(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  useEffect(() => {
    //Obtener los precios de la api
    axios
      .get(`https://ticketbookback.herokuapp.com/precio/todos`)
      .then((response) => {
        console.log("Holiwis precio;",response.data.rows);
        setPrecio(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  useEffect(() => {
    //Obtener los nombres de los eventos de la api
    axios
      .get(`https://ticketbookback.herokuapp.com/eventos/todos`)
      .then((response) => {
        console.log("Entraste",response.data.rows);
        setEventos(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      }
      )
  },[]);

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
    getAsientosDisponibles(seccionSeleccionada);
  }, [seccionSeleccionada]);

  useEffect(() => {
    axios.get(`https://ticketbookback.herokuapp.com/boletoscrud`).then((getData) => {
      setApiData(getData.data);
    });
  }, []);

  const setData = (
    usuario,
    evento,
    numAsiento,
    seccion,
    precio,
    descripcion
  ) => {
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("evento", evento);
    localStorage.setItem("numAsiento", numAsiento);
    localStorage.setItem("seccion", seccion);
    localStorage.setItem("descripcion", descripcion);
    localStorage.setItem("precio", precio);
  };

  const getData = () => {
    axios.get(`https://ticketbookback.herokuapp.com/boletoscrud`).then((getData) => {
      setApiData(getData.data);
    });
  };

  const formatDateInput = (date) => {
    return moment(date).format("YYYY-MM-DD"); // Formatear la fecha usando moment.js
  };
  const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY");
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
          .delete(`https://ticketbookback.herokuapp.com/boletos/eliminar/${id}`)
          .then(() => {
            getData();
            swal({
              text: "El usuario ha sido eliminado con éxito",
              icon: "success",
            });
          })
          .catch((error) => {
            swal("Error", "Ocurrió un error al eliminar el usuario", "error");
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
        ...apiData.find((data) => data.idBoletos === editUserId),
        ...editedData[editUserId],
      };
      console.log(newData);
      axios
        .put(`https://ticketbookback.herokuapp.com/boletos/actualizando/${editUserId}`, newData)
        .then(() => {
          getData();
          handleClose();
          setEditMode(false);
          swal({
            text: "El boleto ha sido actualizado con éxito",
            icon: "success",
          });
        })
        .catch((error) => {
          swal("Error", "Ocurrió un error al actualizar el boleto", "error");
        });
    }
  };

  const agregarBoton = ()=>{
    window.location.href = "https://ticket-book-front.vercel.app/agregarTicket";
  }

  return (
    <>
      <NavbarDashboard />
      <Slidebar />
      <div className="Usuarios">
        <div className="main2" style={{ width: "100%", height: "100vh" }}>
          <div id="media">
            <h3 className="head">
              <FaIcons.FaHouseUser className="me-2" /> Boletos
            </h3>
            <div className="container">
              <br></br>
              <div className="tab2">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Evento</TableCell>
                        <TableCell>Usuario</TableCell>
                        <TableCell>Seccion</TableCell>
                        <TableCell>Asiento</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {apiData.map((data) => {
                        return (
                          <TableRow>
                            {/* <TableCell>{data.idUsuario}</TableCell> */}
                            <TableCell>
                            {editMode && editUserId === data.idBoletos ? (
                                <Select
                                  type="text"
                                  name="eventos_nombre"
                                  value={
                                    editedData[data.idBoletos]?.eventos_nombre ||
                                    data.eventos_nombre
                                  }
                                  onChange={(e) =>
                                    handleInputChange(e, data.idBoletos)
                                  }
                                >
                                  {eventos.map((evento) => (
                                    <MenuItem value={evento.nombre}>
                                      {evento.nombre}
                                    </MenuItem>
                                  ))}
                                </Select>
                              ) : (
                                data.eventos_nombre
                              )}
                            </TableCell>
                            {/* <TableCell>{data.password}</TableCell> */}
                            <TableCell>
                              {editMode && editUserId === data.idBoletos ? (
                                <Select
                                  type="text"
                                  name="nombre"
                                  value={
                                    editedData[data.idBoletos]?.nombre ||
                                    data.nombre
                                  }
                                  onChange={(e) =>
                                    handleInputChange(e, data.idBoletos)
                                  }
                                >
                                  {usuarios.map((usuario) => (
                                    <MenuItem value={usuario.nombre}>
                                      {usuario.nombre}
                                    </MenuItem>
                                  ))}
                                </Select>
                              ) : (
                                data.nombre
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode && editUserId === data.idBoletos? (
                                <Select
                                  name="seccion"
                                  value={
                                    editedData[data.idBoletos]?.seccion ||
                                    data.seccion
                                  }
                                  onChange={(e) =>
                                    handleInputChange(e, data.idBoletos)
                                  }
                                >
                                  {secciones.map((seccion) => (
                                    <MenuItem value={seccion.nombre}>
                                      {seccion.nombre}
                                    </MenuItem>
                                  ))}
                                </Select>
                              ) : (
                                data.seccion
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode && editUserId === data.idBoletos ? (
                                <Select
                                  name="numero"
                                  value={
                                    editedData[data.idBoletos]?.numero ||
                                    data.numero
                                  }
                                  onChange={(e) =>
                                    handleInputChange(e, data.idBoletos)
                                  }
                                >
                                  {asientosDisponibles.map((asiento) => (
                                    <MenuItem value={asiento.numas}>
                                      {asiento.numas}
                                    </MenuItem>
                                  ))}
                                </Select>
                              ) : (
                                data.numero
                              )}
                            </TableCell>
                            <TableCell>
                            {editMode && editUserId === data.idBoletos ? (
                                <Select
                                  type="text"
                                  name="precio"
                                  value={
                                    editedData[data.idBoletos]?.precio ||
                                    data.precio
                                  }
                                  onChange={(e) =>
                                    handleInputChange(e, data.idBoletos)
                                  }
                                >
                                  {precio.map((precio) => (
                                    <MenuItem value={precio.precio}>
                                      {precio.precio}
                                    </MenuItem>
                                  ))}
                                </Select>
                              ) : (
                                data.precio
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode && editUserId === data.idBoletos ? (
                                <input
                                  type="text"
                                  name="descripcion"
                                  value={
                                    editedData[data.idBoletos]?.descripcion ||
                                    data.descripcion
                                  }
                                  onChange={(e) =>
                                    handleInputChange(e, data.idBoletos)
                                  }
                                />
                              ) : (
                                data.descripcion
                              )}
                            </TableCell>
                            <TableCell>
                              {editMode && editUserId === data.idBoletos ? (
                                <>
                                  <img
                                    src={aceptarIcon}
                                    style={{ paddingRight: "30%" }}
                                    onClick={() => onSave(data.idBoletos)}
                                  />
                                  <img
                                    src={cancelarIcon}
                                    onClick={() => onCancel()}
                                  />
                                </>
                              ) : (
                                <>
                                  <img
                                    src={editarIcon}
                                    style={{ paddingRight: "30%" }}
                                    onClick={() => onEdit(data.idBoletos)}
                                  />
                                  <img
                                    src={borrarIcon}
                                    onClick={() => onDelete(data.idBoletos)}
                                  />
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
              <form
                method="POST"
                className="formula33" /* onSubmit={registerUsu} */
              >
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
