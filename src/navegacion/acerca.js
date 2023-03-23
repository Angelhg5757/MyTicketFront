import Layout from "./Layout";
import Styles from "./css/acerca.css";
import Footer from "./footer";
import imagenes from "../assets/imagenes";
import { CardActionArea } from "@mui/material";

const Acerca = () => {
  return (
    <>
      <Layout />
      <div className="seccion">
        <div className="about-section">
          <h1 className="title1">BloodBook</h1>
          {/* <img
                  src="https://d2lcsjo4hzzyvz.cloudfront.net/blog/wp-content/uploads/2021/06/11125531/Requisitos-para-donar-sangre.jpg"
                  width={1000}
                  height={400}
                /> */}
        </div>

        <div className="title2"></div>
        <div className="row1">
          <div className="column">
            <div className="card">
              <div className="imag">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                  width={200}
                  height={200}
                />
              </div>
              <div className="container">
                <h2>José Carrasco</h2>
                <p className="title">Ingeniero de pruebas</p>
                {/* <p className="text">
                  Some text that describes me lorem ipsum ipsum lorem.
                </p> */}
                <p className="text">jos@example.com</p>
                {/* <p className="text">
                  <button className="button1">Contact</button>
                </p> */}
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <div className="imag">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                  width={200}
                  height={200}
                />
              </div>
              <div className="container">
                <h2>Ángel Hernández</h2>
                <p className="title">Programador</p>
                {/* <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                <p>angel@example.com</p>
                {/* <p>
                  <button className="button1">Contact</button>
                </p> */}
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <div className="imag">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                  width={200}
                  height={200}
                />
              </div>
              <div className="container">
                <h2>Fabiola Martínez</h2>
                <p className="title">Análista de Base de datos</p>
                {/* <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                <p>fabi@example.com</p>
                {/* <p>
                  <button className="button1">Contact</button>
                </p> */}
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <div className="imag">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                  width={200}
                  height={200}
                />
              </div>{" "}
              <div className="container">
                <h2>Isamayi Velasco</h2>
                <p className="title">Análista de requerimientos</p>
                {/* <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                <p>Mey@example.com</p>
                {/* <p>
                  <button className="button1">Contact</button>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Acerca;
