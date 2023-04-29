import './App.css';
import {Routes, Route} from 'react-router-dom';
// import footer from './navegacion/footer';
import Inicio from './navegacion/Inicio';
import InicioSesion from './navegacion/inicioSesion';
import Registro from './navegacion/registro';
//import Dashboard from './navegacion/Dashboard/Dashboard';
import DashboardUsuarios from './navegacion/Dashboard/UsuariosDash';
import Usuarios from './navegacion/Dashboard/usuarios';
import Layout from './navegacion/Layout';
import RutaNoEncontrada from './navegacion/RutaNoEncontrada';
import UsuarioDetalle from './navegacion/UsuarioDetalle';
import Update from './navegacion/Dashboard/update';
import UpdateUsuarios from './navegacion/Dashboard/updateUsuarios';
import Publicaciones from './navegacion/Publicaciones';
import Comunidad from './navegacion/comunidad';
import Terminos from './navegacion/terminos';
import Perfil from './navegacion/Profile';
import MisEventos from './navegacion/misEventos';
import MisBoletos from './navegacion/misBoletos';

//José estuvo acá
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />} />
          <Route index element={<Inicio />} />
          <Route path='/inicio' element={<Inicio />} />
          {/* <Route path='/acerca' element={<Acerca />} />
          <Route path='/donador' element={<Donador />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/perfilDonador' element={<Perfil2 />} /> */}
          <Route path='/dashboard' element={<DashboardUsuarios />} />
          <Route path='/profile' element={<Perfil/>} />
          <Route path='/login' element={<InicioSesion />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/terminos' element={<Terminos />} />
          <Route path='/comunidad' element={<Comunidad />} />
          <Route path='/publicaciones' element={<Publicaciones/>} />
          {/* <Route path='/admin' element={<Dashboard />} /> */}
          <Route path='/user' element={<Inicio />} />
          <Route path='/CRUDUsuarios' element={<Usuarios />} />
          <Route path='/update' element={<Update />} />
          <Route path='/updateUser' element={<UpdateUsuarios />} />
          <Route path='/usuario/:usuarioId' element={<UsuarioDetalle />} />
          <Route path='/misEventos' element={<MisEventos/>} />
          <Route path='/misBoletos' element={<MisBoletos/>} />
          <Route path='*' element={<RutaNoEncontrada />} />
      </Routes>
    </>
  );
}

export default App;
