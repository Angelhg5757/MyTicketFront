import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "./Layout";
import "./css/login.css";
import swal from "sweetalert";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";

const Login = () => {
  let navigate = useNavigate();
  const [correo, setCorreo] = useState();
  const [password, setPassword] = useState();

  function preventGoingBack() {
    navigate("/login");
  }

  useEffect(() => {
    preventGoingBack();
  }, []);

  let inSesion = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://ticketback.herokuapp.com/usuario/log", {
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
        const id = localStorage.setItem("idUsuario", data.idUsuario);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("apePat", data.apePat);
        localStorage.setItem("apeMat", data.apeMat);
        localStorage.setItem("correo", data.correo);
        localStorage.setItem("fechaNac", data.fechaNac);

        console.log(id);
        console.log(res.status);

        navigate("/comunidad");
      } else if (res.status === 201) {
        const id = localStorage.setItem("idUsuario", data.idUsuario);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("apePat", data.apePat);
        localStorage.setItem("apeMat", data.apeMat);
        localStorage.setItem("correo", data.correo);
        localStorage.setItem("fechaNac", data.fechaNac);

        console.log(id);

        console.log(res.status);

        navigate("/perfil");
      } else if (correo === "admin@gmail.com" && password === "admin") {
        localStorage.setItem("nombre", "admin");

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
      <MDBContainer className="my-4">
        <MDBRow className="g-0 align-items-center">
          <MDBCol col="8">
            <img
              src="https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="w-100 rounded-6 shadow-4 imgLogin"
              alt=""
              fluid
            />
          </MDBCol>
          <MDBCol col="3">
            <MDBCard className="my-5 cascading-right mr-4">
              <MDBCardBody className="p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">¡Inicia Sesión!</h2>
                <form method="POST" onSubmit={inSesion} className="form">
                  <MDBInput
                    wrapperClass="w-50 mx-auto mb-4"
                    label="Email"
                    id="form3"
                    type="email"
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="w-50 mx-auto mb-4"
                    label="Password"
                    id="form4"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="d-flex justify-content-center mb-4">
                    <MDBCheckbox
                      name="flexCheck"
                      value=""
                      id="flexCheckDefault"
                      label="Recuérdame!"
                    />
                  </div>

                  <MDBBtn className="w-50 mb-4 btn-danger" size="md" type="submit">
                    Ingresar
                  </MDBBtn>

                  <div className="text-center">
                    <p>
                      ¿No tienes cuenta? <a href="/registro"> Registrate</a>
                    </p>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Login;
