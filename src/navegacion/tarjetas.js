import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/tarjetas.css";

const CardComponent = ({ image, category, title, content, eventId }) => {
  return (
    <div className="card text-center bg-dark shadow-longer cardEventos" style={{ width: "18rem" }}>
      <div className="card-header text-light">{category}</div>
      <img src={image} className="imgCard" alt="Event" />
      <div className="card-body text-light">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <Link to={`/comprarBoleto/${title}`}>
          <button className="btn btn-primary">¡Compra ahora!</button>
        </Link>
      </div>
    </div>
  );
};

export default CardComponent;

