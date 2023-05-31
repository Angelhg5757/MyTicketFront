import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import "./css/login.css";
import "./css/compra.css";
import Footer from "./footer";
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

const ComprarBoleto = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [numAsiento, setNumAsiento] = useState();
  const [listaPrecios, setListaPrecios] = useState([]);
  const [precioSeleccionado, setPrecioSeleccionado] = useState("");
  const [descripcion, setDescripcion] = useState();
  const [listaSecciones, setListaSecciones] = useState([]);
  const [listaEventos, setListaEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState("");
  const [seccionSeleccionada, setSeccionSeleccionada] = useState([]);
  const [asientosDisponibles, setAsientosDisponibles] = useState([]);
  const [imagen, setImagen] = useState([]);
  const [id, setId] = useState("");

  // ...

  useEffect(() => {
    setId(localStorage.getItem("idUsuario"));

    axios
      .get("http://localhost:4000/asientos/secciones")
      .then((response) => {
        console.log(response.data);
        setListaSecciones(response.data.rows);
        // Llamar a getAsientosDisponibles con la primera sección seleccionada
        if (response.data.rows.length > 0) {
          setSeccionSeleccionada(response.data.rows[0].nombre);
          getAsientosDisponibles(response.data.rows[0].nombre);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //Obtener los precios de la api
    axios
      .get(`http://localhost:4000/precio/todos`)
      .then((response) => {
        console.log("Holiwis precio;", response.data.rows);
        setListaPrecios(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
    .get(`http://localhost:4000/eventos/todos`)
    .then((response) => {
      console.log("Entraste", response.data.rows);
      setListaEventos(response.data.rows);

      // Establecer el evento seleccionado como opción predeterminada
      const evento = response.data.rows.find((item) => item.nombre === eventId);
      if (evento) {
        setEventoSeleccionado(evento.nombre);
        console.log(evento.nombre);
        getImagen(evento.nombre);
      }
    })
    .catch((error) => {
      console.log(error);
    });

    //obtener los nombres de usuario de la api
    axios
      .get(`http://localhost:4000/usuario/todos`)
      .then((response) => {
        console.log("Holiwis;", response.data.rows);
        setUsuarios(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });

      
  }, [eventId]);

  useEffect(() => {
    getImagen(eventoSeleccionado);
  }, [eventoSeleccionado]);
  
  const getImagen = (event) =>{
    //obtener la imagen del boleto
    axios
    .get(`http://localhost:4000/boletos/imagen/${event}`)
    .then((response) => {
      console.log("hola");
        console.log('Imagen ', response.data[0].imagen);
        setImagen(response.data[0].imagen);
  })
    .catch((error) => {
      console.log(error);
    });
  }
  const getAsientosDisponibles = (seccion) => {
    axios
      .get(`http://localhost:4000/asientosseccion/${seccion}`)
      .then((response) => {
        console.log(response.data.rows);
        setAsientosDisponibles(response.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setData = (
    id,
    evento,
    numAsiento,
    seccion,
    precio,
    descripcion
  ) => {
    setId();
    setEventoSeleccionado(evento);
    setNumAsiento(numAsiento);
    setSeccionSeleccionada(seccion);
    setPrecioSeleccionado(precio);
    setDescripcion(descripcion);
  };

  const onSave = (event) => {
    event.preventDefault();
    console.log("Holisbananis");
    swal({
      title: "Creando boleto",
      text: "¿Está seguro que desea comprar el boleto?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((elimina) => {
      if (elimina) {
        const newData = {
          idUsuario: id,
          eventos_nombre: eventoSeleccionado,
          numero: numAsiento,
          seccion: seccionSeleccionada,
          precio: precioSeleccionado,
        };     
        console.log(newData);
        axios
          .post(`http://localhost:4000/boletos/compra`, newData)
          .then(() => {
            swal({
              text: "El boleto ha sido creado con éxito",
              icon: "success",
            });
          })
          .catch((error) => {
            swal("Error", "Ocurrió un error al crear el boleto", "error");
          });
      }
    });
  };
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get("eventId");
    // Aquí puedes hacer lo que necesites con el parámetro evento
    console.log("ID del evento:", eventId);
  }, [location.search]);

  
  return (
    <>
      <MDBContainer className="my-4">
        <MDBRow className="g-0 align-items-center">
          <MDBCol col="8">
            <img
              src={imagen}
              className="w-70 rounded-6 shadow-4 imgLogin"
              alt=""
              fluid
            />
          </MDBCol>
          <MDBCol col="3">
            <MDBCardBody className="p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">¡Compra tu boleto!</h2>
              <form method="POST" className="form" onSubmit={onSave}>
                <label htmlFor="" style={{ fontFamily: "Verdana" }}>
                  Evento
                </label>
                <div className="combo-select">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      setEventoSeleccionado(e.target.value)
                    }
                    required
                    value={eventoSeleccionado}
                    
                  >
                    <option value=""></option>
                            {listaEventos.map((item) => (
                              <option value={item.nombre}>{item.nombre}</option>
                            ))}
                  </select>
                  <div className="combo-select-arrow"></div>
                </div>
                <label htmlFor="" style={{ fontFamily: "Verdana" }}>
                  Sección
                </label>
                <div className="combo-select">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      setSeccionSeleccionada(e.target.value)
                    }
                    required
                  >
                    <option value="">Selecciona una sección</option>
                            {listaSecciones.map((seccion) => (
                              <option value={seccion.nombre}>
                                {seccion.nombre}
                              </option>
                            ))}
                  </select>
                  <div className="combo-select-arrow"></div>
                </div>
                <label htmlFor="" style={{ fontFamily: "Verdana" }}>
                  Asientos
                </label>
                <div className="combo-select">
                  <select
                    className="form-control"
                    onChange={(e) => setNumAsiento(e.target.value)}
                    required
                  >
                    <option value="">Selecciona un asiento</option>
                            {asientosDisponibles.map((asiento) => (
                              <option value={asiento.numas}>
                                {asiento.numas}
                              </option>
                            ))}
                  </select>
                  <div className="combo-select-arrow"></div>
                </div>
                <label htmlFor="" style={{ fontFamily: "Verdana" }}>
                  Precio
                </label>
                <div className="combo-select">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      setPrecioSeleccionado(e.target.value)
                    }
                    required
                  >
                     <option value="">Selecciona un precio</option>
                            {listaPrecios.map((item) => (
                              <option value={item.precio}>{item.precio}</option>
                            ))}
                  </select>
                  <div className="combo-select-arrow"></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "40px",
                  }}
                >
                  <MDBBtn
                  className="btn-success"
                  type="submit"
                  style={{ width: "240px" }}
                >
                  Comprar
                </MDBBtn>

                  <MDBBtn
                    className="btn-danger"
                    size="md"
                    style={{ width: "240px" }}
                  >
                    Cancelar
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default ComprarBoleto;
