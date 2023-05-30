import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "./css/slideBar.css";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
const Slidebar = () => {
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
  // return (
  //   <div className="slidebar">
  //     <CDBSidebar textColor="#fff" backgroundColor="#333" className="">
  //       <ul>
  //         <li>
  //           <NavLink
  //             to="/Crudusuarios"
  //             className="text-dark rounded py-2 w-100 d-inline-block px-3"
  //             activeclassname="active"
  //           >
  //             <FaIcons.FaHouseUser className="me-2" /> Usuarios
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink
  //             to="/crudboletos"
  //             className="text-dark rounded py-2 w-100 d-inline-block px-3"
  //             activeclassname="active"
  //           >
  //             <FaIcons.FaTicketAlt className="me-2" /> Tickets
  //           </NavLink>
  //         </li>
  //         <li>
  //           <NavLink
  //             to="/crudEventos"
  //             className="text-dark rounded py-2 w-100 d-inline-block px-3"
  //             activeclassname="active"
  //           >
  //             <FaIcons.FaCalendarAlt className="me-2" /> Eventos
  //           </NavLink>
  //         </li>
  //       </ul>
  //     </CDBSidebar>
  //   </div>
  // );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        position: "absolute",
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333" className="">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <span className="text">Menú</span>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content" style={{ flexGrow: 1 }}>
          <CDBSidebarMenu>
            <NavLink exact to="/CrudUsuarios" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Usuarios</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/crudboletos" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="money">Boletos</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/CrudEventos" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="calendar">
                Eventos
              </CDBSidebarMenuItem>
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
              <CDBSidebarMenuItem
                icon="power-off"
                style={{ color: "white" }}
                onClick={handleLogout}
              >
                Salir
              </CDBSidebarMenuItem>
            </NavLink>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Slidebar;
