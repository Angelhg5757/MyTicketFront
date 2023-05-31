import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaTicketAlt } from 'react-icons/fa';
import './css/navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";


function CollapsibleExample() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    const idUsuario = localStorage.getItem("idUsuario");
    const nombre = localStorage.getItem("nombre");
    // Verificar si existen los datos requeridos en localStorage
    if (idUsuario && nombre) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <Navbar className="navbar-dark custom-navbar bg-dark" expand="lg">
      <Navbar.Brand className="logo" href="/inicio">
        <FontAwesomeIcon icon={faTicket} beat color="white" className="icono" />
      </Navbar.Brand>
      <Navbar.Brand className="_logo" href="/inicio">TicketBook</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="#proximos-eventos">Proximos eventos</Nav.Link>
          <Nav.Link href="#">Eventos</Nav.Link> */}
        </Nav>
        <Nav className="inicio-sesion justify-content-between">
          <Nav.Link href={loggedIn ? "/profile" : "/login"}>
          {loggedIn ? (
            <span>
              <FontAwesomeIcon icon={faTicket} bounce color="white" className="icono" /> Perfil
            </span>
          ) : (
            <span>
              <FontAwesomeIcon icon={faTicket} bounce color="white" className="icono" /> Iniciar sesión
            </span>
          )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CollapsibleExample;
