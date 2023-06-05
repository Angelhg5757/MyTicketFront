import React, { useEffect, useState } from "react";
import NavbarDashboard from "../navegacion/NavbarDashboard";
import Slidebar from "../navegacion/SidebarDashboard";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router";
import Footer from "./footer";
import swal from "sweetalert";
import "./css/agregar.css";

const AgregarEvento = () => {
  let navigate = useNavigate();

  const [nombre, setNombre] = useState();
  const [fecha, setFecha] = useState();
  const [ciudad, setCiudad] = useState();
  const [idInmuebles, setIdInmueble] = useState();
  const [inmuebles, setInmuebles] = useState([]);
  const [imagen, setImagen] = useState();
  const [descripcion, setDescripcion] = useState();

  useEffect(() => {
    axios
      .get("https://ticketback.herokuapp.com/inmuebles/listar")
      .then((response) => {
        setInmuebles(response.data);
      })
      .catch((error) => {
        console.log("Error al obtener los nombres de los inmuebles", error);
      });
  }, []);

  let registerUsu = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://ticketback.herokuapp.com/eventos/crear", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          descripcion: descripcion,
          inmueble_nombre: idInmuebles,
          ciudad: ciudad,
          fecha: fecha,
          eventos_nombre: nombre,
          imagen: imagen,
        }),
      });
      console.log(descripcion + " " + idInmuebles + " " + ciudad + " " + fecha + " " + nombre + " " + imagen);
      swal({
        title: "Evento creado con éxito!",
        text: "El evento ha sido guardado",
        icon: "success",
      });
      navigate("/CrudEventos");
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
              <FaIcons.FaHouseUser className="me-2" /> Eventos
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
                        <label htmlFor="" style={{ fontFamily: "Verdana" }}>
                          Descripción
                        </label>
                        <div className="combo-select-1">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                          />
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
                        <div className="combo-select-1">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setCiudad(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="" style={{ fontFamily: "Verdana" }}>
                          Inmueble
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            value={idInmuebles}
                            onChange={(e) => setIdInmueble(e.target.value)}
                            required
                          >
                            <option value="" disabled selected="true">
                              Selecciona una opción
                            </option>
                            {inmuebles.map((inmueble) => (
                              <option
                                key={inmueble.nombre}
                                value={inmueble.nombre}
                              >
                                {inmueble.nombre}
                              </option>
                            ))}
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="" style={{ fontFamily: "Verdana" }}>
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

export default AgregarEvento;
