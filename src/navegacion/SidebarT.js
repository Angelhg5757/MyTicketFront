import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '90vh', position:'absolute', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333" className=''>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="calendar">Mis Eventos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="money">Mis Boletos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Configuraciones</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="power-off" style={{color: 'white'}} >Salir</CDBSidebarMenuItem>
            </NavLink>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;