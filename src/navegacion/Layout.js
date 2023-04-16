import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaTicketAlt } from 'react-icons/fa';
import './css/navbar.css';
import {ImTicket} from "react-icons/im";


function CollapsibleExample() {
  return (
/*     <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/inicio">
            <FontAwesomeIcon
              icon={faHandHoldingHeart}
              color="white"
              className="icono"
            />
          </Navbar.Brand>
          <Navbar.Brand href="/Inicio">BloodBook</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/acerca">Acerca de nosotros</Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-light" href="/login">Iniciar Sesión</Button>{" "}
              <Nav.Link eventKey={2} href="/registro">
                Registrarse
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </> */
    <Navbar className="navbar-dark custom-navbar bg-dark" expand="lg">
      <ImTicket className="logo"/>
      <Navbar.Brand className="_logo" href="#">TicketBook</Navbar.Brand>
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
            <FaTicketAlt /> Iniciar sesión
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CollapsibleExample;
