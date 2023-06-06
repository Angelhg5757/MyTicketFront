import React from "react";
import './css/carrusel.css';
import Carousel from 'react-bootstrap/Carousel';

function Carrusel() {
  return (
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 imgCarr"
              src="https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>La puerta al espectáculo</h3>
              <p>Encuentra tus entradas perfectas en un solo clic.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 imgCarr"
              src="https://metropolitano.gal/wp-content/uploads/2022/09/musevigo.jpg"
              alt="Second slide"
            />
    
            <Carousel.Caption>
              <h3>Tu pasaporte a la música en vivo</h3>
              <p>Descubre, reserva y vive los mejores conciertos con nosotros.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 imgCarr"
              src="https://tusbuenasnoticias-s2.cdn.net.ar/st2i1700/2023/03/tusbuenasnoticias/images/40/30/403085_dfee8723fbd8618a9dbaecd400172328b70652de9dffc827c434fb750d80909c/lg.jpg"
              alt="Third slide"
            />
    
            <Carousel.Caption>
              <h3>La emoción empieza aquí</h3>
              <p>
              Consigue tus entradas para los conciertos más esperados, sin complicaciones.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
}

export default Carrusel;
