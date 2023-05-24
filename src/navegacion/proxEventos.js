import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from 'moment';
import Slider from "react-slick";
import CardComponent from "./tarjetas";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/proxEventos.css";

const settings = {
  centerMode: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Carousel = () => {
  const [data, setApiData] = useState([]);
  
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`http://localhost:4000/eventos/proximos`)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  };

  const formatDate = (date) => {
    return moment(date).format('DD-MM-YYYY'); // Formatear la fecha usando moment.js
  };

  return (
    <div className="proximos-eventos">
      <h1 className="text-start titulo-eventos text-center text-light pt-5">
        Proximos Eventos
      </h1>
      <div className="eventos" style={{ padding: 40 }}>
      {data.map((event, index) => (
        <Slider {...settings}>
          <div>
            <CardComponent
              image="https://media.ticketmaster.com/tm/en-us/dam/a/5c9/00ac6b3a-b89f-4d83-885e-b194762b65c9_CUSTOM.jpg"
              category={formatDate(event.fecha)}
              title={event.eventos_nombre}
              content={event.inmueble_nombre}
            />
          </div>
          <div>
            <CardComponent
              image="https://image.europafm.com/clipping/cmsimages02/2023/03/18/6C0C23D7-4E72-49BB-85A3-FCBCEECEB78C/44-canciones-10-escenografias-distintas-13-cambios-vestuarios-asi-bienvenida-taylor-swift-the-eras-tour_98.jpg?crop=3956,2226,x0,y208&width=1900&height=1069&optimize=low&format=webply"
              category="Música"
              title="Taylor Swift"
              content="Tour: The Eras Tour"
            />
          </div>
          <div>
            <CardComponent
              image="https://cdn.arema.dev/live/eventos/9573.jpg"
              category="Música"
              title="Pandora & Flans"
              content="Tour: Inesperado Tour"
            />
          </div>
          <div>
            <CardComponent
              image="https://images.sk-static.com/images/media/img/col3/20220723-032244-362237.jpg"
              category="Música"
              title="Sin Bandera"
              content="Tour: Frecuencia Tour"
            />
          </div>
          <div>
            <CardComponent
              image="https://media.ticketmaster.com/tm/en-us/dam/a/c86/ccbce22b-bcec-4965-aeb7-bf724d45ec86_1804931_CUSTOM.jpg"
              category="Música"
              title="Muse"
              content="Tour: Wilde of the people"
            />
          </div>
        </Slider>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
