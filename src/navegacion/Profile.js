import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Layout from "./Layout";
import "./css/profile.css";
import Sidebar from "./SidebarT";
import moment from "moment";
import Footer from "./footer";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import swal from "sweetalert";

const Profile = () => {
  const [data, setApiData] = useState([]);
  let navigate = useNavigate();

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apePat, setApePat] = useState("");
  const [apeMat, setApeMat] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [fechaNac, SetfechaNac] = useState("");

  const formatDate = (date) => {
    return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
  };

  useEffect(() => {
    setId(localStorage.getItem("idUsuario"));
    setNombre(localStorage.getItem("nombre"));
    setApePat(localStorage.getItem("apePat"));
    setApeMat(localStorage.getItem("apeMat"));
    setCorreo(localStorage.getItem("correo"));
    SetfechaNac(formatDate(localStorage.getItem("fechaNac")));
    setTelefono(localStorage.getItem("telefono"));
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSaveChanges = () => {
    const idUser = localStorage.getItem("idUsuario");
    const updatedData = {
      nombre: nombre,
      apePat: apePat,
      apeMat: apeMat,
      // correo: correo,
      password: password,
      telefono: telefono,
      fechaNac: fechaNac,
    };

    if (password === "") {
      // Eliminar el campo de contraseña si está vacío
      delete updatedData.password;
    } else {
      // Agregar el campo de contraseña si no está vacío
      updatedData.password = password;
    }

    fetch(`http://localhost:4000/usuario/actualizarPerfil/${idUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("nombre", nombre);
          localStorage.setItem("apePat", apePat);
          localStorage.setItem("apeMat", apeMat);
          // localStorage.setItem("correo", correo);
          localStorage.setItem("telefono", telefono);
          const formattedDate = moment(fechaNac, "DD-MM-YYYY").format("YYYY-MM-DD");
          const dateObject = new Date(formattedDate);

          localStorage.setItem("fechaNac", formattedDate);
          swal({
            title: "Datos actualizados",
            text: "Su información ha sido actualizada con éxito",
            icon: "success",
            button: "Aceptar",
          });

          handleClose();
        } else {
          swal({
            title: "Error",
            text: "Ha ocurrido un error al actualizar la información",
            icon: "error",
            button: "Aceptar",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  // Habilitar para el final

  if (
    nombre == null ||
    apePat == null ||
    apeMat == null ||
    correo == null ||
    fechaNac == null
  ) {
    navigate("*");
  } 

  return (
    <>
      <Layout />
      <Sidebar />
      <div className="container-perfil">
        <div
          className="col-5 ml-5 mt-0"
          style={{ marginLeft: "180px", height: "500px" }}
        >
          <div className="cardProfile">
            <div className="cardProfile-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Admin"
                  className="rounded-circle"
                  width="150"
                />
              </div>

              <br />
              <br />
              <div className="card mb-3">
                <div className="card-body text-center">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Nombre Completo</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {nombre} {apePat} {apeMat}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Correo Electronico</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{correo}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Telefono</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{telefono}</div>
                  </div>

                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Fecha de Nacimiento</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {fechaNac}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <button
                  className="btn btn-danger w-100 btn-block"
                  target="__blank"
                  onClick={handleOpen}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            Editar Usuario
          </Typography>
          <TextField id="standard-basic" label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} fullWidth sx={{ mb: 2 }}/>
          <TextField id="standard-basic" label="Apellido Paterno" value={apePat} onChange={(e) => setApePat(e.target.value)} fullWidth sx={{ mb: 2 }}/>
          <TextField id="standard-basic" label="Apellido Materno" value={apeMat} onChange={(e) => setApeMat(e.target.value)} fullWidth sx={{ mb: 2 }}/>
          <TextField id="standard-basic" label="Contraseña" onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mb: 2 }} type="password"/>
          <TextField id="standard-basic" label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} fullWidth sx={{ mb: 2 }}/>
          <TextField id="standard-basic" label="Fecha de Nacimiento" value={fechaNac} onChange={(e) => SetfechaNac(e.target.value)} fullWidth sx={{ mb: 2 }}/>

          <Button variant="contained" color="success" onClick={handleSaveChanges}>
            Guardar cambios
          </Button>
        </Box>
      </Modal>
      <Footer />
      {/* <TextField id="standard-read-only-input" label="Correo Electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} fullWidth sx={{ mb: 2 }}/> */}

    </>
  );
};

export default Profile;
