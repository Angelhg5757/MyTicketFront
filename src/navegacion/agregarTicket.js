import React, { useEffect, useState } from "react";
import NavbarDashboard from "../navegacion/NavbarDashboard";
import Slidebar from "../navegacion/SidebarDashboard";
import axios from "axios";
import Footer from "./footer";
import * as FaIcons from "react-icons/fa";
import { Button, Menu, MenuItem } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { TableCell } from "@mui/material";
import swal from "sweetalert";
import "./css/agregar.css";

const AgregarTicket = () => {
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
  const [data, setApiData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      //.get(`https://ticketback.herokuapp.com/boletos/listar`)
      .get(`https://ticketback.herokuapp.com/boletoscrud`)
      .then((getData) => {
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
    setUsuarioSeleccionado(usuario);
    setEventoSeleccionado(evento);
    setNumAsiento(numAsiento);
    setSeccionSeleccionada(seccion);
    setPrecioSeleccionado(precio);
    setDescripcion(descripcion);
  };
  

  const getData = () => {
    axios
      //.get(`https://ticketback.herokuapp.com/boletos/listar`)
      .get(`https://localhost:4000/boletoscrud`)
      .then((getData) => {
        setApiData(getData.data);
      });
  };

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [numAsiento, setNumAsiento] = useState();
  const [listaPrecios, setListaPrecios] = useState([]);
  const [precioSeleccionado, setPrecioSeleccionado] = useState("");
  const [descripcion, setDescripcion] = useState();
  const [listaSecciones, setListaSecciones] = useState([]);
  const [listaEventos, setListaEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState("");
  const [seccionSeleccionada, setSeccionSeleccionada] = useState([]);
  const [asientosDisponibles, setAsientosDisponibles] = useState([]);

  // ...

  useEffect(() => {
    axios
      .get("https://ticketback.herokuapp.com/asientos/secciones")
      .then((response) => {
        console.log(response.data);
        setListaSecciones(response.data.rows);
        // Llamar a getAsientosDisponibles con la primera sección seleccionada
        if (response.data.rows.length > 0) {
          setSeccionSeleccionada(response.data.rows[0].nombre);
          getAsientosDisponibles(response.data.rows[0].nombre);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //Obtener los precios de la api
    axios
      .get(`https://ticketback.herokuapp.com/precio/todos`)
      .then((response) => {
        console.log("Holiwis precio;", response.data.rows);
        setListaPrecios(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://ticketback.herokuapp.com/eventos/todos`)
      .then((response) => {
        console.log("Entraste", response.data.rows);
        setListaEventos(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });

    //obtener los nombres de usuario de la api
    axios
      .get(`https://ticketback.herokuapp.com/usuario/todos`)
      .then((response) => {
        console.log("Holiwis;", response.data.rows);
        setUsuarios(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAsientosDisponibles = (seccion) => {
    axios
      .get(`https://ticketback.herokuapp.com/asientosseccion/${seccion}`)
      .then((response) => {
        console.log(response.data.rows);
        setAsientosDisponibles(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSave = (event) => {
    event.preventDefault();
    console.log("Holisbananis");
    swal({
      title: "Creando boleto",
      text: "¿Está seguro que desea crear el boleto?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((elimina) => {
      if (elimina) {
        const newData = {
          usuario: usuarioSeleccionado,
          eventos_nombre: eventoSeleccionado,
          numero: numAsiento,
          seccion: seccionSeleccionada,
          precio: precioSeleccionado,
          descripcion: descripcion
        };     
        console.log(newData);
        axios
          .post(`https://ticketback.herokuapp.com/boletos/creando`, newData)
          .then(() => {
            getData();
            swal({
              text: "El boleto ha sido creado con éxito",
              icon: "success",
            });
          })
          .catch((error) => {
            swal("Error", "Ocurrió un error al crear el boleto", "error");
          });
      }
    });
  };

  return (
    <>
      <NavbarDashboard />
      <Slidebar />
      <div className="Boletos">
        <div
          className="main2"
          style={{ width: "80%", height: "100vh", marginLeft: "20%" }}
        >
          <div id="media">
            <h3 className="head">
              <FaIcons.FaHouseUser className="me-2" /> Boletos
            </h3>
            <div className="container">
              <br></br>
              <div className="tab2">
                <form
                  //method="POST"
                  className="formula33"
                  onSubmit={onSave}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor=""
                          style={{ fontFamily: "Verdana" }}
                          className=""
                        >
                          Evento
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) =>
                              setEventoSeleccionado(e.target.value)
                            }
                            required
                          >
                            <option value="">Selecciona un evento</option>
                            {listaEventos.map((item) => (
                              <option value={item.nombre}>{item.nombre}</option>
                            ))}
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor=""
                          style={{ fontFamily: "Verdana" }}
                          className=""
                        >
                          Usuario
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) =>
                              setUsuarioSeleccionado(e.target.value)
                            }
                            required
                          >
                            <option value="">Selecciona un usuario</option>
                            {usuarios.map((item) => (
                              <option value={item.nombre}>{item.nombre}</option>
                            ))}
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor=""
                          style={{ fontFamily: "Verdana" }}
                          className=""
                        >
                          Sección
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) =>
                              setSeccionSeleccionada(e.target.value)
                            }
                            required
                          >
                            <option value="">Selecciona una sección</option>
                            {listaSecciones.map((seccion) => (
                              <option value={seccion.nombre}>
                                {seccion.nombre}
                              </option>
                            ))}
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor=""
                          style={{ fontFamily: "Verdana" }}
                          className=""
                        >
                          Asiento
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) => setNumAsiento(e.target.value)}
                            required
                          >
                            <option value="">Selecciona un asiento</option>
                            {asientosDisponibles.map((asiento) => (
                              <option value={asiento.numas}>
                                {asiento.numas}
                              </option>
                            ))}
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor=""
                          style={{ fontFamily: "Verdana" }}
                          className=""
                        >
                          Precio
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) =>
                              setPrecioSeleccionado(e.target.value)
                            }
                            required
                          >
                            <option value="">Selecciona un precio</option>
                            {listaPrecios.map((item) => (
                              <option value={item.precio}>{item.precio}</option>
                            ))}
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="" style={{ fontFamily: "Verdana" }}>
                          Descripción
                        </label>
                        <div className="combo-select">
                          <input
                            className="form-control"
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                          ></input>
                          <div className=""></div>
                        </div>
                      </div>
                      <div className="form-group">
                      <Button
                          className="btnUsu"
                          // onClick={handleOpen}
                          style={{
                           // "right",
                            position: "absolute",
                            top: "-5%",
                            right:"0",
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
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AgregarTicket;
