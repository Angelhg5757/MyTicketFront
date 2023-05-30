import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "./Layout";
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
  const [evento, setEvento] = useState();
  const [asientos, setAsientos] = useState();
  const [precio, setPrecio] = useState();


  function preventGoingBack() {
    navigate("/comprarBoleto");
  }

  useEffect(() => {
    preventGoingBack();
  }, []);

 
  return (
    <>
      <MDBContainer className="my-4">
        <MDBRow className="g-0 align-items-center">
          <MDBCol col="8">
            <img
              // src="https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              src="https://pbs.twimg.com/media/ESSrixsWAAAvgq7.jpg"

              className="w-70 rounded-6 shadow-4 imgLogin"
              alt=""
              fluid
            />
          </MDBCol>
          <MDBCol col="3">
            
              <MDBCardBody className="p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">¡Compra tu boleto!</h2>
                <form method="POST"  className="form">
                <label htmlFor="" style={{ fontFamily: "Verdana" }}>
                          Evento
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) => setEvento(e.target.value)}
                            required
                          >
                            <option selected="true" disabled="disabled">
                              Selecciona evento
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                        <label htmlFor="" style={{ fontFamily: "Verdana" }}>
                          Asientos
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) => setAsientos(e.target.value)}
                            required
                          >
                            <option selected="true" disabled="disabled">
                              Selecciona asiento
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                        <label htmlFor="" style={{ fontFamily: "Verdana" }}>
                          Precio
                        </label>
                        <div className="combo-select">
                          <select
                            className="form-control"
                            onChange={(e) => setPrecio(e.target.value)}
                            required
                          >
                            <option selected="true" disabled="disabled">
                              Selecciona evento
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                          </select>
                          <div className="combo-select-arrow"></div>
                        </div>
                  <div style={{ display: "flex", justifyContent: "center" ,marginTop:"40px"}}>
                    <MDBBtn
                      className="w-50 mb-4 btn-success"
                      size="md"
                      type="submit"
                      style={{ height: "40px", marginRight:"30px" }}
                    >
                      Comprar
                    </MDBBtn>
                    
                    <MDBBtn
                      className="w-50 mb-4 btn-danger"
                      size="md"
                      type="submit"
                      style={{ height: "40px" }}
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
