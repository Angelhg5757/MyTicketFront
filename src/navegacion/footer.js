import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";

function Footer() {
  return (
    <>
      <footer className="bg-dark text-center text-white">
        
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">Desarrolladores</h5>
              <a
            href=" "
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            Ing. José Alberto Carrasco Francisco
          </a>
          <br></br>
          <a
            href=" "
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            Ing. Ángel Hernández Gómez
          </a>
          <br></br>
          <a
            href=" "
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            Ing. Fabiola Guadalupe Martínez Rangel
          </a>
          <br></br>

          <a
            href=" "
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            Ing. Isamayi Meyli Velasco Rodríguez
          </a>
            </div>
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">Redes sociales</h5>
              <a
                className="btn btn-outline-light btn-floating"
                href="#!"
                role="button"
              >
                <BsFacebook />
              </a>

              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <BsInstagram />
              </a>

              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <BsTwitter />
              </a>

              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <BsYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center p-3">
          &copy; 2023 TicketBook | Creado por los desarrolladores del equipo MAJOFA
        </div>

        {/* <div className="text-center p-3">
          <a
            href=" "
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            Información
          </a>{" "}
          |{" "}
          <a
            href=" "
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            Política de Privacidad
          </a>{" "}
          |{" "}
          <a
            href=" "
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ color: "white", textDecoration: "none" }}
          >
            Términos y Condiciones
          </a>
        </div> */}
      </footer>
    </>
  );
}

export default Footer;
