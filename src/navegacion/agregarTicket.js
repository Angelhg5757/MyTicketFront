import React, { useEffect, useState } from "react";
import NavbarDashboard from '../navegacion/NavbarDashboard';
import Slidebar from '../navegacion/SidebarDashboard';
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
      .get(`http://localhost:4000/boletoscrud`)
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
    descripcion,
  ) => {
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("evento", evento);
    localStorage.setItem("numAsiento", numAsiento);
    localStorage.setItem("seccion", seccion);
    localStorage.setItem("descripcion", descripcion);
    localStorage.setItem("precio", precio);
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
      title: "Eliminar boleto",
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

  const [usuario, setUsuario] = useState();
  const [evento, setEvento] = useState();
  const [numAsiento, setNumAsiento] = useState();
  const [seccion, setSeccion] = useState();
  const [precio, setPrecio] = useState();
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
          usuario: usuario,
          evento: evento,
          numAsiento: numAsiento,
          seccion: seccion,
          precio: precio,
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
        <div className="main2" style={{ width: "80%", height: "100vh", marginLeft: "20%" }}>
          <div id="media">
            <h3 className="head">
              <FaIcons.FaHouseUser className="me-2" /> Tickets
            </h3>
            <div className="container">
              <br></br>
              <div className="tab2">
                <form method="POST" className="formula33" onSubmit={registerUsu}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="" style={{ fontFamily: "Verdana" }} className="">
                          Evento
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) => setEvento(e.target.value)}
                            required
                          >
                            <option value="">Selecciona un evento</option>
                            <option value="evento1">Evento 1</option>
                            <option value="evento2">Evento 2</option>
                            <option value="evento3">Evento 3</option>
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="" style={{ fontFamily: "Verdana" }} className="">
                          Usuario
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                          >
                            <option value="">Selecciona un usuario</option>
                            <option value="usuario1">Usuario 1</option>
                            <option value="usuario2">Usuario 2</option>
                            <option value="usuario3">Usuario 3</option>
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="" style={{ fontFamily: "Verdana" }} className="">
                          Asiento
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) => setNumAsiento(e.target.value)}
                            required
                          >
                            <option value="">Selecciona un asiento</option>
                            <option value="asiento1">Asiento 1</option>
                            <option value="asiento2">Asiento 2</option>
                            <option value="asiento3">Asiento 3</option>
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="" style={{ fontFamily: "Verdana" }} className="">
                          Precio
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) => setPrecio(e.target.value)}
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
                        <label htmlFor="" style={{ fontFamily: "Verdana" }}>
                          Descripción
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                          >
                            <option value="">Selecciona una descripción</option>
                            <option value="descripcion1">Descripción 1</option>
                            <option value="descripcion2">Descripción 2</option>
                            <option value="descripcion3">Descripción 3</option>
                          </select>
                          <div className="combo-select-arrow"></div>
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
                            marginTop: "120px"
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

export default AgregarTicket;