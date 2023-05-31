import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "absolute",
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333" className="">
        
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <span className="text">Menú</span>
        </CDBSidebarHeader>

        
        <CDBSidebarContent className="sidebar-content" style={{ flexGrow: 1 }}>
          <CDBSidebarMenu>
            <NavLink exact to="/misEventos" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="calendar">
                Mis Eventos
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/misBoletos" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="money">Mis Boletos</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Perfil</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center", marginTop: "auto" }}>
          <div
            style={{
              padding: "5px 5px 5px",
              backgroundColor: "rgb(12%, 12%, 12%)",
            }}
          >
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="power-off" style={{ color: "white" }} onClick={handleLogout}>
                Salir
              </CDBSidebarMenuItem>
            </NavLink>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
