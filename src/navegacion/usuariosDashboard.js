import React, { useEffect, useState } from "react";
import NavbarDashboard from '../navegacion/NavbarDashboard';
import Slidebar from '../navegacion/SidebarDashboard';
import axios from "axios";
import moment from "moment";
import * as FaIcons from "react-icons/fa";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import editar from '../assets/img/pencil.png';
import borrar from '../assets/img/trash.png';
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./css/usuariosT.css";

const Usuarios = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [apiData, setApiData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/usuario/listar`)
      .then((getData) => {
        setApiData(getData.data);
      });
  }, []);

  const setData = (
    id,
    correo,
    contrasenia,
    estatus,
    fechaRegistro,
    fechaVigencia,
    rol_id
  ) => {
    localStorage.setItem("ID", id);
    localStorage.setItem("correo", correo);
    localStorage.setItem("contrasenia", contrasenia);
    localStorage.setItem("estatus", estatus);
    localStorage.setItem("fechaRegistro", fechaRegistro);
    localStorage.setItem("fechaVigencia", fechaVigencia);
    localStorage.setItem("rol_id", rol_id);
  };

  const getData = () => {
    axios
      .get(`http://localhost:4000/usuario/listar`)
      .then((getData) => {
        setApiData(getData.data);
      });
  };

  const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY"); // Formatear la fecha usando moment.js
  };


  const onDelete = (id) => {
    swal({
      title: "Eliminar usuario",
      text: "¿Está seguro que desea eliminar el usuario?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((elimina) => {
      if (elimina) {
        axios
          .delete(`http://localhost:4000/usuario/eliminar/${id}`)
          .then(() => {
            getData();
            swal({
              text: "El usuario ha sido eliminado con éxito",
              icon: "success",
            });
          })
          .catch((error) => {
            if (error.response && error.response.status === 500) {
              swal("Error", "El usuario tiene boletos registrados. Primero elimine los boletos asociados al usuario", "error");
            } else {
              swal("Error", "Ocurrió un error al eliminar el usuario", "error");
            }
          });
      }
    });
  };
  
  
  

  const [email, setCorreo] = useState();
  const [password, setContrasenia] = useState();
  const [registro, setRegistro] = useState();
  const [vigencia, setVigencia] = useState();
  const [rol, setRol] = useState();

  let registerUsu = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:9595/administrador/registrar", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          correo: email,
          contrasenia: password,
          estatus: true,
          fechaRegistro: registro,
          fechaVigencia: vigencia,
          rol_id: rol,
        }),
      });
      swal({
        title: "Usuario registrado con éxito!",
        text: "El usuario " + email + " ha sido guardado",
        icon: "success",
        button: "Aceptar",
      }).then((respuesta) => {
        if (respuesta) {
          window.location.reload();
        }
      });
    } catch (error) {
      swal({
        title: "Error",
        text: "Ocurrio un error al guardar :(",
        icon: "error",
        button: "Aceptar",
      });
    }
  };

  return (
    <>
      <NavbarDashboard/>
      <Slidebar/>
      <div className="Usuarios">
        <div className="main2" style={{ width: "100%",height:"100vh"}}>
          <div id="media">
            <h3 className="head">
              <FaIcons.FaHouseUser className="me-2" /> Usuarios
            </h3>
            <div className="container">
              <br></br>
              <div className="tab2">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Correo</TableCell>
                        {/*<TableCell>Contraseña</TableCell>*/} 
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido Paterno</TableCell>
                        <TableCell>Apellido Materno</TableCell>
                        <TableCell>Telefono</TableCell>
                        <TableCell>Fecha Nacimiento</TableCell>
                        <TableCell>Rol</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {apiData.map((data) => {
                        return (
                          <TableRow>
                            <TableCell>{data.idUsuario}</TableCell>
                            <TableCell>{data.correo}</TableCell>
                            {/* <TableCell>{data.password}</TableCell> */}
                            <TableCell>{data.nombre}</TableCell>
                            <TableCell>{data.apePat} </TableCell>
                            <TableCell>{data.apeMat} </TableCell>
                            <TableCell>{data.telefono}</TableCell>
                            <TableCell>{formatDate(data.fechaNac)} </TableCell>
                            <TableCell>{data.rol_nombre}</TableCell>
                            <TableCell>
                              <Link to="/Dashboard/usuarios/actualizar"
                                  // className="btn1Usu"
                                  style={{paddingRight:'20%'}}
                                  onClick={() =>
                                    setData(
                                      data.idUsuario,
                                      data.correo,
                                      data.contrasenia,
                                      data.fechaRegistro,
                                      data.fechaVigencia,
                                      data.rol_id
                                    )
                                  }>
                                  <img src={editar}/>
                              </Link>
                             
                              <Link
                                // className="btn1Usu"
                                onClick={() => onDelete(data.idUsuario)}
                              >
                                <img src={borrar} />
                                &nbsp;
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            <br />
          </div>
        </div>
        <Button
          className="btnUsu"
          onClick={handleOpen}
          style={{
            float: "right",
            margin: "40px",
            marginTop: "20px",
            fontSize: "20px",
            fontFamily: "Verdana",
            backgroundColor: "#3CB371",
            borderRadius: "5px",
            marginTop: "-150px"
          }}
        >
          Agregar
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              Nuevo usuario
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form method="POST" className="formula33" onSubmit={registerUsu}>
                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }} className="">
                    Correo electronico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>

                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => setContrasenia(e.target.value)}
                    required
                  />
                </div>

                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Fecha de registro
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setRegistro(e.target.value)}
                    required
                  />
                </div>

                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Fecha de vigencia
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setVigencia(e.target.value)}
                    required
                  />
                </div>

                <div className>
                  <label for="" style={{ fontFamily: "Verdana" }}>
                    Rol Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setRol(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="submit"
                  className="btnUsu"
                  style={{ float: "right" }}
                  value="Crear"
                />
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Usuarios;
