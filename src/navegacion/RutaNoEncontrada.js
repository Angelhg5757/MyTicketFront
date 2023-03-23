import "../navegacion/css/rutaNoEncontrada.css";

const RutaNoEncontrada = () => {
    return(
        <div id='oopss'>
        <div id='error-text'>
          <span>404</span>
          <p>Página no encontrada</p>
          <p className='hmpg'><a href='/inicio' className="back">Volver al inicio</a></p>
        </div>
      </div>
    );
};
    
export default RutaNoEncontrada;
    