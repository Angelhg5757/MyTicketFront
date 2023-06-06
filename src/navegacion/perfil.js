import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Sidebar from "./Sidebar";
import "./css/perfil.css";
import { MdBloodtype } from "react-icons/md";
import { BiHappyBeaming } from "react-icons/bi";
import images from "../assets/imagenes";
import { borderColor } from "@mui/system";
import swal from "sweetalert";

const Perfil = () => {
  const [data, setApiData] = useState([]);
  let navigate = useNavigate();

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apePat, setApePat] = useState("");
  const [apeMat, setApeMat] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaNac, SetfechaNac] = useState("");
  const [sangre, SetSangre] = useState("");

  const [telefono, SetTelefono] = useState("");
  const [correoPublico, SetEmail] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("idUsuario"));
    setNombre(localStorage.getItem("nombre"));
    setApePat(localStorage.getItem("apePat"));
    setApeMat(localStorage.getItem("apeMat"));
    setCorreo(localStorage.getItem("correo"));
    SetfechaNac(localStorage.getItem("fechaNac"));
    SetSangre(localStorage.getItem("sangre"));
  }, []);

  let register = async (e) => {
    e.preventDefault();
    if (telefono.length < 10) {
      swal({
        title: "Teléfono invalido",
        text: "El teléfono debe ser de 10 digitos",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }
    try {
      let res = await fetch("https://ticket-book-front.vercel.app/contacto/crear", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          telefono: telefono,
          correoPublico: correoPublico,
          idUsuario: id,
        }),
      });
      swal({
        title: "Contacto registrado con éxito!",
        text: "Tu información ha sido completada",
        icon: "success",
        button: "Aceptar",
      });
      // navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const idUsuario = localStorage.getItem("idUsuario");

  if (
    nombre == null ||
    apePat == null ||
    apeMat == null ||
    correo == null ||
    fechaNac == null ||
    sangre == null
  ) {
    navigate("*");
  }

  return (
    <div>
      <div className="container-fluid bodyper">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10">
            <div className="containerpro rounded bg-white mt-5 mb-5">
              <div className="row">
                <div className="col-md-3 border-right">
                  <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img
                      className="rounded-circle mt-5"
                      width="150px"
                      //https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg
                      src={images.avatar}
                    />
                    <span className="font-weight-bold">{nombre}</span>
                    <span
                      className="text-black-50"
                      style={{ fontSize: "10px" }}
                    >
                      {correo}
                    </span>
                    <span> </span>
                  </div>
                </div>
                <div className="col-md-4 border-right">
                  <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="text-right"> BLOODBOOK</h4>
                    </div>
                    <div className="row mt-2">
                      <div className="form-group">
                        <label className="labels">Nombre:</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={nombre}
                          disabled
                        />
                      </div>
                      <p></p>
                      <div className="form-group">
                        <label className="labels">Apellido Paterno:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={apePat}
                          disabled
                        />
                      </div>
                    </div>
                    <p></p>
                    <div className="row mt-3">
                      <div className="form-group">
                        <label className="labels">Apellido Materno:</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={apeMat}
                          disabled
                        />
                      </div>
                      <p></p>
                      <div className="form-group">
                        <label className="labels">Correo:</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={correo}
                          disabled
                        />
                      </div>
                      <p></p>
                      <div className="form-group">
                        <label className="labels">Fecha de nacimiento</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={fechaNac}
                          disabled
                        />
                      </div>
                      <p></p>
                      <div className="form-group">
                        <span className="labels">Tipo de sangre</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={sangre}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 border-right">
                  <form className="p-3 py-5" onSubmit={register}>
                    <h4>Contacto</h4>
                    <div className="form-group">
                      <label>Teléfono:</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) => SetTelefono(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Correo electrónico público:</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        onChange={(e) => SetEmail(e.target.value)}
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <input
                        className="btn btn-primary profile-button1"
                        type="submit"
                        value="Crear"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
