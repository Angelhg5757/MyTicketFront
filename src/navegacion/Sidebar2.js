import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUsers, FaUser, FaStickyNote } from "react-icons/fa";
import { SlEnvolopeLetter } from "react-icons/sl";
import "./css/sidebar.css";

const SlideBar2 = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("idUsuario");
  console.log(id);

  const handleLogout = () => {
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("nombre");
    localStorage.removeItem("apePat");
    localStorage.removeItem("apeMat");
    localStorage.removeItem("correo");
    localStorage.removeItem("fechaNac");
    localStorage.removeItem("sangre");
    if (!id) {
      console.log("Eliminado");
    }
    navigate("/inicio", { replace: true });
  };

  return (
    <div className="slidebar1">
      <ul>
        <li>
          <NavLink
            to="/perfilDonador"
            className="text-light rounded py-3 my-3 w-100 d-inline-block px-3 text-center"
            style={{ fontSize: "20px", height: "50px" }}
            activeclassname="active"
          >
            <SlEnvolopeLetter className="me-2" color="white" />
            Perfil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/comunidad"
            className="text-light rounded py-2 my-3  w-100 d-inline-block px-3 text-center"
            style={{ fontSize: "20px", height: "50px" }}
            activeclassname="active"
          >
            <FaUsers className="me-2" color="white" />
            Publicaciones
          </NavLink>
        </li>
        <li>
          <button className="button2" type="submit" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SlideBar2;
