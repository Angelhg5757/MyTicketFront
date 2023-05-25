import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaTicketAlt } from 'react-icons/fa';
import './css/navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";


function CollapsibleExample() {
  return (

    <Navbar className="navbar-dark custom-navbar bg-dark" expand="lg">
      <Navbar.Brand className="logo" href="/inicio">
        <FontAwesomeIcon icon={faTicket} beat color="white" className="icono" />
      </Navbar.Brand>
      <Navbar.Brand className="_logo" href="">TicketBook</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">Conciertos</Nav.Link>
          <Nav.Link href="#">Festivales</Nav.Link>
          <Nav.Link href="#">Deportes</Nav.Link>
          <Nav.Link href="#">Teatro</Nav.Link>
          <Nav.Link href="#">Familiares</Nav.Link>
          <Nav.Link href="#">Cultura</Nav.Link>
        </Nav>
        <Nav className="inicio-sesion justify-content-between">
        <form class="d-flex">
          <input class="form-control form-busca mr-sm-2" type="search" placeholder="Buscar por evento, artista..." aria-label="Search"/>
            <button class="btn btn-outline-danger my-2 my-sm-0 boton-buscar" type="submit">Buscar</button>
        </form>
          <Nav.Link href="/login">
            {/* <FaTicketAlt /> Iniciar sesión */}
            <FontAwesomeIcon icon={faTicket} bounce color="white" className="icono" /> Iniciar sesión
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CollapsibleExample;
