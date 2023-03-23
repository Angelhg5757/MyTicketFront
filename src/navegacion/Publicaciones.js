// import React from 'react';
import "./css/publicaciones.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import swal from "sweetalert";

const Publicaciones = () => {

  let navigate = useNavigate();
  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [id, setId] = useState('');

  useEffect(() => {
    setId(localStorage.getItem('idUsuario'));
  }, [])

  let register = async (e) => {
    const idUser = localStorage.getItem('idUsuario');
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:4000/publicacion/crear", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          titulo: titulo,
          descripcion: descripcion,
          idImagen: 1,
          idUsuario: idUser,
        }),
      });
      swal({
        title: "Publicación creada con éxito!",
        // text: "",
        icon: "success",
        button: "Aceptar",
      });
      console.log("Creado");
      navigate("/perfil");
    } catch (error) {
      console.log(error);
    }
  }

  if(id == null) {
    navigate("*");
  }

  return (
    <div className="container-fluid bodypub">
      
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <form className="col-9 text-center mt-3 inv"  onSubmit={register}>
            <h3>
              Crea publicaciones para que las personas puedan conocer tu situación y puedas contactar a un donador
            </h3>{" "}
            <br />
            {/* <h5>
              Copia tu enlace de invitación o comparte en redes sociales para
              que tus contactos se puedan registrar
            </h5>{" "} */}
            <br /> <br />
            {/* <div className="input-group cod">
              <input type="text" placeholder="Tú código" className="form-control" />
            </div>
            <br /> <br /> */}
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="tit">
                Título de la publicación
              </label>
              <input
                type="text"
                className="form-control cod"
                id="exampleFormControlInput1"
                // placeholder="Título aquí"
                onChange={e => setTitulo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label tit">
                Descripción
              </label>
              <textarea
                className="form-control cod"
                id="exampleFormControlTextarea1"
                rows="6"
                onChange={e => setDescripcion(e.target.value)}
              ></textarea>
            </div>
            <input type="submit" className="btn btn-primary btnenv" />
          </form>
        </div>
        </div>
  );
};

export default Publicaciones;
