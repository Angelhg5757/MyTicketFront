import React from "react";
import Sidebar from "./Sidebar";
import "./css/donador.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const Donador = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Sidebar />
            </div>
            <div className="col-9"> 
            <div className="card">
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Nombre</span>
                  <p><input type="text" placeholder="Fabiola" required /></p>
                </div>
                <div className="input-box">
                  <span className="details">Apellido Paterno</span>
                  <p><input type="text" placeholder="Martinez" required /></p>
                </div>
                <div className="input-box">
                  <span className="details">Apellido Materno</span>
                  <p><input type="text" placeholder="Rangel" required /></p>
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input type="email" placeholder="@ejemplo.com" required />
                </div>
                <div className="input-box">
                  <span className="details">Fecha de nacimiento</span>
                  <p><input type="text" placeholder="10/08/2001" required /></p>
                </div>
                <div className="input-box">
                  <span className="details">Tipo Sanguíneo</span>
                  <input type="text" placeholder="A+" required />
                </div>
                <div className="input-box"></div>
              </div>

              <div className="input-box">
                <span className="details">Género</span>
                <p><input type="text" placeholder="Femenino" required /></p>
                  
              </div>
            </div>
          </div>
        </div>
      </div>
            </div>

  );
};

export default Donador;
