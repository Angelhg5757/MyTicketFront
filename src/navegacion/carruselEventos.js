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
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 imgCarr"
              src="https://metropolitano.gal/wp-content/uploads/2022/09/musevigo.jpg"
              alt="Second slide"
            />
    
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 imgCarr"
              src="https://tusbuenasnoticias-s2.cdn.net.ar/st2i1700/2023/03/tusbuenasnoticias/images/40/30/403085_dfee8723fbd8618a9dbaecd400172328b70652de9dffc827c434fb750d80909c/lg.jpg"
              alt="Third slide"
            />
    
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
}

export default Carrusel;
