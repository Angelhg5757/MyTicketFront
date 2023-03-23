import "./css/inicio.css";
import Layout from "./Layout";
import Footer from "./footer";
import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import imagenes from "../assets/imagenes";
import { useNavigate } from "react-router";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import {FaHighlighter} from 'react-icons/fa';
import {FaSlideshare} from 'react-icons/fa';
import {BsAlarm} from 'react-icons/bs';
import {IoMdRepeat} from 'react-icons/io';

function UncontrolledExample() {
  // let navigate = useNavigate();

  // function preventGoingBack() {
  //   navigate('/login');
  // }

  // useEffect(() => {
  //   preventGoingBack();
  // }, []);

  return (
    <>
      <Layout />

      <Carousel height="800px">
        <Carousel.Item>
          <img
            className="d-block w-100"
            height="600px"
            src={imagenes.imgCarousel}
            alt="First slide"
          />
          <Carousel.Caption>
            <h2>BloodBook</h2>
            <p><h3 >Donar sangre es donar salud y vida. El regalo más preciado que podemos hacerle a alguien en esta vida.</h3></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            height="600px"
            src={imagenes.imgCarousel1}
            alt="Second slide"
          />

          <Carousel.Caption>
          <h2>BloodBook</h2>
            <p><h3>El corazón más bueno y grande es el de los donantes de sangre.</h3></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            height="600px"
            src={imagenes.imgCarousel2}
            alt="Third slide"
          />

          <Carousel.Caption>
          <h2>BloodBook</h2>
          
            <p><h3>Un donante es un héroe sin capa. Salva la vida de otros muchas veces sin conocerlos de nada.</h3></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* <div className="proceso">
        <Typography variant="h3">¿Cómo es el proceso de donación?</Typography>
      </div>
      <div className="timeli">
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <AccountCircleIcon fontSize="large" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Iniciar Sesión
            </Typography>
            <Typography>Crea o inicia seisión en la plataforma.</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="secondary">
              <AddToQueueIcon fontSize="large" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Publica
            </Typography>
            <Typography>Crea una publicación para que otros</Typography>
            <Typography>usuarios puedan ayudarte.</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <AccessTimeIcon fontSize="large" />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Espera
            </Typography>
            <Typography>
              Espera hasta que un usuario se ponga en contacto
            </Typography>
            <Typography>
              contigo para empezar tu proceso de donación.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
            <TimelineDot color="error">
              <RepeatIcon fontSize="large" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Repeat
            </Typography>
            <Typography>Because this is the life you love!</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      </div> */}

      {/* Comienza proceso de donación */}
      <Typography variant="h3" className="text-center py-5">¿Cómo es el proceso de donación?</Typography> 
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="col-md-12">
            <div className="main-timeline">
              <div className="timeline">
              <div className="timeline-content">
                  <div className="timeline-icon">
                    <FaHighlighter/>
                  </div>
                  <Typography variant="h4" component="span">Inicia Sesión</Typography>
                  <p className="description">
                  Crea o inicia sesión en la plataforma.
                  </p>
                  <div className="timeline-year pt-4">Paso 1</div>
                </div>
              </div>
              <div className="timeline">
              <div className="timeline-content">
                  <div className="timeline-icon">
                    <FaSlideshare/>
                  </div>
                  <Typography variant="h4" component="span">Publica</Typography>
                  <p className="description">
                  Crea una publicación para que otros usuarios puedan ayudarte.
                  </p>
                  <div className="timeline-year pb-4">Paso 2</div>
                </div>
              </div>
              <div className="timeline">
              <div className="timeline-content">
                  <div className="timeline-icon">
                    <BsAlarm/>
                  </div>
                  <Typography variant="h4" component="span">Espera</Typography>
                  <p className="description">
                  Espera hasta que un usuario se ponga en contacto contigo para empezar tu proceso de donación.
                  </p>
                  <div className="timeline-year pt-4">Paso 3</div>
                </div>
              </div>
              <div className="timeline">
                <div className="timeline-content">
                  <div className="timeline-icon">
                    <IoMdRepeat/>
                  </div>
                  <Typography variant="h4" component="span">Repeat</Typography>
                  <p className="description">
                  Because this is the life you love!
                  </p>
                  <div className="timeline-year pb-4">Paso 4</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UncontrolledExample;