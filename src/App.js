import './App.css';
import {Routes, Route} from 'react-router-dom';
// import footer from './navegacion/footer';
import Inicio from './navegacion/Inicio';
import InicioSesion from './navegacion/inicioSesion';
import Registro from './navegacion/registro';
//import Dashboard from './navegacion/Dashboard/Dashboard';
import DashboardUsuarios from './navegacion/Dashboard/UsuariosDash';
import Usuarios from './navegacion/usuariosDashboard';
import Boletos from './navegacion/ticketsDashboard';
import Layout from './navegacion/Layout';
import RutaNoEncontrada from './navegacion/RutaNoEncontrada';
import UsuarioDetalle from './navegacion/UsuarioDetalle';
import Update from './navegacion/Dashboard/update';
import UpdateUsuarios from './navegacion/Dashboard/updateUsuarios';
import Perfil from './navegacion/Profile';
import MisEventos from './navegacion/misEventos';
import MisBoletos from './navegacion/misBoletos';
import DashboardEventos from './navegacion/eventosDashboard';
import AgregarTicket from './navegacion/agregarTicket';
import AgregarEvento from './navegacion/agregarEvento';
import AgregarUsuario from './navegacion/agregarUsuario';

//José estuvo acá
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />} />
          <Route index element={<Inicio />} />
          <Route path='/inicio' element={<Inicio />} />
          <Route path='/dashboard' element={<DashboardUsuarios />} />
          <Route path='/profile' element={<Perfil/>} />
          <Route path='/login' element={<InicioSesion />} />
          <Route path='/registro' element={<Registro />} />
          {/* <Route path='/admin' element={<Dashboard />} /> */}
          <Route path='/user' element={<Inicio />} />
          <Route path='/crudusuarios' element={<Usuarios />} />
          <Route path='/crudboletos' element={<Boletos />} />
          <Route path='/update' element={<Update />} />
          <Route path='/updateUser' element={<UpdateUsuarios />} />
          <Route path='/usuario/:usuarioId' element={<UsuarioDetalle />} />
          <Route path='/misEventos' element={<MisEventos/>} />
          <Route path='/misBoletos' element={<MisBoletos/>} />
          <Route path='*' element={<RutaNoEncontrada />} />
          <Route path='/crudEventos' element={<DashboardEventos />} />
          <Route path='/agregarTicket' element={<AgregarTicket />} />
          <Route path='/agregarEvento' element={<AgregarEvento />} />
          <Route path='/agregarUsuario' element={<AgregarUsuario />} />
      </Routes>
    </>
  );
}

export default App;
