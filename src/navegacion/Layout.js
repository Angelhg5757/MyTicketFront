import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTicketAlt } from "react-icons/fa";
import "./css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { CDBSidebarMenuItem } from "cdbreact";

function CollapsibleExample() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const id = localStorage.getItem("idUsuario");

  const handleLogout = () => {
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("nombre");
    localStorage.removeItem("apePat");
    localStorage.removeItem("apeMat");
    localStorage.removeItem("correo");
    localStorage.removeItem("fechaNac");
    localStorage.removeItem("telefono");
    if (!id) {
      console.log("Eliminado");
    }
    navigate("/inicio", { replace: true });
  };

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
      <Navbar.Brand className="_logo" href="/inicio">
        TicketBook
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="#proximos-eventos">Proximos eventos</Nav.Link>
          <Nav.Link href="#">Eventos</Nav.Link> */}
        </Nav>

        <Nav className="inicio-sesion justify-content-between">
          {/* <Nav.Link href={loggedIn ? "/misEventos" : "/login"}>
            {loggedIn ? <span>Mis Eventos</span> : <span>Iniciar sesión</span>}
          </Nav.Link>
          <Nav.Link href={loggedIn ? "/misBoletos" : "/login"}>
            {loggedIn ? <span>Mis Boletos</span> : <span>Iniciar sesión</span>}
          </Nav.Link> */}
          {loggedIn ? (
            <Nav.Link href="/misBoletos">Mis boletos</Nav.Link>
          ) : null}
          {loggedIn ? (
            <Nav.Link href="/misEventos">Mis eventos</Nav.Link>
          ) : null}
          <Nav.Link href={loggedIn ? "/profile" : "/login"}>
            {loggedIn ? (
              <span>
                <FontAwesomeIcon
                  icon={faTicket}
                  bounce
                  color="white"
                  className="icono"
                />{" "}
                Perfil
              </span>
            ) : (
              <span>
                <FontAwesomeIcon
                  icon={faTicket}
                  bounce
                  color="white"
                  className="icono"
                />{" "}
                Iniciar sesión
              </span>
            )}
          </Nav.Link>
          {/* <Nav.Link exact to="/" activeClassName="activeClicked">
            
              <FontAwesomeIcon icon={faPowerOff} bounce className="mr-2" /> Salir
          </Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CollapsibleExample;
