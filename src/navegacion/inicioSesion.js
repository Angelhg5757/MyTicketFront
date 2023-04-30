import Layout from "./Layout";
import Footer from "./footer";
import React, { useState, useEffect } from "react";
import Login from "./loginT";
import "./css/inicioSesion.css";
function Inicio() {
  return (
    <>
      <Layout />
      <Login />
    </>
  );
}

export default Inicio;
