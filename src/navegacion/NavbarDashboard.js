import { Dropdown } from 'bootstrap/dist/js/bootstrap.bundle';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import UsuarioDashboard from './UsuarioDashboard';

const NavbarDashboard = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='nav'>
                <Container>
                    <Navbar.Brand style={{fontSize:'30px',fontFamily:'PT Sans'}} >TicketBook</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="ms-auto" navbar>
                            <UsuarioDashboard />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarDashboard;