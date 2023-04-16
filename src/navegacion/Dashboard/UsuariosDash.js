import React from 'react';
import NavbarDashboard from '../NavbarDashboard';
import Slidebar from '../SidebarDashboard';
import Usuarios from '../usuariosDashboard';
import '../css/usuarioDash.css';

const Usuario = () => {
    return (
        <div>
            <NavbarDashboard/>
            <Slidebar/>
            <Usuarios/>
        </div>
    );
};

export default Usuario;