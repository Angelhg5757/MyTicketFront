import { Dropdown } from "bootstrap/dist/js/bootstrap.bundle";
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { ImTicket } from "react-icons/im";
import UsuarioDashboard from "./UsuarioDashboard";
import { FaTicketAlt } from "react-icons/fa";
const NavbarDashboard = () => {
  return (
    <>
      <Navbar className="navbar-dark custom-navbar bg-dark">
        <ImTicket className="logo" />
        <Navbar.Brand className="_logo" href="#">
          TicketBook
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto" navbar>
                <UsuarioDashboard />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarDashboard;
