import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "./css/tarjetas.css";

const CardComponent = ({ image, category, title, content, eventId }) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apePat, setApePat] = useState("");
  const [apeMat, setApeMat] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaNac, SetfechaNac] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("idUsuario"));
    setNombre(localStorage.getItem("nombre"));
    setApePat(localStorage.getItem("apePat"));
    setApeMat(localStorage.getItem("apeMat"));
    setCorreo(localStorage.getItem("correo"));
    SetfechaNac(localStorage.getItem("fechaNac"));
    setTelefono(localStorage.getItem("telefono"));
  }, []);


  const redirectToPage = () => {
    if (
      id &&
      nombre &&
      apePat &&
      apeMat &&
      telefono &&
      correo &&
      fechaNac
    ) {
      navigate(`/comprarBoleto/${title}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="card text-center bg-dark shadow-longer cardEventos" style={{ width: "18rem" }}>
      <div className="card-header text-light">{category}</div>
      <img src={image} className="imgCard" alt="Event" />
      <div className="card-body text-light">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <button className="btn btn-primary" onClick={redirectToPage}>
          ¡Compra ahora!
        </button>
      </div>
    </div>
  );
};

export default CardComponent;

