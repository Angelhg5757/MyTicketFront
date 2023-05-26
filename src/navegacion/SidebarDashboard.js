import React from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "./css/slideBar.css";

const Slidebar = () => {
  return (
    <div className="slidebar">
      <ul>
        <li>
          <NavLink
            to="/Crudusuarios"
            className="text-dark rounded py-2 w-100 d-inline-block px-3"
            activeclassname="active"
          >
            <FaIcons.FaHouseUser className="me-2" /> Usuarios
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/crudboletos"
            className="text-dark rounded py-2 w-100 d-inline-block px-3"
            activeclassname="active"
          >
            <FaIcons.FaTicketAlt className="me-2" /> Tickets
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/crudEventos"
            className="text-dark rounded py-2 w-100 d-inline-block px-3"
            activeclassname="active"
          >
            <FaIcons.FaCalendarAlt className="me-2" /> Eventos
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Slidebar;
