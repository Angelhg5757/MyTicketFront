import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "./Layout";
import Styles from "./css/login.css";
import swal from "sweetalert";

const Login = () => {
  let navigate = useNavigate();
  const [correo, setCorreo] = useState();
  const [password, setPassword] = useState();

  function preventGoingBack() {
    navigate('/login');
  }

  useEffect(() => {
    preventGoingBack();
  }, []);

  let inSesion = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://ticket-book-front.vercel.app/usuario/log", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          correo: correo,
          password: password,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        const id = localStorage.setItem('idUsuario', data.idUsuario);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('apePat', data.apePat);
        localStorage.setItem('apeMat', data.apeMat);
        localStorage.setItem('correo', data.correo);
        localStorage.setItem('fechaNac', data.fechaNac);
        localStorage.setItem('sangre', data.sangre);
        console.log(id);
        console.log(res.status);
       
        navigate("/comunidad");
      } else if (res.status === 201) {
        const id = localStorage.setItem('idUsuario', data.idUsuario);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('apePat', data.apePat);
        localStorage.setItem('apeMat', data.apeMat);
        localStorage.setItem('correo', data.correo);
        localStorage.setItem('fechaNac', data.fechaNac);
        localStorage.setItem('sangre', data.sangre);
        console.log(id);
        
        console.log(res.status);
        
        navigate("/perfil");
      } else if (correo=='admin@gmail.com' && password=='admin') {
        // const id = localStorage.setItem('idUsuario', data.idUsuario);
        localStorage.setItem('nombre', "admin");
        // localStorage.setItem('apePat', data.apePat);
        // localStorage.setItem('apeMat', data.apeMat);
        // localStorage.setItem('correo', data.correo);
        // localStorage.setItem('fechaNac', data.fechaNac);
        // localStorage.setItem('sangre', data.sangre);
        // console.log(id);
        
        // console.log(res.status);
        
        navigate("/admin");
      } else {
        swal({
          title: "Error al iniciar sesión",
          text: "El usuario y/o contraseña son incorrectos",
          icon: "error",
          button: "Aceptar",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <Layout />
      <div>
        <div className="contenedor">
          <form method="POST" onSubmit={inSesion} className="form">
            <h5 className="titulo">Iniciar Sesión</h5>
            <input
              type="text"
              name="usuario"
              placeholder="Email"
              className="controls"
              autoComplete="off"
              required
              onChange={(e) => setCorreo(e.target.value)}
            />
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              required="required"
              className="controls"
              onChange={(e) => setPassword(e.target.value)}
            />
            <center>
              <a href="/donador.js">
                <input type="submit" value="Ingresar" className="buttons1" />
              </a>{" "}
            </center>
            <p>
              ¿No tienes una cuenta? <a href="/registro"> Registrate</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
