import React, { useEffect, useState } from "react";
import NavbarDashboard from "../navegacion/NavbarDashboard";
import Slidebar from "../navegacion/SidebarDashboard";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  TableCell,
  MenuItem
} from "@mui/material";
import swal from "sweetalert";
import "./css/agregar.css";

const AgregarEvento = () => {
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
      .get(`http://localhost:4000/boletoscrud`)
      .then((getData) => {
        setApiData(getData.data);
      });
  }, []);

  const setData = (
    descripcion,
    nombre,
    fecha,
    ciudad,
    idInmueble,
    imagen,
  ) => {
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("fecha", fecha);
    localStorage.setItem("ciudad", ciudad);
    localStorage.setItem("idInmueble", idInmueble);
    localStorage.setItem("descripcion", descripcion);
    localStorage.setItem("imagen", imagen);
  };

  const getData = () => {
    axios
      //.get(`https://ticketback.herokuapp.com/boletos/listar`)
      .get(`https://localhost:4000/crudboletos`)
      .then((getData) => {
        setApiData(getData.data);
      });
  };

  const onDelete = (id) => {
    swal({
      title: "Eliminar Evento",
      text: "¿Está seguro que desea eliminar el boleto?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((elimina) => {
      if (elimina) {
        axios
          //.delete(`https://ticketback.herokuapp.com/boletos/eliminar/${id}`)
          .delete(`https://localhost:4000/boletos/eliminar/${id}`)
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

  const [nombre, setNombre] = useState();
  const [fecha, setFecha] = useState();
  const [ciudad, setCiudad] = useState();
  const [idInmueble, setIdInmueble] = useState();
  const [imagen, setImagen] = useState();
  const [descripcion, setDescripcion] = useState();


  let registerUsu = async (e) => {
    e.preventDefault();
    try {
      //let res = await fetch("https://ticketback.herokuapp.com/boletos/crear", {
      let res = await fetch("http://localhost:4000/boletos/crear", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          fecha: fecha,
          ciudad: ciudad,
          idInmueble: idInmueble,
          imagen: imagen,
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
      <NavbarDashboard />
      <Slidebar />
      <div className="Boletos">
        <div
          className="main2"
          style={{ width: "80%", height: "100vh", marginLeft: "20%" }}
        >
          <div id="media">
            <h3 className="head">
              <FaIcons.FaHouseUser className="me-2" /> Tickets
            </h3>
            <div className="container">
              <br></br>
              <div className="tab2">
                <form
                  method="POST"
                  className="formula33"
                  onSubmit={registerUsu}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor=""
                          style={{ fontFamily: "Verdana" }}
                        >
                          Descripción
                        </label>
                        <div className="combo-select-1">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                          />
                          <div className="combo-select-arrow-1"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor=""
                          style={{ fontFamily: "Verdana" }}
                          className=""
                        >
                          Nombre
                        </label>
                        <div className="combo-select-1">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setNombre(e.target.value)}
                            required
                          />
                          <div className="combo-select-arrow-1"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor=""
                          style={{ fontFamily: "Verdana" }}
                          className=""
                        >
                          Fecha
                        </label>
                        <div className="combo-select-1">
                          <input
                            type="date"
                            className="form-control"
                            onChange={(e) => setFecha(e.target.value)}
                            required
                          />
                          
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
                          Ciudad
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) => setCiudad(e.target.value)}
                            required
                          >
                            <option value="">Selecciona un precio</option>
                            <option value="precio1">Precio 1</option>
                            <option value="precio2">Precio 2</option>
                            <option value="precio3">Precio 3</option>
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor=""
                          style={{ fontFamily: "Verdana" }}
                        >
                          Inmueble
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) => setIdInmueble(e.target.value)}
                            required
                          >
                            <option value="">
                              Selecciona una descripción
                            </option>
                            <option value="descripcion1">
                              Descripción 1
                            </option>
                            <option value="descripcion2">
                              Descripción 2
                            </option>
                            <option value="descripcion3">
                              Descripción 3
                            </option>
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor=""
                          style={{ fontFamily: "Verdana" }}
                        >
                          Imagen
                        </label>
                        <div className="combo-select-1">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setImagen(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <Button
                          className="btnUsu"
                          onClick={handleOpen}
                          style={{
                            float: "right",
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
    </>
  );
};

export default AgregarEvento;
