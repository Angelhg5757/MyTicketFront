import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import { GiLoveInjection } from "react-icons/gi";

const NavbarDashboard = () => {
  const navigate = useNavigate();
  const nomb = localStorage.getItem("nombre");
  const handleLogout = () => {
    localStorage.removeItem("nombre");
    navigate("/inicio", { replace: true });
  };

  if (nomb == null) {
    navigate("*");
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#3F4E4F" }}
        variant="dark"
        className="nav"
      >
        <Container>
          <Navbar.Brand className="justify-self-start">
            <GiLoveInjection /> BLOODBOOK{" "}
          </Navbar.Brand>
        </Container>
        <Nav.Link
          onClick={handleLogout}
          style={{ paddingRight: "40px", color: "white" }}
          variant="dark"
        >
          Salir
        </Nav.Link>
      </Navbar>
    </>
  );
};

export default NavbarDashboard;
