import Layout from "./Layout";
import Footer from "./footer";
import React, { useState, useEffect } from "react";
import Carrusel from "./carruselEventos.js";
import Eventos from "./proxEventos.js";
import MasBuscados from "./masBuscados.js";

function Inicio() {

  return (
    <>
      <Layout />
      <Carrusel />
      <Eventos />
      <MasBuscados />
      <Footer />
    </>
  );
}

export default Inicio;