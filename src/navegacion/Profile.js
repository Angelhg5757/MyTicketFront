import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Layout from "./Layout";
import "./css/profile.css";
import Sidebar from "./SidebarT";
import moment from "moment";
import Footer from "./footer";

const Profile = () => {
  const [data, setApiData] = useState([]);
  let navigate = useNavigate();

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apePat, setApePat] = useState("");
  const [apeMat, setApeMat] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaNac, SetfechaNac] = useState("");
  const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY");
  };
  useEffect(() => {
    setId(localStorage.getItem("idUsuario"));
    setNombre(localStorage.getItem("nombre"));
    setApePat(localStorage.getItem("apePat"));
    setApeMat(localStorage.getItem("apeMat"));
    setCorreo(localStorage.getItem("correo"));
    SetfechaNac(localStorage.getItem("fechaNac"));
  }, []);

  const fecha = new Date(fechaNac);

  /* if (
    nombre == null ||
    apePat == null ||
    apeMat == null ||
    correo == null ||
    fechaNac == null
  ) {
    navigate("*");
  } */

  return (
    <>
      <Layout />
      <Sidebar />
      <div className="container-perfil">
        <div
          className="col-5 ml-5 mt-5"
          style={{ marginLeft: "180px", height: "500px" }}
        >
          <div className="cardProfile">
            <div className="cardProfile-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Admin"
                  className="rounded-circle"
                  width="150"
                />
              </div>

              <br/><br/>

              <div className="card mb-3">
                <div className="card-body text-center">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Nombre Completo</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {nombre} {apePat} {apeMat}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Correo Electronico</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{correo}</div>
                  </div>

                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Fecha de Nacimiento</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {formatDate(fechaNac)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <a
                  className="btn btn-danger w-100 btn-block"
                  target="__blank"
                  href=""
                >
                  Editar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Profile;
