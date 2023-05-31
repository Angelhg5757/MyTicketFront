import React, { useEffect, useState } from "react";
import NavbarDashboard from '../navegacion/NavbarDashboard';
import Slidebar from '../navegacion/SidebarDashboard';
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import Footer from "./footer";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import "./css/agregar.css";


const AgregarUsuario = () => {
  let navigate = useNavigate();
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

  // const setData = (
  //   nombre,
  //   apePat,
  //   apeMat,
  //   telefono,
  //   correo,
  //   password,
  //   fechaNac,
  //   idRol,
  // ) => {
  //   localStorage.setItem("nombre", nombre);
  //   localStorage.setItem("apePat", apePat);
  //   localStorage.setItem("apeMat", apeMat);
  //   localStorage.setItem("telefono", telefono);
  //   localStorage.setItem("correo", correo);
  //   localStorage.setItem("password", password);
  //   localStorage.setItem("fechaNac", fechaNac);
  //   localStorage.setItem("idRol", idRol);
  // };


  const [nombre, setNombre] = useState();
  const [apePat, setApePat] = useState();
  const [apeMat, setApeMat] = useState();
  const [telefono, setTelefono] = useState();
  const [correo, setCorreo] = useState();
  const [password, setPassword] = useState();
  const [fechaNac, setFechaNac] = useState();
  const [idRol, setIdRol] = useState();


  let registerUsu = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:4000/usuario/crear", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          apePat: apePat,
          apeMat: apeMat,
          telefono: telefono,
          correo: correo,
          password: password,
          fechaNac: fechaNac,
          idRol: idRol,
        }),
      });
      swal({
        title: "Usuario creado con éxito!",
        text: "El usuario ha sido guardado",
        icon: "success",
        button: "Aceptar",
      })
      navigate("/CrudUsuarios");
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
              <FaIcons.FaHouseUser className="me-2" /> Usuarios
            </h3>
            <div className="container">
              <br></br>
              <div className="tab2">
                <form method="POST" className="formula33" onSubmit={registerUsu}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="" style={{ fontFamily: "Verdana" }} className="">
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
                        <label htmlFor="" style={{ fontFamily: "Verdana" }} className="">
                          Apellido Paterno
                        </label>
                        <div className="combo-select-1">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setApePat(e.target.value)}
                            required
                          />

                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="" style={{ fontFamily: "Verdana" }} className="">
                          Apellido Materno
                        </label>
                        <div className="combo-select-1">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setApeMat(e.target.value)}
                            required
                          />

                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="" style={{ fontFamily: "Verdana" }} className="">
                          Teléfono
                        </label>
                        <div className="combo-select-1">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="" style={{ fontFamily: "Verdana" }} className="">
                            Correo
                          </label>
                          <div className="combo-select-1">
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => setCorreo(e.target.value)}
                              required
                            />

                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="" style={{ fontFamily: "Verdana" }} className="">
                            Contraseña
                          </label>
                          <div className="combo-select-1">
                            <input
                              type="password"
                              className="form-control"
                              onChange={(e) => setPassword(e.target.value)}
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
                            Fecha de Nacimiento
                          </label>
                          <div className="combo-select-1">
                            <input
                              type="date"
                              className="form-control"
                              onChange={(e) => setFechaNac(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                        <label htmlFor="" style={{ fontFamily: "Verdana" }}>
                          Rol
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) => setIdRol(e.target.value)}
                            required
                          >
                            <option selected="true" disabled="disabled">
                              Selecciona rol
                            </option>
                            <option value="1">Administrador</option>
                            <option value="2">Usuario</option>
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
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
                </form>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AgregarUsuario;
